import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconCheck } from "../Icons/IconCheck"

type CheckboxListItemProps = {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
  trailing?: React.ReactNode
  disabled?: boolean
  divider?: boolean
  fontScale?: number
  /** Lado da caixa. O padrão é 22. */
  boxSize?: number
  /** Raio da caixa. O padrão é 6. */
  boxRadius?: number
  /** Quando informado, substitui a altura mínima de 52 por esse padding vertical. */
  verticalPadding?: number
}

const C = Constants.styles

export const CheckboxListItem: React.FC<CheckboxListItemProps> = ({
  label,
  checked,
  onChange,
  trailing,
  disabled = false,
  divider = true,
  fontScale = 1,
  boxSize = 22,
  boxRadius = 6,
  verticalPadding,
}) => {
  const labelFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  return (
  <Pressable
    accessibilityRole="checkbox"
    accessibilityState={{ checked, disabled }}
    accessibilityLabel={label}
    disabled={disabled}
    onPress={() => onChange(!checked)}
    style={({ pressed }) => [
      styles.row,
      verticalPadding != null ? { minHeight: 0, paddingVertical: verticalPadding } : null,
      divider ? styles.divider : null,
      { opacity: pressed && !disabled ? 0.85 : 1 },
    ]}
  >
    <View
      style={[
        styles.box,
        { width: boxSize, height: boxSize, borderRadius: boxRadius },
        checked ? styles.boxOn : null,
      ]}
    >
      {checked ? <IconCheck size={14 * (boxSize / 22)} color={C.color.WHITE} /> : null}
    </View>
    <Text style={[styles.label, { fontFamily: labelFont, fontWeight: "normal", fontSize: C.fontSize.BODY * fontScale, color: disabled ? C.text.MUTED : C.text.DEFAULT }]}>
      {label}
    </Text>
    {trailing}
  </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { alignSelf: "stretch", minHeight: 52, flexDirection: "row", alignItems: "center", gap: 14 },
  divider: { borderBottomWidth: C.borderWidth.HAIRLINE, borderBottomColor: C.border.SOFT },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: C.borderWidth.INTERACTIVE,
    borderColor: C.border.INTERACTIVE,
    alignItems: "center",
    justifyContent: "center",
  },
  boxOn: { backgroundColor: C.brand.DARK, borderColor: C.brand.DARK },
  label: { flex: 1 },
})
