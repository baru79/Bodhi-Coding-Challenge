"use client";

import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { InputForm } from "@/components/ui/input-form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";

export default function StepTwo() {
  const [progressValue, setProgressValue] = useState(33.33);
  const formContext = useMultiStepFormContext();
  const router = useRouter();

  const stepTwoFormSchema = z.object({
    email: z.string().min(1, { message: "Email is empty" }).max(50, {
      message: "Email should be shorter than 50 characters",
    }),
    password: z
      .string()
      .min(1, { message: "Password is empty" })
      .min(8, { message: "Password should has at least 8 characteres" })
      .max(50, {
        message: "Password should be shorter than 50 characters",
      }),
  });

  const stepTwoForm = useForm<z.infer<typeof stepTwoFormSchema>>({
    resolver: zodResolver(stepTwoFormSchema),
    mode: "onChange",
    defaultValues: {
      email: formContext.user?.email || "",
      password: formContext.user?.password || "",
    },
  });

  async function onSubmit(values: z.infer<typeof stepTwoFormSchema>) {
    await formContext.updateUserData(values);
    setProgressValue(66.66);
    router.push("/new-user/step-three/");
  }

  const prevStep = () => {
    router.back();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Progress value={progressValue} />
        <CardTitle>Create user</CardTitle>
        <CardDescription>Step 2 - Credentials</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...stepTwoForm}>
          <form
            onSubmit={stepTwoForm.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow space-y-8"
          >
            <FormField
              name="email"
              control={stepTwoForm.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Email"
                  placeholder="Email"
                  type={"email"}
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="password"
              control={stepTwoForm.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Password"
                  placeholder="Password"
                  type={"password"}
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <div className="flex justify-between">
              <Button type="button" onClick={prevStep}>
                Prev
              </Button>
              <Button type="submit" disabled={!stepTwoForm.formState.isValid}>
                {stepTwoForm.formState.isSubmitted && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
