import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TextBox as Text } from "../Text/Text";
import { Info } from "../Info/Info";

import Constants from "../../constants/constants";
import { Input as InputBase, InputField } from '../../ui/input';
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider";
import { Grid, GridItem } from "../Grid/Grid";

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
    <GluestackUIProvider>
      <Grid columns={1} gap={2}>
        <GridItem colSpan={4}>
          <Text text={label} />
        </GridItem>
        <GridItem colSpan={4}>
        <InputBase
          style={[styles.input, !isValid && styles.inputError]}
          variant="outline"
          size="xl"
          isDisabled={false}
          isInvalid={!isValid}
          isReadOnly={false}
        >
          <InputField 
            placeholder={placeholder} 
            value={value} 
            onChangeText={handleTextChange} 
            keyboardType={getKeyboardType()} 
            placeholderTextColor={Constants.styles.textColor.INFO} 
          />
        </InputBase>
        </GridItem>
        {!isValid && errorMessage && (
          <GridItem colSpan={4}>
          <Info text={errorMessage} />
          </GridItem>
        )}
      </Grid>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
  },
  inputError: {
    borderColor: Constants.styles.textColor.DANGER,
  },
  info: {
    color: Constants.styles.textColor.DANGER,
  },
});
