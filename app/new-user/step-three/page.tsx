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
import { Roles } from "@/app/types";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import SelectForm from "@/components/ui/select-form";
import { selectItems } from "@/constants/constants";
import CheckboxForm from "@/components/ui/checkbox-form";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";

export default function StepThree() {
  const [progressValue, setProgressValue] = useState(66.66);
  const { toast } = useToast();

  const formContext = useMultiStepFormContext();
  const router = useRouter();

  const stepThreeFormSchema = z.object({
    role: z.nativeEnum(Roles),
    preferences: z.object({
      receiveEmails: z.boolean(),
      receiveNotifications: z.boolean(),
    }),
  });

  const stepThreeForm = useForm<z.infer<typeof stepThreeFormSchema>>({
    resolver: zodResolver(stepThreeFormSchema),
    mode: "onChange",
    defaultValues: {
      role: formContext.user?.role,
      preferences: {
        receiveEmails: !!formContext.user?.preferences?.receiveEmails,
        receiveNotifications:
          !!formContext.user?.preferences?.receiveNotifications,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof stepThreeFormSchema>) {
    const title = "Create action";
    try {
      await formContext.updateUserData(values, true);
      toast({
        variant: "default",
        title,
        description: "User was created successfully.",
      });
      setProgressValue(100);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title,
          description: error.message,
        });
      }
    }
  }

  const prevStep = () => {
    router.back();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Progress value={progressValue} />
        <CardTitle>Create user</CardTitle>
        <CardDescription>Step 3 - Permissions</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...stepThreeForm}>
          <form
            onSubmit={stepThreeForm.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow space-y-8"
          >
            <FormField
              name="role"
              control={stepThreeForm.control}
              render={({ field }) => (
                <SelectForm
                  label="Role"
                  placeholder="Role"
                  value={field.value}
                  items={selectItems}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              name="preferences.receiveEmails"
              control={stepThreeForm.control}
              render={({ field }) => (
                <CheckboxForm
                  label="Receive Emails"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FormField
              name="preferences.receiveNotifications"
              control={stepThreeForm.control}
              render={({ field }) => (
                <CheckboxForm
                  label="Receive Notifications"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prevStep}
                disabled={stepThreeForm.formState.isSubmitSuccessful}
              >
                Prev
              </Button>
              <Button
                type="submit"
                className="disabled:!cursor-not-allowed"
                disabled={stepThreeForm.formState.isSubmitSuccessful}
              >
                {stepThreeForm.formState.isSubmitting && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create user
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
