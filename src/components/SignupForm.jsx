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

//HQS ID: HQS1234, so it is 7 characters long
const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(31, { message: "Username cannot exceed 31 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 8 characters long." }),
  hqsid: z
    .string()
    .startsWith("HQS")
    .length(7)
    .regex(/^HQS\d{4}$/, { message: "Invalid HQS ID format. Use HQS####." }),
});

export default function SignupForm(action) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      hqsid: "",
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
    const response = await fetch("/api/signup", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      console.log(response);
    } else {
      console.log(response);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormDescription>
                Username of the employee to be created
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='password' {...field} />
              </FormControl>
              <FormDescription>
                Password of the employee to be created
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='hqsid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>HQS ID</FormLabel>
              <FormControl>
                <Input placeholder='HQS####' {...field} />
              </FormControl>
              <FormDescription>
                HQS ID of the employee to be created
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
