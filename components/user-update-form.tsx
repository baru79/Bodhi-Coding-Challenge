"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Roles, User } from "@/app/types";
import { Form, FormField } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUser } from "@/services/user.service";
import { useToast } from "./ui/use-toast";
import { Loader2Icon } from "lucide-react";
import { InputForm } from "./ui/input-form";
import SelectForm from "./ui/select-form";
import { selectItems } from "@/constants/constants";
import CheckboxForm from "./ui/checkbox-form";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is empty" }).max(18, {
    message: "First Name should be shorter than 18 characteres",
  }),
  lastName: z.string().min(1, { message: "Last Name is empty" }).max(18, {
    message: "Last Name should be shorter than 18 characteres",
  }),
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
  phoneNumber: z
    .string()
    .min(10)
    .max(14, { message: "Phone should be between 10 to 14 characteres" }),
  role: z.string().min(1, { message: "Role is empty" }).max(50, {
    message: "Role should be shorter than 50 characters",
  }),
  receiveEmails: z.boolean(),
  receiveNotifications: z.boolean(),
});

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  user: User | null;
}

const UserUpdateForm = ({ isOpen, onOpenChange, user }: UserFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
      receiveEmails: false,
      receiveNotifications: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        receiveEmails: user.preferences?.receiveEmails,
        receiveNotifications: user.preferences?.receiveNotifications,
      });
    } else {
      form.reset();
    }
  }, [isOpen, user, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const userId = user?._id;
    if (!userId) return;
    const createUserDto: Omit<User, "_id" | "createdById"> = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      role: values.role as Roles,
      preferences: {
        receiveEmails: values.receiveEmails,
        receiveNotifications: values.receiveNotifications,
      },
      createdAtDate: new Date(),
      updatedById: "USER-TEST",
      updatedAtDate: new Date(),
    };
    const title = "Update action";
    try {
      await updateUser(userId, createUserDto);
      toast({
        variant: "default",
        title,
        description: "User was updated successfully.",
      });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title,
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update the user</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="First Name"
                  placeholder="First Name"
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
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
              name="email"
              control={form.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Email"
                  placeholder="Email"
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="password"
              control={form.control}
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
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field: { ...otherFieldProps } }) => (
                <InputForm
                  label="Phone Number"
                  placeholder="Phone Number"
                  type={"tel"}
                  autoComplete="off"
                  {...otherFieldProps}
                />
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <SelectForm
                  label="Role"
                  placeholder="Select a role"
                  value={field.value}
                  items={selectItems}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              name="receiveEmails"
              control={form.control}
              render={({ field }) => (
                <CheckboxForm
                  label="Receive Emails"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FormField
              name="receiveNotifications"
              control={form.control}
              render={({ field }) => (
                <CheckboxForm
                  label="Receive Notifications"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={form.formState.isSubmitSuccessful}
            onClick={form.handleSubmit(onSubmit)}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdateForm;
