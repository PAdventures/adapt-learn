import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { DrizzleManager } from '@/classes/DrizzleManagers.ts';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? '/';

	if (code) {
		const cookieStore = cookies();
		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                    },
				},
			},
		);
		const { error, data } = await supabase.auth.exchangeCodeForSession(code);
		if (!error && data.user) {
            console.log("Code exchange for session successful")
            const user_metadata = data.user.user_metadata
            if (!user_metadata.full_name) {
                return NextResponse.redirect(`${origin}/error`)
            }
            console.log("Required data is included, creating the user's account")
            try {
                const accountManagerCreateError = await DrizzleManager.accounts.create({
                    authUid: data.user.id,
                    username: user_metadata.full_name,
                    isOAuth: true,
                    role: "USER",
                    displayName: user_metadata.name
                })
                if (accountManagerCreateError && accountManagerCreateError.message !== "<AccountManager>.create user already exists") {
                    console.log("Error encountered...")
                    console.log(accountManagerCreateError)
                    return NextResponse.redirect(`${origin}/error`)
                }
                console.log(`Account creation successful, redirecting to: ${origin}${next}`)
            } catch (err) {
                console.log("Error encountered...")
                console.log(err)
                return NextResponse.redirect(`${origin}/error`)
            }
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	return NextResponse.redirect(`${origin}/error`);
}
