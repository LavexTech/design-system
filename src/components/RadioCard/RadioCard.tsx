import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Constants from "../../constants/constants"

type RadioCardProps = {
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
  showRadio?: boolean
  disabled?: boolean
  accessibilityLabel?: string
}

const C = Constants.styles

export const RadioCard: React.FC<RadioCardProps> = ({
  selected,
  onSelect,
  children,
  showRadio = true,
  disabled = false,
  accessibilityLabel,
}) => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected, disabled }}
    accessibilityLabel={accessibilityLabel}
    disabled={disabled}
    onPress={onSelect}
    style={({ pressed }) => [
      styles.card,
      {
        borderColor: selected ? C.brand.DARK : C.border.INTERACTIVE,
        backgroundColor: disabled ? C.surface.MUTED : C.surface.DEFAULT,
        opacity: pressed && !disabled ? 0.85 : 1,
      },
    ]}
  >
    {showRadio ? (
      <View style={[styles.radio, { borderColor: selected ? C.brand.DARK : C.border.INTERACTIVE }]}>
        {selected ? <View style={styles.dot} /> : null}
      </View>
    ) : null}
    <View style={styles.body}>{children}</View>
  </Pressable>
)

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    minHeight: 72,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: C.borderRadius.XL,
    borderWidth: C.borderWidth.INTERACTIVE,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: C.borderWidth.INTERACTIVE,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: { width: 11, height: 11, borderRadius: 6, backgroundColor: C.brand.DARK },
  body: { flex: 1 },
})
