import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconExclamation } from "../Icons/IconExclamation"

type StatusBannerProps = {
  text: string
  variant?: "info" | "dark" | "warning"
  icon?: React.ReactNode
  align?: "left" | "center"
  trailing?: React.ReactNode
}

const C = Constants.styles

export const StatusBanner: React.FC<StatusBannerProps> = ({
  text,
  variant = "info",
  icon,
  align = "left",
  trailing,
}) => {
  const { colors } = useLavexTheme()
  const dark = variant === "dark"
  const warning = variant === "warning"
  const bodyFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  return (
    <View accessibilityRole="alert" style={[styles.box, { backgroundColor: dark ? colors.inverseSurface : warning ? C.feedback.WARNING_SURFACE : C.surface.INFO }]}>
      {icon ?? <IconExclamation size={20} color={dark ? colors.primary : warning ? C.feedback.WARNING_ICON : C.brand.DARK} />}
      <Text style={[styles.text, { fontFamily: bodyFont, fontWeight: "normal", color: dark ? colors.onInverse : warning ? C.feedback.WARNING_TEXT : C.text.DEFAULT, textAlign: align }]}>{text}</Text>
      {trailing}
    </View>
  )
}

const styles = StyleSheet.create({
  box: { alignSelf: "stretch", flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 14, paddingHorizontal: 16, borderRadius: C.borderRadius.XL },
  text: { flex: 1, fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION },
})
