import React, { useEffect, useState } from "react"
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"

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
  /** Altura da caixa do campo. Padrão: 52. */
  fieldHeight?: number
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoCorrect?: boolean
}

const C = Constants.styles

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder = "",
  onChange,
  validation,
  errorMessage,
  mask,
  placeholderTextColor = C.text.PLACEHOLDER,
  mobileKeyboard = "text",
  secureTextEntry = false,
  rightElement,
  onBlur,
  onSubmitEditing,
  returnKeyType,
  fontScale = 1,
  fieldHeight,
  autoCapitalize,
  autoCorrect,
  darkMode,
}) => {
  void darkMode
  const [isValid, setIsValid] = useState(true)
  const [focused, setFocused] = useState(false)
  const fieldFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const labelFont = useResolvedFontFamily(C.fontFamily.BOLD)

  const applyMask = (inputValue: string, maskPattern?: string): string => {
    if (!maskPattern) return inputValue
    const invalidChars = /[A-WYZa-wyz0-9]/
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
      if (maskChar === "X" || maskChar === "x") {
        maskedValue += cleanValue[valueIndex]
        valueIndex++
      } else {
        maskedValue += maskChar
      }
    }
    return maskedValue
  }

  const handleTextChange = (text: string) => {
    const processedValue = mask ? applyMask(text, mask) : text
    onChange(processedValue)
    if (validation) setIsValid(validation(processedValue))
  }

  useEffect(() => {
    if (validation && value) setIsValid(validation(value))
  }, [value, validation])

  const keyboardType =
    mobileKeyboard === "email"
      ? "email-address"
      : mobileKeyboard === "phone"
        ? "phone-pad"
        : mobileKeyboard === "number"
          ? "numeric"
          : "default"

  const borderColor = !isValid
    ? C.text.DANGER
    : focused
      ? C.brand.DARK
      : C.border.INTERACTIVE

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              fontSize: C.fontSize.LABEL * fontScale,
              lineHeight: C.lineHeight.LABEL * fontScale,
              fontFamily: labelFont,
              fontWeight: labelFont ? "normal" : "700",
            },
          ]}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.field,
          { borderColor, height: fieldHeight ?? C.componentSize.INPUT_HEIGHT },
          Platform.OS === "web" && focused
            ? { outlineWidth: 2, outlineColor: C.brand.DARK, outlineOffset: 1 }
            : null,
        ]}
      >
        <TextInput
          accessibilityLabel={label}
          placeholder={placeholder}
          value={value}
          onChangeText={handleTextChange}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize ?? (mobileKeyboard === "email" ? "none" : undefined)}
          autoCorrect={autoCorrect ?? (mobileKeyboard === "email" ? false : undefined)}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            onBlur?.()
          }}
          onSubmitEditing={Platform.OS === "web" ? undefined : onSubmitEditing}
          returnKeyType={returnKeyType}
          blurOnSubmit={!!onSubmitEditing}
          onKeyPress={
            Platform.OS === "web" && onSubmitEditing
              ? (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                  if (event.nativeEvent.key === "Enter") {
                    event.preventDefault?.()
                    onSubmitEditing()
                  }
                }
              : undefined
          }
          style={[
            styles.input,
            {
              fontSize: C.fontSize.BODY * fontScale,
              fontFamily: fieldFont,
              paddingRight: rightElement ? 4 : 16,
            },
          ]}
        />
        {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
      </View>
      {!isValid && errorMessage ? (
        <Text style={[styles.error, { fontSize: C.fontSize.CAPTION * fontScale }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", gap: 6 },
  label: { color: C.text.DEFAULT },
  field: {
    height: C.componentSize.INPUT_HEIGHT,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderRadius: C.borderRadius.LARGE,
    backgroundColor: C.surface.DEFAULT,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    minWidth: 0,
    maxWidth: "100%",
    overflow: "hidden",
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    height: 44,
    color: C.text.DEFAULT,
    padding: 0,
  },
  right: {
    flexGrow: 0,
    flexShrink: 0,
  },
  error: { color: C.text.DANGER },
})
