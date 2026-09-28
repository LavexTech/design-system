import React, { useEffect, useRef } from "react"
import { Animated, Pressable, StyleSheet, ViewStyle } from "react-native"
import Constants from "../../constants/constants"
import { IconCircle } from "../Icons/IconCircle"
import { IconCircleCheck } from "../Icons/IconCircleCheck"

const ICON_SCALE = 0.7
const ICON_BOX = 22 * ICON_SCALE
const ICON_SIZE = 16 * ICON_SCALE
const PADDING_SCALE = 0.5
const ICON_LEFT = 5
const ICON_TEXT_GAP = 8
const UNLOCKED_PADDING_LEFT = ICON_LEFT + ICON_BOX + ICON_TEXT_GAP
const UNLOCKED_PADDING_RIGHT = 14 * PADDING_SCALE
const UNLOCKED_PADDING_VERTICAL = 10 * PADDING_SCALE
const LOCKED_PADDING = 6 * 0.8 * PADDING_SCALE * 2
const LOCKED_PADDING_VERTICAL = (10 / 2) * 0.8 * PADDING_SCALE * 2
const ITEM_NAME_FONT_SIZE = Constants.styles.fontSize.MEDIUM
const LABEL_FONT_SIZE = ITEM_NAME_FONT_SIZE * 0.8
const LABEL_LINE_HEIGHT = Constants.styles.lineHeight.MEDIUM * 0.8
const LOCKED_LABEL_SCALE = 0.8
const LOCKED_FONT_SIZE = LABEL_FONT_SIZE * LOCKED_LABEL_SCALE
const LOCKED_LINE_HEIGHT = LABEL_LINE_HEIGHT * LOCKED_LABEL_SCALE

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
    lockProgress.setValue(isLocked ? 1 : 0)
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
    outputRange: [UNLOCKED_PADDING_VERTICAL, LOCKED_PADDING_VERTICAL],
  })
  const fontSize = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_FONT_SIZE, LOCKED_FONT_SIZE],
  })
  const lineHeight = lockProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [LABEL_LINE_HEIGHT, LOCKED_LINE_HEIGHT],
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
        <Animated.Text
          style={[
            styles.label,
            { color: textColor, fontSize, lineHeight },
          ]}
        >
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
  },
  iconSlot: {
    position: "absolute",
    left: ICON_LEFT,
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
