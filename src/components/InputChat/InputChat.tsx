import React from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Constants from "../../constants/constants"
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
        returnKeyType="send"
        onSubmitEditing={handleSend}
        style={[styles.field, { fontFamily: fieldFont, fontWeight: "normal" }]}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Enviar mensagem"
        accessibilityState={{ disabled: !canSend }}
        disabled={!canSend}
        onPress={handleSend}
        style={[styles.send, { backgroundColor: canSend ? C.brand.PRIMARY : C.surface.MUTED }]}
      >
        <IconSend size={20} color={canSend ? C.brand.SURFACE : C.text.MUTED} />
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
  field: {
    flex: 1,
    height: 48,
    paddingHorizontal: 18,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderColor: C.border.INTERACTIVE,
    borderRadius: C.borderRadius.PILL,
    backgroundColor: C.surface.DEFAULT,
    color: C.text.DEFAULT,
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
