import React, { useCallback, useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { Button as GluestackButton, ButtonText } from "../../ui/button"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import Constants from "../../constants/constants";

type ButtonVariant =
  | "default"
  | "default-outline"
  | "success"
  | "danger"
  | "success-outline"
  | "danger-outline"
  | "primary"
  | "secondary"
  | "secondary-outline";

type ButtonBaseProps = {
  text: string;
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick: () => void;
  disabled?: boolean;
  darkMode?: boolean;
  fontScale?: number;
}

type ButtonProps =
  | (ButtonBaseProps & {
      needsConfirmation?: false | undefined;
      confirmationText?: undefined;
    })
  | (ButtonBaseProps & {
      needsConfirmation: true;
      confirmationText: string;
    })

const variantMap = {
  default: { action: "primary" as const, variant: "solid" as const },
  success: { action: "positive" as const, variant: "solid" as const },
  danger: { action: "negative" as const, variant: "solid" as const },
  "default-outline": { action: "primary" as const, variant: "outline" as const },
  "success-outline": { action: "positive" as const, variant: "outline" as const },
  "danger-outline": { action: "negative" as const, variant: "outline" as const },
  "primary": { action: "primary" as const, variant: "solid" as const },
  "secondary": { action: "secondary" as const, variant: "solid" as const },
  "secondary-outline": { action: "secondary" as const, variant: "outline" as const },
}

const CONFIRM_RESET_MS = 8000
const CONFIRM_ANIM_MS = 300
const DANGER_BG = Constants.styles.textColor.DANGER
const DANGER_TEXT = Constants.styles.color.WHITE

function resolveStaticStyles(
  variant: ButtonVariant,
  darkMode: boolean,
  fontScale: number,
) {
  let buttonStyle: Record<string, unknown> = {}
  let textStyle: Record<string, unknown> = {}

  if (variant === "primary") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.PRIMARY_DARK,
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.PRIMARY_LIGHT,
    }
  }
  if (variant === "secondary") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.PRIMARY_DARK,
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.BACKGROUND_LIGHT,
    }
  }
  if (variant === "secondary-outline") {
    buttonStyle = {
      backgroundColor: Constants.styles.color.BACKGROUND_LIGHT,
      borderColor: Constants.styles.color.PRIMARY_DARK,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.color.PRIMARY_DARK,
    }
  }
  if (variant === "danger-outline") {
    buttonStyle = {
      backgroundColor: "transparent",
      borderColor: DANGER_BG,
      borderWidth: 1,
    }
    textStyle = {
      color: DANGER_BG,
    }
  }
  if (variant === "danger") {
    buttonStyle = {
      backgroundColor: DANGER_BG,
      borderColor: DANGER_BG,
      borderWidth: 1,
    }
    textStyle = {
      color: DANGER_TEXT,
    }
  }

  if (darkMode && (variant === "default" || variant === "default-outline")) {
    buttonStyle = {
      backgroundColor: variant === "default" ? Constants.styles.theme.dark.background.subtle : "transparent",
      borderColor: Constants.styles.theme.dark.border.default,
      borderWidth: 1,
    }
    textStyle = {
      color: Constants.styles.theme.dark.text.default,
      fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
    }
  } else if (fontScale !== 1) {
    textStyle = {
      ...textStyle,
      fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
    }
  }

  return { buttonStyle, textStyle }
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  size,
  onClick,
  disabled = false,
  darkMode = false,
  fontScale = 1,
  needsConfirmation = false,
  confirmationText,
}) => {
  const { action, variant: gluestackVariant } = variantMap[variant]
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const confirmProgress = useRef(new Animated.Value(0)).current
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttonSize: "xs" | "sm" | "md" | "lg" | "xl" = size !== undefined ? size : "md"
  const { buttonStyle, textStyle } = resolveStaticStyles(variant, darkMode, fontScale)

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    Animated.timing(confirmProgress, {
      toValue: awaitingConfirmation ? 1 : 0,
      duration: CONFIRM_ANIM_MS,
      useNativeDriver: false,
    }).start()
  }, [awaitingConfirmation, confirmProgress])

  useEffect(() => {
    clearResetTimer()
    if (!awaitingConfirmation) {
      return
    }

    resetTimerRef.current = setTimeout(() => {
      setAwaitingConfirmation(false)
    }, CONFIRM_RESET_MS)

    return clearResetTimer
  }, [awaitingConfirmation, clearResetTimer])

  useEffect(() => clearResetTimer, [clearResetTimer])

  const handlePress = () => {
    if (disabled) {
      return
    }

    if (!needsConfirmation) {
      onClick()
      return
    }

    if (awaitingConfirmation) {
      clearResetTimer()
      setAwaitingConfirmation(false)
      onClick()
      return
    }

    setAwaitingConfirmation(true)
  }

  if (needsConfirmation) {
    const fromBg =
      (buttonStyle.backgroundColor as string) ||
      (variant.includes("outline") ? "transparent" : Constants.styles.color.BLUE)
    const fromBorder =
      (buttonStyle.borderColor as string) ||
      (variant.includes("outline") ? DANGER_BG : fromBg)
    const fromText =
      (textStyle.color as string) ||
      (variant.includes("outline") ? DANGER_BG : DANGER_TEXT)

    const animatedContainerStyle = {
      backgroundColor: confirmProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromBg, DANGER_BG],
      }),
      borderColor: confirmProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromBorder, DANGER_BG],
      }),
    }

    const animatedLabelStyle = {
      color: confirmProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [fromText, DANGER_TEXT],
      }),
      fontSize:
        (textStyle.fontSize as number) ||
        Constants.styles.fontSize.MEDIUM * fontScale,
    }

    const displayText =
      awaitingConfirmation && confirmationText ? confirmationText : text

    return (
      <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
        <Pressable
          onPress={handlePress}
          disabled={disabled}
          style={({ pressed }) => [
            { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
          ]}
        >
          <Animated.View
            style={[
              styles.confirmButton,
              {
                borderWidth: (buttonStyle.borderWidth as number) || 1,
              },
              animatedContainerStyle,
            ]}
          >
            <Animated.Text style={[styles.confirmLabel, animatedLabelStyle]}>
              {displayText}
            </Animated.Text>
          </Animated.View>
        </Pressable>
      </GluestackUIProvider>
    )
  }

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
    <GluestackButton
      action={action}
      variant={gluestackVariant}
      size={buttonSize}
      onPress={onClick}
      isDisabled={disabled}
      style={[buttonStyle]}
    >
      <ButtonText style={[textStyle]}>
        {text}
      </ButtonText>
    </GluestackButton>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  confirmButton: {
    minHeight: Constants.styles.componentSize.BUTTON_HEIGHT,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    paddingVertical: Constants.styles.spacing.SMALL,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmLabel: {
    fontWeight: Constants.styles.fontWeight.BOLD,
    textAlign: "center",
  },
})
