import React from "react";
import { Input, InputProps } from "../Input/Input";

export interface InputPhoneProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

export const InputPhone: React.FC<InputPhoneProps> = ({
  value,
  onChange,
  label = "Telefone",
  placeholder = "(00) 00000-0000",
  errorMessage = "Telefone deve ter formato válido",
}) => {
  const applyPhoneMask = (inputValue: string): string => {
    const digits = inputValue.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true;
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  };

  const handleChange = (text: string) => {
    const maskedValue = applyPhoneMask(text);
    onChange(maskedValue);
  };

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      validation={validatePhone}
      errorMessage={errorMessage}
      mobileKeyboard="phone"
    />
  );
};
