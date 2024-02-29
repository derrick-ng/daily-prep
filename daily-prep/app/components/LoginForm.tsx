"use client";

import React from "react";
import { Button, TextField } from "@radix-ui/themes";
//import * as Form from "@radix-ui/react-form"
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";


const loginUser = z.object({
  email: z.string().min(1, "email").email(),
  password: z.string().min(1, "password"),
});

// interface LoginUser {
//   email: string;
//   password: number;
// }

//create an IsLoggedIn function
  //when user successfully submits a login form, call function, prob line 52
  //grabs the user id and stores in function
  //can be called in route to get user id without needing jwt

const LoginForm = () => {
  
  const router = useRouter();
  const form = useForm<z.infer<typeof loginUser>>({
    resolver: zodResolver(loginUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginUser>) => {
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });


    if (loginData?.error) {
      console.log(loginData.error);
    } else {      
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
