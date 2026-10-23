import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useResolvedFontFamily } from "../../fontSetup"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"

export type SimpleTableItem = {
  label: string
  value: string
  /** Rótulo em negrito e valor em tamanho de título. Default `false`. */
  emphasis?: boolean
}

export interface SimpleTableProps {
  items: SimpleTableItem[]
}

const C = Constants.styles
const RADIUS = C.borderRadius.LARGE

export const SimpleTable: React.FC<SimpleTableProps> = ({ items }) => {
  const { colors } = useLavexTheme()
  const regular = useResolvedFontFamily(C.fontFamily.REGULAR)
  const bold = useResolvedFontFamily(C.fontFamily.BOLD)

  return (
    <View style={styles.table}>
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        const emphasis = item.emphasis ?? false

        return (
          <View
            key={`${item.label}-${index}`}
            accessible
            accessibilityLabel={`${item.label}: ${item.value}`}
            style={[
              styles.row,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                borderTopLeftRadius: isFirst ? RADIUS : 0,
                borderTopRightRadius: isFirst ? RADIUS : 0,
                borderBottomLeftRadius: isLast ? RADIUS : 0,
                borderBottomRightRadius: isLast ? RADIUS : 0,
                marginTop: isFirst ? 0 : -C.borderWidth.HAIRLINE,
              },
            ]}
          >
            <View style={styles.cell}>
              <Text
                style={[
                  styles.label,
                  { color: colors.text, fontFamily: emphasis ? bold : regular, fontWeight: (emphasis ? bold : regular) ? "normal" : emphasis ? "700" : "400" },
                ]}
              >
                {item.label}
              </Text>
            </View>
            <View style={[styles.cell, styles.valueCell]}>
              <Text
                style={[
                  emphasis ? styles.valueEmphasis : styles.value,
                  { color: colors.text, fontFamily: bold, fontWeight: bold ? "normal" : "700" },
                ]}
              >
                {item.value}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  table: { alignSelf: "stretch" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: C.borderWidth.HAIRLINE,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cell: { width: "50%" },
  valueCell: { alignItems: "flex-end" },
  label: {
    fontSize: C.fontSize.BODY,
    lineHeight: C.lineHeight.BODY,
  },
  value: {
    fontSize: C.fontSize.BODY,
    lineHeight: C.lineHeight.BODY,
    textAlign: "right",
  },
  valueEmphasis: {
    fontSize: C.fontSize.TITLE,
    lineHeight: C.lineHeight.TITLE,
    textAlign: "right",
  },
})
