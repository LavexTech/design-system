import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { TextBox as Text } from "../Text/Text";

export interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  mask?: string;
  mobileKeyboard?: "text" | "email" | "phone" | "number";
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder = "",
  onChange,
  validation,
  errorMessage,
  mask,
  mobileKeyboard = "text",
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const applyMask = (inputValue: string, maskPattern?: string): string => {
    if (!maskPattern) return inputValue;

    const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");
    let maskedValue = "";
    let valueIndex = 0;

    for (let i = 0; i < maskPattern.length && valueIndex < cleanValue.length; i++) {
      const maskChar = maskPattern[i].toUpperCase();

      if (maskChar === 'X' || maskChar === '9' || maskChar === '0' || maskChar === 'A') {
        const char = cleanValue[valueIndex];
        const isValidChar =
          maskChar === 'X' ||
          (maskChar === '9' && /\d/.test(char)) ||
          (maskChar === '0' && /\d/.test(char)) ||
          (maskChar === 'A' && /[a-zA-Z]/.test(char));

        if (isValidChar) {
          maskedValue += char;
          valueIndex++;
        } else {
          continue;
        }
      } else {
        maskedValue += maskPattern[i];
      }
    }

    return maskedValue;
  };

  const handleTextChange = (text: string) => {
    let processedValue = text;

    if (mask) {
      processedValue = applyMask(text, mask);
    }

    onChange(processedValue);

    if (validation) {
      const valid = validation(processedValue);
      setIsValid(valid);
    }
  };

  useEffect(() => {
    if (validation && value) {
      const valid = validation(value);
      setIsValid(valid);
    }
  }, [value, validation]);

  const getKeyboardType = ():
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad" => {
    switch (mobileKeyboard) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  return (
    <View style={styles.container}>
      <Text text={label} />
      <TextInput
        style={[styles.input, !isValid && styles.inputError]}
        value={value}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        keyboardType={getKeyboardType()}
        placeholderTextColor={Constants.styles.textColor.INFO}
      />
      {!isValid && errorMessage && (
        <Text text={errorMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    marginBottom: Constants.styles.spacing.TINY,
  },
  input: {
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.MEDIUM,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    paddingVertical: Constants.styles.spacing.MEDIUM,
    fontSize: "20px",
    fontFamily: "Roboto-Regular",
    color: Constants.styles.textColor.DEFAULT,
    backgroundColor: Constants.styles.backgroundColor.WHITE,
  },
  inputError: {
    borderColor: Constants.styles.textColor.DANGER,
  },
  errorText: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DANGER,
    marginTop: Constants.styles.spacing.TINY,
  },
});
