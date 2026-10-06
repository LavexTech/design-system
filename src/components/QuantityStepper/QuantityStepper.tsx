import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
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
  const atMin = value <= min
  const atMax = value >= max
  const name = label ?? "item"
  const labelFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const valueFont = useResolvedFontFamily(C.fontFamily.BOLD)
  return (
    <View style={styles.row}>
      {onDelete ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remover ${name}`} onPress={onDelete} style={styles.circle}>
          <IconTrash size={20} color={C.text.DANGER} />
        </Pressable>
      ) : null}
      {label ? <Text style={[styles.label, { fontFamily: labelFont, fontWeight: "normal" }]}>{label}</Text> : <View style={{ flex: 1 }} />}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Diminuir ${name}`}
        disabled={disabled || atMin}
        onPress={() => onChange(value - 1)}
        style={[styles.circle, styles.bordered, atMin ? styles.limit : null]}
      >
        <IconMinus size={20} color={atMin ? C.border.SOFT : C.text.DEFAULT} />
      </Pressable>
      <Text accessibilityRole="text" accessibilityLabel={`${value} ${valueSuffix ?? ""}`} style={[styles.value, { fontFamily: valueFont, fontWeight: "normal" }]}>
        {value}{valueSuffix ? ` ${valueSuffix}` : ""}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Aumentar ${name}`}
        disabled={disabled || atMax}
        onPress={() => onChange(value + 1)}
        style={[styles.circle, styles.bordered, atMax ? styles.limit : null]}
      >
        <IconPlus size={20} color={atMax ? C.border.SOFT : C.text.DEFAULT} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { alignSelf: "stretch", flexDirection: "row", alignItems: "center", gap: 12 },
  label: { flex: 1, fontSize: C.fontSize.BODY, color: C.text.DEFAULT },
  circle: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: C.surface.DEFAULT },
  bordered: { borderWidth: C.borderWidth.INTERACTIVE, borderColor: C.border.INTERACTIVE },
  limit: { borderColor: C.border.SOFT },
  value: { minWidth: 32, textAlign: "center", fontSize: C.fontSize.ACTION, color: C.text.DEFAULT },
})
