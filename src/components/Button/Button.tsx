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
  iconPosition?: "left" | "right"
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

type ButtonInteraction = {
  pressed: boolean
  hovered: boolean
  disabled: boolean
  confirming: boolean
}

function getButtonColors(variant: ButtonVariant, interaction: ButtonInteraction) {
  const colors = interaction.confirming
    ? {
        backgroundColor: C.text.DANGER,
        color: C.color.WHITE,
        borderColor: "transparent",
        borderWidth: 0,
      }
    : palette(variant)
  const transparent =
    colors.backgroundColor === "transparent" || colors.backgroundColor === C.surface.DEFAULT
  const backgroundColor = interaction.disabled
    ? C.surface.MUTED
    : interaction.pressed
      ? transparent
        ? C.surface.MUTED
        : colors.backgroundColor
      : interaction.hovered && transparent
        ? C.surface.MUTED
        : colors.backgroundColor

  return {
    backgroundColor,
    borderColor: interaction.disabled ? "transparent" : colors.borderColor,
    borderWidth: interaction.disabled ? 0 : colors.borderWidth,
    opacity: interaction.pressed && !interaction.disabled && !transparent ? 0.85 : 1,
    labelColor: interaction.disabled ? C.text.DEFAULT : colors.color,
  }
}

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

function ButtonComponent(props: ButtonProps) {
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
    iconPosition = "left",
    needsConfirmation,
    confirmationText,
  } = props
  void props.darkMode

  const [confirming, setConfirming] = useState(false)
  const [hovered, setHovered] = useState(false)
  const labelFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const metrics = SIZES[size]
  const isWeb = Platform.OS === "web"

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), 8000)
    return () => clearTimeout(timer)
  }, [confirming])

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
      onHoverIn={isWeb ? () => setHovered(true) : undefined}
      onHoverOut={isWeb ? () => setHovered(false) : undefined}
      style={({ pressed }) => {
        const colors = getButtonColors(variant, { pressed, hovered, disabled, confirming })
        return [
          styles.button,
          {
            height: metrics.height,
            borderRadius: metrics.radius,
            paddingHorizontal: metrics.pad,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: colors.borderWidth,
            opacity: colors.opacity,
          },
          isWeb
            ? ({ outlineColor: C.brand.SURFACE, outlineWidth: 0 } as ViewStyle)
            : null,
          iconPosition === "right" && icon ? styles.withTrailingIcon : null,
          style,
        ]
      }}
    >
      {icon && iconPosition === "left" ? <View style={[styles.icon, styles.iconLeft]}>{icon}</View> : null}
      <Text
        style={[
          styles.label,
          {
            color: getButtonColors(variant, {
              pressed: false,
              hovered,
              disabled,
              confirming,
            }).labelColor,
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
      {icon && iconPosition === "right" ? <View>{icon}</View> : null}
    </Pressable>
  )
}

export const Button = React.memo(ButtonComponent)

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
  withTrailingIcon: {
    flexDirection: "row",
    gap: 6,
  },
  icon: {
    position: "absolute",
  },
  iconLeft: {
    left: 16,
  },
})
