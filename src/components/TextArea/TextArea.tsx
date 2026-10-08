import React, { useState } from "react"
import { Platform, StyleSheet, Text, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"

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
            borderColor: focused ? C.brand.DARK : C.border.INTERACTIVE,
            fontFamily: fieldFont,
            fontSize: C.fontSize.BODY * fontScale,
          },
          Platform.OS === "web" ? styles.webNoOutline : null,
        ]}
      />
      {maxLength ? (
        <Text style={styles.counter}>
          {currentLength}/{maxLength}{counterSuffix}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", gap: 6 },
  label: { color: C.text.DEFAULT, lineHeight: C.lineHeight.LABEL },
  webNoOutline: {
    outlineStyle: "none",
    outlineWidth: 0,
  } as object,
  field: {
    minHeight: 120,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderRadius: C.borderRadius.LARGE,
    backgroundColor: C.surface.DEFAULT,
    color: C.text.DEFAULT,
    padding: 16,
  },
  counter: {
    alignSelf: "flex-end",
    color: C.text.MUTED,
    fontSize: C.fontSize.CAPTION,
  },
})
