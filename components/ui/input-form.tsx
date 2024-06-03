"use client";

import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { InputPassword } from "./input-password";

interface InputFormProps {
  label?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, placeholder, type, autoComplete, ...restProps }, ref) => {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type !== "password" ? (
            <Input
              ref={ref}
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              {...restProps}
            />
          ) : (
            <InputPassword
              ref={ref}
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              {...restProps}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
);

InputForm.displayName = "InputForm";

export { InputForm };
