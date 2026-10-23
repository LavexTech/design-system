import React, { useState } from "react"
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { IconClose } from "../Icons/IconClose"
import { IconSearch } from "../Icons/IconSearch"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSubmit?: () => void
  onClear?: () => void
  autoFocus?: boolean
  fontScale?: number
}

const C = Constants.styles

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Buscar",
  onSubmit,
  onClear,
  autoFocus = false,
  fontScale = 1,
}) => {
  const { mode, colors } = useLavexTheme()
  const [focused, setFocused] = useState(false)
  const fieldFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  return (
    <View
      accessibilityRole="search"
      style={[
        styles.box,
        {
          borderColor: focused ? colors.accent : colors.borderInteractive,
          backgroundColor: colors.surface,
          height: C.componentSize.INPUT_HEIGHT * fontScale,
        },
      ]}
    >
      <View style={styles.icon}>
        <IconSearch size={20} color={colors.textMuted} />
      </View>
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={C.text.PLACEHOLDER}
        keyboardAppearance={mode === "dark" ? "dark" : undefined}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          {
            fontFamily: fieldFont,
            fontWeight: "normal",
            color: colors.text,
            fontSize: C.fontSize.BODY * fontScale,
            height: 44 * fontScale,
          },
          Platform.OS === "web" ? styles.webNoOutline : null,
        ]}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
          onPress={() => {
            onChange("")
            onClear?.()
          }}
          style={[styles.clear, { width: 44 * fontScale, height: 44 * fontScale }]}
        >
          <IconClose size={18 * fontScale} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "stretch",
    height: C.componentSize.INPUT_HEIGHT,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderRadius: C.borderRadius.LARGE,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { position: "absolute", left: 16 },
  webNoOutline: {
    outlineStyle: "none",
    outlineWidth: 0,
  } as object,
  input: { flex: 1, height: 44, marginLeft: 44, padding: 0 },
  clear: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
})
