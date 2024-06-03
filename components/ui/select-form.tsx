"use client";

import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface ItemProp {
  value: string;
  label: string;
}

interface SelectFormProps {
  label?: string;
  placeholder?: string;
  items?: ItemProp[];
  value?: string;
  onChange?: () => void;
}

const SelectForm = ({
  label,
  placeholder,
  items,
  value,
  onChange,
}: SelectFormProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={onChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default SelectForm;
