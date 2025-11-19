import React from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { Grid } from "../Grid/Grid"
import { TextBox } from "../Text/Text"
import { IconPlus } from "../Icons/IconPlus"
import { IconMinus } from "../Icons/IconMinus"
import { IconTrash } from "../Icons/IconTrash"
import { IconEdit } from "../Icons/IconEdit"

type StepperProps = {
  text: string,
  max: number,
  min: number,
  value: number,
  onChange: (value: number) => void
  onDelete?: () => void,
  onEdit?: () => void,
}

export const Stepper: React.FC<StepperProps> = ({
  text,
  max,
  min,
  value,
  onChange,
  onDelete,
  onEdit,
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
    <Grid columns={2} gap={Constants.styles.spacing.SMALL}>
      <View style={styles.labelContainer}>
        <TextBox text={text} />
      </View>
      <View style={styles.controlsContainer}>
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
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
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
        <View style={styles.buttonsContainer}>
          {onDelete && (
            <Pressable onPress={onDelete} style={[styles.button, styles.buttonLeft]}>
              <IconTrash width={Constants.styles.icon.SMALL} height={Constants.styles.icon.SMALL} />
            </Pressable>
          )}
          {onEdit && (
            <Pressable onPress={onEdit} style={[styles.button, styles.buttonLeft]}>
              <IconEdit width={Constants.styles.icon.SMALL} height={Constants.styles.icon.SMALL} />
            </Pressable>
          )}
        </View>
      </View>
    </Grid>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    marginTop: Constants.styles.spacing.SMALL,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Constants.styles.spacing.SMALL,
    marginLeft: Constants.styles.spacing.SMALL,
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
    borderWidth: Constants.styles.borderWidth.THIN,
    borderRightWidth: 0,
  },
  buttonRight: {
    borderTopRightRadius: Constants.styles.borderRadius.MEDIUM,
    borderBottomRightRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderLeftWidth: 0,
  },
  buttonDisabled: {
    backgroundColor: Constants.styles.backgroundColor.GRAY,
    opacity: Constants.styles.opacity.LOW,
  },
  valueContainer: {
    minWidth: Constants.styles.componentSize.INPUT_MIN_WIDTH,
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY,
    borderTopWidth: Constants.styles.borderWidth.THIN,
    borderBottomWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.MEDIUM,
  },
  valueText: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
  },
})

