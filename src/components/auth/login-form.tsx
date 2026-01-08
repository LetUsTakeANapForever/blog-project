"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.email("Plz enter a vali email"),
  password: z.string().min(8, "Password must be 6 character long"),
});

type LoginFormvalues = z.infer<typeof loginSchema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormvalues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormvalues) => {
    setLoading(true);

    try {
      console.log(values);
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onClick={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-zinc-400">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
