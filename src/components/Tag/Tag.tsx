import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Constants from "../../constants/constants"

export type TagVariant =
  | "primary-outline"
  | "success-outline"
  | "danger-outline"
  | "warning-outline"
export type TagSize = "default" | "sm"

type TagProps = {
  text: string
  variant?: TagVariant
  size?: TagSize
  darkMode?: boolean
  fontScale?: number
}

const variantStyles: Record<
  TagVariant,
  { backgroundColor: string; color: string }
> = {
  "primary-outline": {
    backgroundColor: Constants.styles.surface.ACCENT,
    color: Constants.styles.brand.DARK,
  },
  "success-outline": {
    backgroundColor: Constants.styles.surface.ACCENT,
    color: Constants.styles.brand.DARK,
  },
  "danger-outline": {
    backgroundColor: Constants.styles.feedback.DANGER_SURFACE,
    color: Constants.styles.text.DANGER,
  },
  "warning-outline": {
    backgroundColor: Constants.styles.feedback.WARNING_SURFACE,
    color: Constants.styles.feedback.WARNING_TEXT,
  },
}

export const Tag: React.FC<TagProps> = ({
  text,
  variant = "primary-outline",
  size = "default",
  fontScale = 1,
}) => {
  const colors = variantStyles[variant]
  const isSm = size === "sm"
  const fontSize =
    (isSm
      ? Constants.styles.fontSize.SMALL * 0.85
      : Constants.styles.fontSize.SMALL) * fontScale

  return (
    <View
      style={[
        styles.tag,
        isSm && styles.tagSm,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.color,
            fontSize,
            lineHeight: fontSize * 1.3,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
    borderRadius: Constants.styles.borderRadius.LARGE,
    paddingHorizontal: Constants.styles.spacing.SMALL,
    paddingVertical: Constants.styles.spacing.TINY,
    backgroundColor: "transparent",
  },
  tagSm: {
    paddingHorizontal: Constants.styles.spacing.TINY + 2,
    paddingVertical: 2,
  },
  text: {
    fontFamily: Constants.styles.fontFamily.REGULAR,
    fontWeight: "700",
  },
})
