import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Constants from "../../constants/constants"

export type TagVariant = "primary-outline" | "success-outline" | "danger-outline"
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
  { borderColor: string; color: string }
> = {
  "primary-outline": {
    borderColor: Constants.styles.textColor.PRIMARY,
    color: Constants.styles.textColor.PRIMARY,
  },
  "success-outline": {
    borderColor: Constants.styles.textColor.SUCCESS,
    color: Constants.styles.textColor.SUCCESS,
  },
  "danger-outline": {
    borderColor: Constants.styles.textColor.DANGER,
    color: Constants.styles.textColor.DANGER,
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
          borderColor: colors.borderColor,
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
    borderWidth: 1,
    borderRadius: Constants.styles.borderRadius.SMALL,
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
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
  },
})
