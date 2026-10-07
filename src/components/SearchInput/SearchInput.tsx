import React, { useState } from "react"
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
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
  const [focused, setFocused] = useState(false)
  const fieldFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  return (
    <View
      accessibilityRole="search"
      style={[
        styles.box,
        { borderColor: focused ? C.brand.DARK : C.border.INTERACTIVE },
      ]}
    >
      <View style={styles.icon}>
        <IconSearch size={20} color={C.text.MUTED} />
      </View>
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={C.text.PLACEHOLDER}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          { fontFamily: fieldFont, fontWeight: "normal", fontSize: C.fontSize.BODY * fontScale },
          Platform.OS === "web" ? styles.webNoOutline : null,
        ]}
      />
      {onClear ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
          onPress={() => {
            onClear()
            onChange("")
          }}
          style={styles.clear}
        >
          <IconClose size={18} color={C.text.MUTED} />
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
    backgroundColor: C.surface.DEFAULT,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { position: "absolute", left: 16 },
  webNoOutline: {
    outlineStyle: "none",
    outlineWidth: 0,
  } as object,
  input: { flex: 1, height: 44, marginLeft: 44, color: C.text.DEFAULT, padding: 0 },
  clear: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
})
