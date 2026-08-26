import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"
import Constants from "../../constants/constants"

type FABProps = {
  text: string
  onClick: () => void
  disabled?: boolean
  darkMode?: boolean
}

export const FAB: React.FC<FABProps> = ({
  text,
  onClick,
  disabled = false,
  darkMode = false,
}) => {
  // darkMode reserved for consumer theme parity with other DS buttons
  void darkMode

  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.fab,
        {
          opacity: disabled
            ? Constants.styles.opacity.LOW
            : pressed
              ? 0.9
              : 1,
        },
      ]}
    >
      <Text style={styles.label}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fab: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    paddingVertical: Constants.styles.spacing.SMALL + Constants.styles.spacing.TINY,
    borderRadius: 999,
    backgroundColor: Constants.styles.textColor.SUCCESS,
    shadowColor: Constants.styles.shadowColor.DEFAULT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    color: Constants.styles.color.WHITE,
    fontFamily: Constants.styles.fontFamily.BOLD,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontSize: Constants.styles.fontSize.SMALL,
    lineHeight: Constants.styles.lineHeight.MEDIUM,
  },
})
