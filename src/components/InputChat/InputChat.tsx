import React from "react"
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconSend } from "../Icons/IconSend"

type InputChatProps = {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSend: () => void
}

const C = Constants.styles

export function InputChat({
  value,
  placeholder = "Escreva sua mensagem",
  onChange,
  onSend,
}: InputChatProps) {
  const { mode, colors } = useLavexTheme()
  const fieldFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const canSend = value.trim().length > 0
  const handleSend = () => {
    if (canSend) onSend()
  }

  return (
    <View style={styles.row}>
      <TextInput
        accessibilityLabel="Sua mensagem"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={C.text.PLACEHOLDER}
        keyboardAppearance={mode === "dark" ? "dark" : "light"}
        returnKeyType="send"
        onSubmitEditing={handleSend}
        style={[
          styles.field,
          {
            borderColor: colors.borderInteractive,
            backgroundColor: colors.surface,
            color: colors.text,
            fontFamily: fieldFont,
            fontWeight: "normal",
          },
          Platform.OS === "web" ? styles.webNoOutline : null,
        ]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Enviar mensagem"
        accessibilityState={{ disabled: !canSend }}
        disabled={!canSend}
        onPress={handleSend}
        style={[styles.send, { backgroundColor: canSend ? colors.primary : colors.surfaceMuted }]}
      >
        <IconSend size={20} color={canSend ? colors.onPrimary : colors.textMuted} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  webNoOutline: {
    outlineStyle: "none",
    outlineWidth: 0,
  } as object,
  field: {
    flex: 1,
    height: 48,
    paddingHorizontal: 18,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderRadius: C.borderRadius.PILL,
    fontSize: C.fontSize.BODY,
  },
  send: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
})
