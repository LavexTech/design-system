import React from "react"
import { Input } from "../Input/Input"

type InputEmailProps = {
  value: string,
  onChange: (value: string) => void,
  label?: string,
  placeholder?: string,
  errorMessage?: string,
}

export const InputEmail: React.FC<InputEmailProps> = ({
  value,
  onChange,
  label = "Email",
  placeholder = "example@email.com",
  errorMessage = "Email deve ter formato válido",
}) => {
  const validateEmail = (email: string): boolean => {
    if (!email) return true;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    return atIndex > 0 && dotIndex > atIndex && dotIndex < email.length - 1;
  };

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      validation={validateEmail}
      errorMessage={errorMessage}
      mobileKeyboard="email"
    />
  );
};
