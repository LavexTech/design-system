import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Constants from "../../constants/constants"

export type TagVariant = "primary-outline" | "success-outline" | "danger-outline"

type TagProps = {
  text: string
  variant?: TagVariant
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
  fontScale = 1,
}) => {
  const colors = variantStyles[variant]

  return (
    <View
      style={[
        styles.tag,
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
            fontSize: Constants.styles.fontSize.SMALL * fontScale,
            lineHeight: Constants.styles.fontSize.SMALL * 1.3 * fontScale,
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
  text: {
    fontFamily: Constants.styles.fontFamily.REGULAR,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
  },
})
