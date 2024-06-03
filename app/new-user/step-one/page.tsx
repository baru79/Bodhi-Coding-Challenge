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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
import { InputForm } from "@/components/ui/input-form";

export default function StepOne() {
  const [progressValue, setProgressValue] = useState(0);
  const formContext = useMultiStepFormContext();
  const router = useRouter();

  const stepOneFormSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is empty" }).max(18, {
      message: "First Name should be shorter than 18 characteres",
    }),
    lastName: z.string().min(1, { message: "Last Name is empty" }).max(18, {
      message: "Last Name should be shorter than 18 characteres",
    }),
    phoneNumber: z
      .string()
      .min(10)
      .max(14, { message: "Phone should be between 10 to 14 characteres" }),
  });

  const stepOneForm = useForm<z.infer<typeof stepOneFormSchema>>({
    resolver: zodResolver(stepOneFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: formContext.user?.firstName || "",
      lastName: formContext.user?.lastName || "",
      phoneNumber: formContext.user?.phoneNumber || "",
    },
  });

  async function onSubmit(values: z.infer<typeof stepOneFormSchema>) {
    await formContext.updateUserData(values);
    setProgressValue(33.33);
    router.push("/new-user/step-two/");
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Progress value={progressValue} />
        <CardTitle>Create user</CardTitle>
        <CardDescription>Step 1 - Personal details</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...stepOneForm}>
          <form
            onSubmit={stepOneForm.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow space-y-8"
          >
            <FormField
              name="firstName"
              control={stepOneForm.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Fist Name"
                  placeholder="First Name"
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="lastName"
              control={stepOneForm.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Last Name"
                  placeholder="Last Name"
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="phoneNumber"
              control={stepOneForm.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Phone Number"
                  placeholder="Phone Number"
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!stepOneForm.formState.isValid}>
                {stepOneForm.formState.isSubmitted && (
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
