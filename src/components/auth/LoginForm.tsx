"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { login } from "@/app/login/actions.ts";

export const loginFormSchema = z.object({
    email: z.string()
        .email({
            message: "You must provide a valid email address"
        }),
    password: z.string(),
})

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        return login({ email: values.email, password: values.password })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-between">
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Email</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="text" placeholder="Enter a valid email address..." {...field} />
                            </FormControl>
                            <FormDescription className="text-neutral-700">Example: username@domain.com</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Password</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="password" placeholder="Enter a secure password..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-[80%] h-[20%] mt-[5vh]" type="submit">Log into Account</Button>
            </form>
        </Form>
    )
}