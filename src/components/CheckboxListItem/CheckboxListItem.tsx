import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
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
  const { colors } = useLavexTheme()
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
      divider ? [styles.divider, { borderBottomColor: colors.border }] : null,
      { opacity: pressed && !disabled ? 0.85 : 1 },
    ]}
  >
    <View
      style={[
        styles.box,
        { width: boxSize, height: boxSize, borderRadius: boxRadius, borderColor: colors.borderInteractive },
        checked ? { backgroundColor: colors.accent, borderColor: colors.accent } : null,
      ]}
    >
      {checked ? <IconCheck size={14 * (boxSize / 22)} color={colors.background} /> : null}
    </View>
    <Text style={[styles.label, { fontFamily: labelFont, fontWeight: "normal", fontSize: C.fontSize.BODY * fontScale, color: disabled ? colors.textMuted : colors.text }]}>
      {label}
    </Text>
    {trailing}
  </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { alignSelf: "stretch", minHeight: 52, flexDirection: "row", alignItems: "center", gap: 14 },
  divider: { borderBottomWidth: C.borderWidth.HAIRLINE },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: C.borderWidth.INTERACTIVE,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { flex: 1 },
})
