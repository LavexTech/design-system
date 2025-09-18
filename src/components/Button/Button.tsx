import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface ButtonProps {
  text: string;
  variant?:
    | "default"
    | "default-outline"
    | "success"
    | "danger"
    | "success-outline"
    | "danger-outline";
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  onClick,
}) => {
  const buttonStyle = [styles.button, styles[variant]];

  const textStyle = [styles.text, styles[`${variant}Text`]];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onClick}
      activeOpacity={Constants.styles.button.activeOpacity}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Constants.styles.spacing.SMALL,
    paddingHorizontal: Constants.styles.spacing.MEDIUM,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    alignItems: "center",
    justifyContent: "center",
    minHeight: Constants.styles.button.minHeight,
  },
  text: {
    fontSize: Constants.styles.fontSize.NORMAL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    textAlign: "center",
  },

  default: {
    backgroundColor: Constants.styles.textColor.DEFAULT,
    borderWidth: Constants.styles.button.borderWidth,
    borderStyle: Constants.styles.button.borderStyle,
    borderColor: Constants.styles.textColor.DEFAULT,
  },
  success: {
    backgroundColor: Constants.styles.textColor.SUCCESS,
  },
  danger: {
    backgroundColor: Constants.styles.textColor.DANGER,
  },
  "default-outline": {
    backgroundColor: "transparent",
    borderWidth: Constants.styles.button.borderWidth,
    borderStyle: Constants.styles.button.borderStyle,
    borderColor: Constants.styles.textColor.DEFAULT,
  },
  "success-outline": {
    backgroundColor: "transparent",
    borderWidth: Constants.styles.button.borderWidth,
    borderStyle: Constants.styles.button.borderStyle,
    borderColor: Constants.styles.textColor.SUCCESS,
  },
  "danger-outline": {
    backgroundColor: "transparent",
    borderWidth: Constants.styles.button.borderWidth,
    borderStyle: Constants.styles.button.borderStyle,
    borderColor: Constants.styles.textColor.DANGER,
  },

  defaultText: {
    color: Constants.styles.backgroundColor.WHITE,
  },
  successText: {
    color: Constants.styles.backgroundColor.WHITE,
  },
  dangerText: {
    color: Constants.styles.backgroundColor.WHITE,
  },
  "default-outlineText": {
    color: Constants.styles.textColor.DEFAULT,
  },
  "success-outlineText": {
    color: Constants.styles.textColor.SUCCESS,
  },
  "danger-outlineText": {
    color: Constants.styles.textColor.DANGER,
  },
});
