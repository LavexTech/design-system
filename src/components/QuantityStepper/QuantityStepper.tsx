import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconMinus } from "../Icons/IconMinus"
import { IconPlus } from "../Icons/IconPlus"
import { IconTrash } from "../Icons/IconTrash"

type QuantityStepperProps = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  label?: string
  valueSuffix?: string
  onDelete?: () => void
  disabled?: boolean
  accessibilityLabel?: string
}

const C = Constants.styles

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min,
  max,
  onChange,
  label,
  valueSuffix,
  onDelete,
  disabled = false,
}) => {
  const { colors } = useLavexTheme()
  const atMin = value <= min
  const atMax = value >= max
  const name = label ?? "item"
  const labelFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const valueFont = useResolvedFontFamily(C.fontFamily.BOLD)
  return (
    <View style={[styles.row, label ? null : styles.hug]}>
      {onDelete ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remover ${name}`} onPress={onDelete} style={[styles.circle, { backgroundColor: colors.surface }]}>
          <IconTrash size={20} color={colors.danger} />
        </Pressable>
      ) : null}
      {label ? <Text style={[styles.label, { color: colors.text, fontFamily: labelFont, fontWeight: "normal" }]}>{label}</Text> : null}
      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Diminuir ${name}`}
          disabled={disabled || atMin}
          onPress={() => onChange(value - 1)}
          style={[styles.circle, styles.bordered, { backgroundColor: colors.surface, borderColor: atMin ? colors.border : colors.borderInteractive }]}
        >
          <IconMinus size={20} color={atMin ? colors.border : colors.text} />
        </Pressable>
        <Text accessibilityRole="text" accessibilityLabel={`${value} ${valueSuffix ?? ""}`} style={[styles.value, { color: colors.text, fontFamily: valueFont, fontWeight: "normal" }]}>
          {value}{valueSuffix ? ` ${valueSuffix}` : ""}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${name}`}
          disabled={disabled || atMax}
          onPress={() => onChange(value + 1)}
          style={[styles.circle, styles.bordered, { backgroundColor: colors.surface, borderColor: atMax ? colors.border : colors.borderInteractive }]}
        >
          <IconPlus size={20} color={atMax ? colors.border : colors.text} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { alignSelf: "stretch", flexDirection: "row", alignItems: "center", gap: 12 },
  hug: { alignSelf: "flex-start" },
  controls: { flexDirection: "row", alignItems: "center", gap: 6 },
  label: { flex: 1, fontSize: C.fontSize.BODY },
  circle: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  bordered: { borderWidth: C.borderWidth.INTERACTIVE },
  value: { minWidth: 24, textAlign: "center", fontSize: C.fontSize.BODY },
})
