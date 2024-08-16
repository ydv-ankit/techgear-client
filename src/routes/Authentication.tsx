import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "@/hooks/store";
import { useNavigate } from "react-router-dom";

const signInFormFields = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signUpFormFields = z
  .object({
    name: z.string().min(2, "Name must contain more than 2 characters"),
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Authentication(): React.ReactElement {
  const { requestFunction, loading, error, responseData } = useAxiosQuery<{
    user: object;
  }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInForm = useForm<z.infer<typeof signInFormFields>>({
    resolver: zodResolver(signInFormFields),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signUpForm = useForm<z.infer<typeof signUpFormFields>>({
    resolver: zodResolver(signUpFormFields),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignIn = async (data: z.infer<typeof signInFormFields>) => {
    await requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
      method: RequestMethod.POST,
      data: data,
    });
  };

  const onSignUp = async (data: z.infer<typeof signUpFormFields>) => {
    await requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/new`,
      method: RequestMethod.POST,
      data: data,
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    } else if (responseData) {
      dispatch({ type: "auth", payload: responseData?.user });
      navigate("/");
    }
  }, [error, responseData]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs
        defaultValue="signin"
        className="w-[400px] border border-zinc-800 rounded-md p-2 pb-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSignIn)}
              className="flex flex-col space-y-4 p-4"
            >
              <Label>Sign in to continue</Label>
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Email ID" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Password" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={loading}>
                Sign In
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="signup">
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSignUp)}
              className="flex flex-col space-y-4 p-4"
            >
              <Label>Create new account</Label>
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Fullname" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Email ID" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Password" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Confirm Password" />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={loading}>
                Sign In
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
