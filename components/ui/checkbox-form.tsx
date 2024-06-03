"use client";

import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Checkbox } from "./checkbox";

interface CheckboxFormProps {
  label?: string;
  checked?: boolean;
  onCheckedChange?: () => void;
}

const CheckboxForm = ({
  label,
  checked,
  onCheckedChange,
}: CheckboxFormProps) => {
  return (
    <FormItem className="flex items-center gap-2">
      <FormLabel className="mt-2">{label}</FormLabel>
      <FormControl>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CheckboxForm;
