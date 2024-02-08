"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

//HQS ID: HQS1234, so it is 7 characters long
const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(31, { message: "Username cannot exceed 31 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 8 characters long." }),
});

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (fData) => {
    const data = new FormData();

    for (const key in fData) {
      if (key === "field") {
        data.append(key, fData[key][1]);
      } else {
        data.append(key, fData[key]);
      }
    }
    const response = await fetch("/api/login", {
      method: "POST",
      body: data,
      redirect: "manual",
    });
    if (response.ok) {
      router.refresh();
    } else {
      const { error } = await response.json();
      setLoginError(error);
      setTimeout(() => {
        setLoginError("");
      }, 5000);
    }
  };
  return (
    <Form {...form} className="min-w-80">
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[20rem]">
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='Password'
                    {...field}
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer'>
                    {showPassword ? (
                      <EyeOff
                        className='h-6 w-6'
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        className='h-6 w-6'
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className={"text-sm font-medium text-destructive"}>{loginError}</p>
        <Button type='submit' className='w-full mt-6'>
          Log in
        </Button>
      </form>
    </Form>
  );
}
