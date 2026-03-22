import React, { useState, useEffect } from "react"
import { Input } from "../Input/Input"

type InputPhoneProps = {
  value: string,
  onChange: (value: string) => void,
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  darkMode?: boolean,
  fontScale?: number,
}

export const InputPhone: React.FC<InputPhoneProps> = ({
  value,
  onChange,
  label = "Telefone",
  placeholder = "(00) 00000-0000",
  errorMessage = "Telefone deve ter 11 dígitos",
  darkMode = false,
  fontScale = 1,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const applyPhoneMask = (inputValue: string): string => {
    const digits = inputValue.replace(/\D/g, "").slice(0, 11)

    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true
    const digits = phone.replace(/\D/g, "")
    return digits.length === 11
  };

  const handleChange = (text: string) => {
    const maskedValue = applyPhoneMask(text)
    onChange(maskedValue)
    
    const valid = validatePhone(maskedValue)
    setIsValid(valid)
  };


  useEffect(() => {
    const valid = validatePhone(value)
    setIsValid(valid)
  }, [value])

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      validation={() => isValid}
      errorMessage={errorMessage}
      mobileKeyboard="phone"
      darkMode={darkMode}
      fontScale={fontScale}
    />
  );
};
