import React, { useEffect, useRef } from "react"
import { Animated, Pressable, StyleSheet, ViewStyle } from "react-native"
import Constants from "../../constants/constants"
import { IconCircle } from "../Icons/IconCircle"
import { IconCircleCheck } from "../Icons/IconCircleCheck"

const ANIMATION_MS = 300
const ICON_BOX = 22
const ICON_SIZE = 16
const UNLOCKED_PADDING_LEFT = 36
const UNLOCKED_PADDING_RIGHT = 14
const UNLOCKED_PADDING_VERTICAL = 10
const LOCKED_PADDING = 6

type CheckButtonProps = {
  text: string
  checked: boolean
  onClick?: (next: boolean) => void
  onTap?: (next: boolean) => void
  isLocked?: boolean
  lockedColor: string
  disabled?: boolean
  style?: ViewStyle
}

export const CheckButton: React.FC<CheckButtonProps> = ({
  text,
  checked,
  onClick,
  onTap,
  isLocked = false,
  lockedColor,
  disabled = false,
  style,
}) => {
  const lockProgress = useRef(new Animated.Value(isLocked ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(lockProgress, {
      toValue: isLocked ? 1 : 0,
      duration: ANIMATION_MS,
      useNativeDriver: false,
    }).start()
  }, [isLocked, lockProgress])

  const paddingLeft = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [UNLOCKED_PADDING_LEFT, LOCKED_PADDING],
  })
  const paddingRight = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [UNLOCKED_PADDING_RIGHT, LOCKED_PADDING],
  })
  const paddingVertical = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [UNLOCKED_PADDING_VERTICAL, LOCKED_PADDING],
  })
  const borderColor = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [Constants.styles.color.BLACK, lockedColor],
  })
  const textColor = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [Constants.styles.color.BLACK, lockedColor],
  })
  const iconOpacity = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })
  const iconSize = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [ICON_BOX, 0],
  })

  function handlePress() {
    if (disabled) {
      return
    }
    const next = !checked
    onClick?.(next)
    onTap?.(next)
  }

  const icon = checked ? (
    <IconCircleCheck color={Constants.styles.color.WHITE} size={ICON_SIZE} />
  ) : (
    <IconCircle color={Constants.styles.color.BLACK} size={ICON_SIZE} />
  )

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        styles.pressable,
        style,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
      ]}
    >
      <Animated.View
        style={[
          styles.outline,
          {
            paddingLeft,
            paddingRight,
            paddingVertical,
            borderColor,
          },
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.iconSlot,
            {
              opacity: iconOpacity,
              width: iconSize,
              height: iconSize,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.iconBadge,
              {
                backgroundColor: checked
                  ? Constants.styles.textColor.SUCCESS
                  : Constants.styles.color.GRAY,
              },
            ]}
          >
            {icon}
          </Animated.View>
        </Animated.View>
        <Animated.Text style={[styles.label, { color: textColor }]}>
          {text}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  disabled: {
    opacity: Constants.styles.opacity.MEDIUM,
  },
  pressed: {
    opacity: Constants.styles.opacity.HIGH,
  },
  outline: {
    borderWidth: Constants.styles.borderWidth.THICK,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    alignItems: "center",
    justifyContent: "center",
    minHeight: Constants.styles.componentSize.BUTTON_HEIGHT,
  },
  iconSlot: {
    position: "absolute",
    left: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBadge: {
    width: ICON_BOX,
    height: ICON_BOX,
    borderRadius: ICON_BOX / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    lineHeight: Constants.styles.lineHeight.MEDIUM,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    textAlign: "center",
  },
})
