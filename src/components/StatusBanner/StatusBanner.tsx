import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconExclamation } from "../Icons/IconExclamation"

type StatusBannerProps = {
  text: string
  variant?: "info" | "dark"
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
  const dark = variant === "dark"
  const bodyFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  return (
    <View accessibilityRole="alert" style={[styles.box, { backgroundColor: dark ? C.brand.SURFACE : C.surface.INFO }]}>
      {icon ?? <IconExclamation size={20} color={dark ? C.brand.PRIMARY : C.brand.DARK} />}
      <Text style={[styles.text, { fontFamily: bodyFont, fontWeight: "normal", color: dark ? C.color.WHITE : C.text.DEFAULT, textAlign: align }]}>{text}</Text>
      {trailing}
    </View>
  )
}

const styles = StyleSheet.create({
  box: { alignSelf: "stretch", flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 14, paddingHorizontal: 16, borderRadius: C.borderRadius.XL },
  text: { flex: 1, fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION },
})
