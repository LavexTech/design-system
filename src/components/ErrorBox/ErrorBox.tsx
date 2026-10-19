import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useResolvedFontFamily } from "../../fontSetup"
import Constants from "../../constants/constants"
import { IconClose } from "../Icons/IconClose"

export interface ErrorBoxProps {
  title: string
  details: string
}

const C = Constants.styles

export const ErrorBox: React.FC<ErrorBoxProps> = ({ title, details }) => {
  const regular = useResolvedFontFamily(C.fontFamily.REGULAR)
  const bold = useResolvedFontFamily(C.fontFamily.BOLD)

  return (
    <View accessibilityRole="alert" style={styles.box}>
      <View style={styles.badge}>
        <IconClose size={20} color={C.feedback.DANGER_SURFACE} strokeWidth={3} />
      </View>
      <Text style={[styles.title, { fontFamily: bold, fontWeight: "normal" }]}>{title}</Text>
      <Text style={[styles.details, { fontFamily: regular, fontWeight: "normal" }]}>{details}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "stretch",
    backgroundColor: C.feedback.DANGER_SURFACE,
    borderRadius: C.borderRadius["2XL"],
    padding: C.spacing.MEDIUM,
    gap: C.spacing.SMALL,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.text.DANGER,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: C.text.DANGER,
    fontSize: C.fontSize.TITLE,
    lineHeight: C.lineHeight.TITLE,
    flexShrink: 1,
  },
  details: {
    color: C.text.DEFAULT,
    fontSize: C.fontSize.BODY,
    lineHeight: C.lineHeight.BODY,
    flexShrink: 1,
  },
})
