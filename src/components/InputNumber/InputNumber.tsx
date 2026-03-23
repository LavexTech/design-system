import React from "react"
import { Input } from "../Input/Input"

type InputNumberProps = {
  value: string,
  onChange: (value: string) => void,
  label?: string,
  placeholder?: string,
  errorMessage?: string,
  darkMode?: boolean,
  fontScale?: number,
  min?: number,
  max?: number,
  length?: number,
}

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  label = "Número",
  placeholder = "Digite um número",
  errorMessage = "Número inválido",
  darkMode = false,
  fontScale = 1,
  min,
  max,
  length,
}) => {
  const validateNumber = (inputValue: string): boolean => {
    if (!inputValue) return true;

    // Remove espaços e caracteres não numéricos para validação
    const cleanValue = inputValue.replace(/[\s\D]/g, "");
    
    if (cleanValue === "") return true;
    
    const numericValue = parseFloat(cleanValue);

    // Verifica se é um número válido
    if (isNaN(numericValue)) return false;

    // Valida valor mínimo
    if (min !== undefined && numericValue < min) return false;

    // Valida valor máximo
    if (max !== undefined && numericValue > max) return false;

    return true;
  };

  const applyMask = (inputValue: string): string => {
    // Remove caracteres não numéricos
    let cleanValue = inputValue.replace(/[^\d]/g, "");

    // Aplica restrição de comprimento durante a digitação
    if (length !== undefined && cleanValue.length > length) {
      cleanValue = cleanValue.slice(0, length);
    }

    // Aplica máscara: adiciona espaço a cada 4 dígitos
    let maskedValue = "";
    for (let i = 0; i < cleanValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        maskedValue += " ";
      }
      maskedValue += cleanValue[i];
    }

    return maskedValue;
  };

  const handleChange = (inputValue: string) => {
    const maskedValue = applyMask(inputValue);
    onChange(maskedValue);
  };

  const getErrorMessage = (): string => {
    if (!value) return errorMessage;

    // Remove espaços e caracteres não numéricos para validação
    const cleanValue = value.replace(/[\s\D]/g, "");
    
    if (cleanValue === "") return errorMessage;
    
    const numericValue = parseFloat(cleanValue);

    if (isNaN(numericValue)) return errorMessage;

    if (min !== undefined && numericValue < min) {
      return `Valor deve ser maior ou igual a ${min}`;
    }

    if (max !== undefined && numericValue > max) {
      return `Valor deve ser menor ou igual a ${max}`;
    }

    return errorMessage;
  };

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      validation={validateNumber}
      errorMessage={getErrorMessage()}
      mobileKeyboard="number"
      darkMode={darkMode}
      fontScale={fontScale}
    />
  );
};