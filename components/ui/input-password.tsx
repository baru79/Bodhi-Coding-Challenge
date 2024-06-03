"use client";

import * as React from "react";

import { InputWithIcon } from "./input-with-icon";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(true);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const Icon = showPassword ? EyeOffIcon : EyeIcon;
    return (
      <InputWithIcon
        placeholder="Password"
        type={showPassword ? "password" : "text"}
        endIcon={<Icon onClick={togglePasswordVisibility} />}
        ref={ref}
        {...props}
      />
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword };
