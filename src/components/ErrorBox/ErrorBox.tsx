import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useResolvedFontFamily } from "../../fontSetup"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { IconClose } from "../Icons/IconClose"

export interface ErrorBoxProps {
  title: string
  details: string
}

const C = Constants.styles

export const ErrorBox: React.FC<ErrorBoxProps> = ({ title, details }) => {
  const { mode, colors } = useLavexTheme()
  const regular = useResolvedFontFamily(C.fontFamily.REGULAR)
  const bold = useResolvedFontFamily(C.fontFamily.BOLD)

  return (
    <View accessibilityRole="alert" style={[styles.box, { backgroundColor: colors.surfaceDanger }]}>
      <View style={[styles.badge, { backgroundColor: colors.danger }]}>
        <IconClose size={32} color={colors.surfaceDanger} strokeWidth={3} />
      </View>
      <Text style={[styles.title, { color: mode === "dark" ? colors.text : C.color.BLACK, fontFamily: bold, fontWeight: bold ? "normal" : "700" }]}>{title}</Text>
      <Text style={[styles.details, { color: colors.text, fontFamily: regular, fontWeight: regular ? "normal" : "400" }]}>{details}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "stretch",
    borderRadius: C.borderRadius["2XL"],
    padding: C.spacing.MEDIUM,
    gap: C.spacing.SMALL,
  },
  badge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: C.fontSize.TITLE,
    lineHeight: C.lineHeight.TITLE,
    flexShrink: 1,
  },
  details: {
    textAlign: "center",
    fontSize: C.fontSize.BODY,
    lineHeight: C.lineHeight.BODY,
    flexShrink: 1,
  },
})
