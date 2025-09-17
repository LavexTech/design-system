import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface ButtonProps {
  text: string;
  type?: "danger" | "success";
  style?: "fullfiled" | "outline";
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "success",
  style = "fullfiled",
  onClick,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`${style}Button`],
    styles[`${type}Button`],
    style === "outline" && styles[`${type}ButtonOutline`],
  ];

  const textStyle = [
    styles.text,
    styles[`${style}Text`],
    style === "outline" &&
      styles[`outlineText${type.charAt(0).toUpperCase() + type.slice(1)}`],
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onClick} activeOpacity={0.7}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Constants.styles.spacing.MEDIUM,
    paddingHorizontal: Constants.styles.spacing.LARGE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  text: {
    fontSize: Constants.styles.fontSize.NORMAL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.MAIN,
    textAlign: "center",
  },

  fullfiledButton: {},
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },

  successButton: {
    backgroundColor: Constants.styles.textColor.SUCCESS,
  },
  dangerButton: {
    backgroundColor: Constants.styles.textColor.DANGER,
  },

  successButtonOutline: {
    borderColor: Constants.styles.textColor.SUCCESS,
  },
  dangerButtonOutline: {
    borderColor: Constants.styles.textColor.DANGER,
  },

  fullfiledText: {
    color: Constants.styles.backgroundColor.WHITE,
  },

  outlineText: {
    color: Constants.styles.textColor.DEFAULT,
  },

  outlineTextSuccess: {
    color: Constants.styles.textColor.SUCCESS,
  },
  outlineTextDanger: {
    color: Constants.styles.textColor.DANGER,
  },
});
