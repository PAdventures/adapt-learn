"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form.tsx";
import { Input } from "@/components/shadcn/ui/input.tsx";
import { Button } from "@/components/shadcn/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select.tsx";
import { signupWithEmailAndPassword } from "@/app/signup/actions.ts";

export const signupFormSchema = z.object({
    username: z.string()
        .min(8, {
            message: "Username must be at least 8 characters long"
        })
        .max(50, {
            message: "Username must be less than 50 characters"
        }),
    displayName: z.string()
        .min(3, {
            message: "Display Name must be at least 3 characters long"
        })
        .max(50, {
            message: "Display Name must be less than 50 characters"
        }),
    email: z.string()
        .email({
        message: "You must provide a valid email address"
        }),
    type: z.enum(['USER', 'STUDENT', 'TEACHER']),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long"
        })
        .regex(/[^A-Za-z0-9]/g, {
            message: "Password must contain at least 1 special character"
        }),
    confirmPassword: z.string(),
    })
    .refine((data) => {
        return data.password === data.confirmPassword
    }, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

export default function SigninForm() {
    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            username: "",
            displayName: "",
            email: "",
            type: "USER",
            password: "",
            confirmPassword: ""
        }
    });

    function onSubmit(values: z.infer<typeof signupFormSchema>) {
        return signupWithEmailAndPassword(new Object(values) as never as z.infer<typeof signupFormSchema>);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-between">
                <FormField 
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Username</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="text" placeholder="Enter a username..." {...field} />
                            </FormControl>
                            <FormDescription className="text-neutral-700">Note: Must be greater than 8 characters</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Display Name</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="text" placeholder="Enter your display name..." {...field} />
                            </FormControl>
                            <FormDescription className="text-neutral-700">Note: Must be greater than 3 characters</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Email</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="text" placeholder="Enter your email address..." {...field} />
                            </FormControl>
                            <FormDescription className="text-neutral-700">Example: username@domain.com</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Account Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="USER">Normal User</SelectItem>
                                    <SelectItem value="STUDENT">Student</SelectItem>
                                    <SelectItem value="TEACHER">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
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
                                <Input className="text-black placeholder:text-neutral-500" type="password" placeholder="Enter a strong password..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="w-[80%]">
                            <FormLabel className="text-black">Confirm Password</FormLabel>
                            <FormControl>
                                <Input className="text-black placeholder:text-neutral-500" type="password" placeholder="Re-enter the password above..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-[80%] h-[10%] mt-[5vh]" type="submit">Create Account</Button>
            </form>
        </Form>
    )
}