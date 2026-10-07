import React, { useEffect, useState } from "react"
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"

type ButtonVariant =
  | "default"
  | "default-outline"
  | "success"
  | "danger"
  | "success-outline"
  | "danger-outline"
  | "primary"
  | "secondary"
  | "secondary-outline"
  | "ghost"
  | "ghost-danger"

type ButtonBaseProps = {
  text: string
  variant?: ButtonVariant
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  onClick: () => void
  disabled?: boolean
  darkMode?: boolean
  fontScale?: number
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: React.ReactNode
}

type ButtonProps =
  | (ButtonBaseProps & {
      needsConfirmation?: false | undefined
      confirmationText?: undefined
    })
  | (ButtonBaseProps & {
      needsConfirmation: true
      confirmationText: string
    })

const SIZES = {
  xs: { height: 36, radius: 12, font: 14, pad: 16 },
  sm: { height: 40, radius: 12, font: 15, pad: 16 },
  md: { height: 48, radius: 14, font: 16, pad: 20 },
  lg: { height: 52, radius: 16, font: 17, pad: 24 },
  xl: { height: 56, radius: 16, font: 17, pad: 28 },
} as const

const C = Constants.styles

function palette(variant: ButtonVariant) {
  const filled = {
    backgroundColor: C.brand.PRIMARY,
    color: C.text.DEFAULT,
    borderColor: "transparent",
    borderWidth: 0,
  }
  const map: Record<ButtonVariant, typeof filled> = {
    default: filled,
    primary: filled,
    success: filled,
    "default-outline": {
      backgroundColor: C.surface.DEFAULT,
      color: C.text.DEFAULT,
      borderColor: C.border.INTERACTIVE,
      borderWidth: C.borderWidth.INTERACTIVE,
    },
    "success-outline": {
      backgroundColor: C.surface.ACCENT,
      color: C.brand.DARK,
      borderColor: C.brand.DARK,
      borderWidth: C.borderWidth.INTERACTIVE,
    },
    secondary: {
      backgroundColor: C.brand.SURFACE,
      color: C.color.WHITE,
      borderColor: "transparent",
      borderWidth: 0,
    },
    "secondary-outline": {
      backgroundColor: C.surface.DEFAULT,
      color: C.text.DEFAULT,
      borderColor: C.brand.SURFACE,
      borderWidth: C.borderWidth.INTERACTIVE,
    },
    danger: {
      backgroundColor: C.text.DANGER,
      color: C.color.WHITE,
      borderColor: "transparent",
      borderWidth: 0,
    },
    "danger-outline": {
      backgroundColor: C.surface.DEFAULT,
      color: C.text.DANGER,
      borderColor: C.text.DANGER,
      borderWidth: C.borderWidth.INTERACTIVE,
    },
    ghost: {
      backgroundColor: "transparent",
      color: C.brand.DARK,
      borderColor: "transparent",
      borderWidth: 0,
    },
    "ghost-danger": {
      backgroundColor: "transparent",
      color: C.text.DANGER,
      borderColor: "transparent",
      borderWidth: 0,
    },
  }
  return map[variant]
}

export const Button = (props: ButtonProps) => {
  const {
    text,
    onClick,
    variant = "default",
    size = "md",
    disabled = false,
    fontScale = 1,
    style,
    textStyle,
    icon,
    needsConfirmation,
    confirmationText,
  } = props
  void props.darkMode

  const [confirming, setConfirming] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const labelFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const metrics = SIZES[size]
  const colors = confirming
    ? {
        backgroundColor: C.text.DANGER,
        color: C.color.WHITE,
        borderColor: "transparent",
        borderWidth: 0,
      }
    : palette(variant)

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 8000)
    return () => clearTimeout(timer)
  }, [confirming])

  const transparent =
    colors.backgroundColor === "transparent" || colors.backgroundColor === C.surface.DEFAULT
  const backgroundColor = disabled
    ? C.surface.MUTED
    : pressed
      ? transparent
        ? C.surface.MUTED
        : colors.backgroundColor
      : hovered && transparent
        ? C.surface.MUTED
        : colors.backgroundColor

  const label = confirming && confirmationText ? confirmationText : text

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        if (needsConfirmation && !confirming) {
          setConfirming(true)
          return
        }
        setConfirming(false)
        onClick()
      }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.button,
        {
          height: metrics.height,
          borderRadius: metrics.radius,
          paddingHorizontal: metrics.pad,
          backgroundColor,
          borderColor: disabled ? "transparent" : colors.borderColor,
          borderWidth: disabled ? 0 : colors.borderWidth,
          opacity: pressed && !disabled && !transparent ? 0.85 : 1,
        },
        Platform.OS === "web"
          ? ({ outlineColor: C.brand.SURFACE, outlineWidth: 0 } as ViewStyle)
          : null,
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        style={[
          styles.label,
          {
            color: disabled ? C.text.DEFAULT : colors.color,
            fontSize: metrics.font * fontScale,
            lineHeight: metrics.font * 1.2 * fontScale,
            fontFamily: labelFont,
            fontWeight: labelFont ? "normal" : "700",
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: 16,
  },
})
