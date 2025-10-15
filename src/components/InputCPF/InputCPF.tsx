import React from "react";
import { Input } from "../Input/Input";

type InputCPFProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
}

export const InputCPF: React.FC<InputCPFProps> = ({
  value,
  onChange,
  label = "CPF",
  placeholder = "000.000.000-00",
  errorMessage = "CPF deve ter formato válido",
}) => {
  const validateCPF = (cpf: string): boolean => {
    if (!cpf) return true

    const digits = cpf.replace(/\D/g, "")
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false

    const checkDigit = (digits: string, length: number): number => {
      const sum = digits
        .slice(0, length)
        .split("")
        .reduce(
          (acc, digit, index) => acc + parseInt(digit) * (length + 1 - index),
          0
        )
      return ((sum * 10) % 11) % 10;
    }

    return (
      checkDigit(digits, 9) === parseInt(digits[9]) &&
      checkDigit(digits, 10) === parseInt(digits[10])
    );
  }

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      validation={validateCPF}
      errorMessage={errorMessage}
      mask="XXX.XXX.XXX-XX"
      mobileKeyboard="number"
    />
  );
};
