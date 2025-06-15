"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    FormItem,
    Form,
    FormField,
    FormControl,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";






const formSchema = z.object({
    name: z.string().min(1, { message: "Name os Required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password required for login in" }),
    confirmPassord: z.string().min(1, { message: "Re-enter the Password" }),
}).refine((data) => data.password === data.confirmPassord, {
    message: "Password is Not same",
    path: ["confirmPassord"],

})



export const SignUpView = () => {
    const router =useRouter();

    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassord: "",

        }
    });


    const OnSubmit = (data: z.infer<typeof formSchema>) => {
        seterror(null);
        setloading(true)

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL:("/"),
            },
            {
                onSuccess: () => {
                    setloading(false)
                    router.push("/")
                    
                },
                onError: ({ error }) => seterror(error.message)
            }
        )
    }
    
     const onSocial = (provider:"github" | "google") => {
        seterror(null);
        setloading(true)

        authClient.signIn.social(
            {
              provider:provider,
              callbackURL:("/"),
            },
            {
                onSuccess: () => {
                    setloading(false)
                },
                onError: ({ error }) => seterror(error.message)
            }
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className=" overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(OnSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Let&apos;s Beat The AI
                                    </h1>
                                    <p className="text-muted-foreground text-balance ">
                                        Create Your Account
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Rohan Joshi"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />

                                            </FormItem>
                                        )} />
                                </div>


                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Example123@gmail.com"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />

                                            </FormItem>
                                        )} />
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />

                                            </FormItem>
                                        )} />
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassord"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />

                                            </FormItem>
                                        )} />
                                </div>

                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        < OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full">
                                    Sign Up
                                </Button>

                                <div className="after:border-border relative text-center text-sm after:absolute
                                 after:inset-0 after:top-1/2 after:z-0 after:felx after:items-center after:border-t  ">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue With
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            onSocial("google")
                                        }}
                                        variant={"outline"}
                                        type="button"
                                        className="w-full">
                                        <FaGoogle/> Google
                                    </Button>

                                    <Button
                                        disabled={loading}
                                         onClick={() => {
                                            onSocial("github")
                                        }}
                                        variant={"outline"}
                                        type="button"
                                        className="w-full">
                                      <FaGithub/>  Github
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an Account ?
                                    <Link href="/sign-in" className="underline underline-offset-4"> Sign-In</Link>
                                </div>
                            </div>
                        </form>
                    </Form>


                    <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col 
                    gap-y-4 items-center justify-center">
                        <img src="/logo.png" alt="Image" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white text-shadow-2xs uppercase">
                            AI-Interviewer
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm 
            text-balance  *:underline *:underline-offset-4">
                By clicking continue , you agree to our <a href="#">Terms of Services  </a>  and
                <a href="#">Privacy Policy</a>

            </div>
        </div>
    )
}