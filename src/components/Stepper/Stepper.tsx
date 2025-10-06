import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { Grid } from "../Grid/Grid";

export interface StepperProps {
  text: string;
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  text,
  max,
  min,
  value,
  onChange,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const isMinDisabled = value <= min;
  const isMaxDisabled = value >= max;

  return (
    <Grid columns={2} gap={Constants.styles.spacing.SMALL}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
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
          <Text
            style={[
              styles.buttonText,
              isMinDisabled && styles.buttonTextDisabled,
            ]}
          >
            −
          </Text>
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
          <Text
            style={[
              styles.buttonText,
              isMaxDisabled && styles.buttonTextDisabled,
            ]}
          >
            +
          </Text>
        </Pressable>
      </View>
    </Grid>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  label: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
  },
  button: {
    width: Constants.styles.componentSize.BUTTON_WIDTH,
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderWidth: Constants.styles.borderWidth.REGULAR,
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
  buttonDisabled: {
    backgroundColor: Constants.styles.backgroundColor.GRAY,
    opacity: Constants.styles.opacity.DISABLED,
  },
  buttonText: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    color: Constants.styles.textColor.DEFAULT,
    lineHeight: Constants.styles.fontSize.LARGE,
  },
  buttonTextDisabled: {
    color: Constants.styles.textColor.INFO,
  },
  valueContainer: {
    minWidth: Constants.styles.componentSize.INPUT_MIN_WIDTH,
    height: Constants.styles.componentSize.BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY,
    borderTopWidth: Constants.styles.borderWidth.REGULAR,
    borderBottomWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.MEDIUM,
  },
  valueText: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
  },
});

