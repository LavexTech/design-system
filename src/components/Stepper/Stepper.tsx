import React from "react"
import { View, Pressable, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { TextBox } from "../Text/Text"
import { IconPlus } from "../Icons/IconPlus"
import { IconMinus } from "../Icons/IconMinus"
import { IconTrash } from "../Icons/IconTrash"

type StepperProps = {
  text: string,
  max: number,
  min: number,
  value: number,
  onChange: (value: number) => void
  onDelete?: () => void,
}

export const Stepper: React.FC<StepperProps> = ({
  text,
  max,
  min,
  value,
  onChange,
  onDelete,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  };

  const isMinDisabled = value <= min
  const isMaxDisabled = value >= max

  return (
    <View style={styles.container}>
      {onDelete && (
        <Pressable onPress={onDelete} style={[styles.button, styles.buttonAction, styles.buttonDelete]}>
          <IconTrash width={Constants.styles.icon.SMALL} height={Constants.styles.icon.SMALL} />
        </Pressable>
      )}
      <View style={styles.labelContainer}>
        <TextBox text={text} size="medium" />
      </View>
      <View style={styles.valueContainer}>
        <TextBox text={String(value)} size="medium" />
      </View>
      <View style={styles.stepperButtons}>
        <Pressable
          onPress={handleDecrement}
          disabled={isMinDisabled}
          style={[
            styles.button,
            styles.buttonLeft,
            isMinDisabled && styles.buttonDisabled,
          ]}
        >
          <IconMinus width={Constants.styles.icon.SMALL} height={Constants.styles.icon.SMALL} />
        </Pressable>
        <Pressable
          onPress={handleIncrement}
          disabled={isMaxDisabled}
          style={[
            styles.button,
            styles.buttonRight,
            isMaxDisabled && styles.buttonDisabled,
          ]}
        >
          <IconPlus width={Constants.styles.icon.SMALL} height={Constants.styles.icon.SMALL} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  buttonDelete: {
    marginRight: Constants.styles.spacing.SMALL,
  },
  labelContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: Constants.styles.spacing.SMALL,
    minWidth: 0,
  },
  valueContainer: {
    minWidth: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: Constants.styles.spacing.SMALL,
    flexShrink: 0,
  },
  stepperButtons: {
    flexDirection: "row",
    alignItems: "center",
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
    flexShrink: 0,
  },
  button: {
    width: Constants.styles.componentSize.BUTTON_WIDTH,
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.MEDIUM,
  },
  buttonLeft: {
    borderTopLeftRadius: Constants.styles.borderRadius.MEDIUM,
    borderBottomLeftRadius: Constants.styles.borderRadius.MEDIUM,
    borderRightWidth: 0,
  },
  buttonRight: {
    borderTopRightRadius: Constants.styles.borderRadius.MEDIUM,
    borderBottomRightRadius: Constants.styles.borderRadius.MEDIUM,
    borderLeftWidth: 0,
  },
  buttonAction: {
    borderRightWidth: Constants.styles.borderWidth.THIN,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
  },
  buttonDisabled: {
    backgroundColor: Constants.styles.backgroundColor.GRAY,
    opacity: Constants.styles.opacity.LOW,
  },
})

