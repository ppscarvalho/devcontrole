"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  maxlength?: number; // Optional prop for input maxlength attribute. Default value is undefined.  // Example usage: <Input name="password" placeholder="Password" type="password" maxlength={16} /> // Example usage: <Input name="password" placeholder="Password" type="password" /> // Without maxlength prop, the input will have no maximum length. // Example usage: <Input name="email" placeholder="Email" type="email" /> // Example usage: <Input
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeholder,
  type,
  maxlength,
  register,
  rules,
  error,
}: InputProps) {
  return (
    <>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        maxLength={maxlength}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
}
