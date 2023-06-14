import React from "react";
import { TextField } from "@mui/material";
import { toUppercaseFirstLetter } from "@/utils";

interface InputFieldProps {
  name: string;
  value: string | number | readonly string[] | undefined;
  variant?: "text" | "textarea" | "number";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  value,
  variant = "text",
  onChange,
}: InputFieldProps) {
  return (
    <TextField
      label={toUppercaseFirstLetter(name)}
      id={`input-${name}`}
      value={value}
      name={name}
      onChange={onChange}
      fullWidth
      multiline={variant === "textarea"}
    />
  );
}
