import React, { useState, useEffect } from "react"
import { Platform, StyleSheet } from "react-native"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import { TextBox as Text } from "../Text/Text"
import { Input as InputBase, InputField } from '../../ui/input'
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"

type InputProps = {
  label: string
  value: string
  placeholder?: string
  placeholderTextColor?: string
  onChange: (value: string) => void
  validation?: (value: string) => boolean
  errorMessage?: string
  mask?: string
  mobileKeyboard?: "text" | "email" | "phone" | "number"
  secureTextEntry?: boolean
  rightElement?: React.ReactNode
  onBlur?: () => void
  onSubmitEditing?: () => void
  returnKeyType?: "done" | "go" | "next" | "search" | "send" | "default"
  darkMode?: boolean
  fontScale?: number
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder = "",
  onChange,
  validation,
  errorMessage,
  mask,
  placeholderTextColor = Constants.styles.textColor.INFO,
  mobileKeyboard = "text",
  secureTextEntry = false,
  rightElement,
  onBlur,
  onSubmitEditing,
  returnKeyType,
  darkMode = false,
  fontScale = 1,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const applyMask = (inputValue: string, maskPattern?: string): string => {
    if (!maskPattern) return inputValue
    
    const invalidChars = /[A-WYZa-wyz0-9]/;
    if (invalidChars.test(maskPattern)) {
      console.warn(`Máscara inválida: "${maskPattern}".`)
      return inputValue
    }

    const cleanValue = inputValue.replace(/[^a-zA-Z0-9]/g, "")
    let maskedValue = ""
    let valueIndex = 0

    for (let i = 0; i < maskPattern.length; i++) {
      if (valueIndex >= cleanValue.length) break

      const maskChar = maskPattern[i]

      if (maskChar === 'X' || maskChar === 'x') {
        maskedValue += cleanValue[valueIndex]
        valueIndex++
      } else {
        maskedValue += maskChar
      }
    }

    return maskedValue
  };

  const handleTextChange = (text: string) => {
    let processedValue = text

    if (mask) {
      processedValue = applyMask(text, mask)
    }

    onChange(processedValue)

    if (validation) {
      const valid = validation(processedValue)
      setIsValid(valid)
    }
  };

  useEffect(() => {
    if (validation && value) {
      const valid = validation(value)
      setIsValid(valid)
    }
  }, [value, validation])

  const getKeyboardType = ():
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad" => {
    switch (mobileKeyboard) {
      case "email":
        return "email-address"
      case "phone":
        return "phone-pad"
      case "number":
        return "numeric"
      default:
        return "default"
    }
  };

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
      <Grid columns={1} gap={2} darkMode={darkMode}>
        {label && (
          <GridItem colSpan={4}>
            <Text text={label} size="small" darkMode={darkMode} fontScale={fontScale} />
          </GridItem>
        )}
        <GridItem colSpan={4}>
        <InputBase
          style={[
            styles.input,
            darkMode ? styles.inputDark : null,
            !isValid && styles.inputError,
          ]}
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
            autoCapitalize={mobileKeyboard === "email" ? "none" : undefined}
            autoCorrect={mobileKeyboard === "email" ? false : undefined}
            placeholderTextColor={darkMode ? Constants.styles.theme.dark.text.muted : placeholderTextColor}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onSubmitEditing={Platform.OS === "web" ? undefined : onSubmitEditing}
            returnKeyType={returnKeyType}
            blurOnSubmit={!!onSubmitEditing}
            onKeyPress={
              Platform.OS === "web" && onSubmitEditing
                ? (event) => {
                    if (event.nativeEvent.key === "Enter") {
                      event.preventDefault?.()
                      onSubmitEditing()
                    }
                  }
                : undefined
            }
            style={{
              color: darkMode ? Constants.styles.theme.dark.text.default : Constants.styles.theme.light.text.default,
              fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
            }}
          />
          {rightElement}
        </InputBase>
        </GridItem>
        {!isValid && errorMessage && (
          <GridItem colSpan={4}>
          <Text size="small" level="error" text={errorMessage} darkMode={darkMode} fontScale={fontScale} />
          </GridItem>
        )}
      </Grid>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
  },
  inputDark: {
    backgroundColor: Constants.styles.theme.dark.background.subtle,
    borderColor: Constants.styles.theme.dark.border.default,
  },
  inputError: {
    borderColor: Constants.styles.textColor.DANGER,
  },
})
