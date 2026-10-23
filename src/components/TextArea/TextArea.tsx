import React, { useState } from "react"
import { Platform, StyleSheet, Text, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { useLavexTheme } from "../../theme/LavexThemeProvider"

type TextAreaProps = {
  label: string
  value?: string
  placeholder?: string
  onChange: (value: string) => void
  maxLength?: number
  counterSuffix?: string
  darkMode?: boolean
  fontScale?: number
}

const C = Constants.styles

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeholder,
  maxLength,
  counterSuffix = " caracteres",
  onChange,
  fontScale = 1,
  darkMode,
}) => {
  void darkMode
  const { mode, colors } = useLavexTheme()
  const [focused, setFocused] = useState(false)
  const fieldFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const labelFont = useResolvedFontFamily(C.fontFamily.SEMIBOLD)
  const currentLength = value?.length || 0

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              fontSize: C.fontSize.LABEL * fontScale,
              fontFamily: labelFont,
              fontWeight: labelFont ? "normal" : "600",
              color: colors.text,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        accessibilityLabel={label}
        multiline
        value={value}
        placeholder={placeholder}
        placeholderTextColor={C.text.PLACEHOLDER}
        keyboardAppearance={mode === "dark" ? "dark" : "light"}
        onChangeText={(text) => {
          if (maxLength && text.length > maxLength) return
          onChange(text)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        textAlignVertical="top"
        style={[
          styles.field,
          {
            borderColor: focused ? colors.accent : colors.borderInteractive,
            backgroundColor: colors.surface,
            color: colors.text,
            fontFamily: fieldFont,
            fontSize: C.fontSize.BODY * fontScale,
          },
          Platform.OS === "web" ? styles.webNoOutline : null,
        ]}
      />
      {maxLength ? (
        <Text style={[styles.counter, { color: colors.textMuted }]}>
          {currentLength}/{maxLength}{counterSuffix}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", gap: 6 },
  label: { lineHeight: C.lineHeight.LABEL },
  webNoOutline: {
    outlineStyle: "none",
    outlineWidth: 0,
  } as object,
  field: {
    minHeight: 120,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderRadius: C.borderRadius.LARGE,
    padding: 16,
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: C.fontSize.CAPTION,
  },
})
