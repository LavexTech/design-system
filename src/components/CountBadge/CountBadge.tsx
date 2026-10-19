import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"

type CountBadgeProps = {
  /** Contagem exibida. Zero ou menos não renderiza nada. */
  count: number
  /** Acima disso mostra `<max>+`. */
  max?: number
  accessibilityLabel?: string
}

const C = Constants.styles
const SIZE = 18

export const CountBadge: React.FC<CountBadgeProps> = ({ count, max = 9, accessibilityLabel }) => {
  const font = useResolvedFontFamily(C.fontFamily.BOLD)
  if (!(count > 0)) return null
  const label = count > max ? `${max}+` : String(Math.floor(count))
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? `${label} não lidas`}
      style={[styles.badge, label.length > 1 ? styles.wide : null]}
    >
      <Text style={[styles.text, { fontFamily: font, fontWeight: "normal" }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    minWidth: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: C.brand.DARK,
    alignItems: "center",
    justifyContent: "center",
  },
  wide: { paddingHorizontal: 5 },
  text: { fontSize: 11, lineHeight: 14, color: C.color.WHITE, textAlign: "center" },
})
