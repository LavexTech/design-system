import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
  level? : "success" | "error" | "warning" | "default";
}

export const TextBox: React.FC<TextProps> = ({ text, size = "medium", level = "default" }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  const sizes = {
    small: 15,
    medium: Constants.styles.fontSize.MEDIUM,
    large: 20,
  }

  const levels = {
    success: Constants.styles.textColor.SUCCESS,
    error: Constants.styles.textColor.DANGER,
    warning: Constants.styles.textColor.WARNING,
    default: Constants.styles.textColor.DEFAULT,
  }

  const fontSize = sizes[size];
  const color = levels[level];

  return <Text style={
    {
      ...styles.text,
      fontSize,
      color
    }}>
    {text}
  </Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.fontSize.MEDIUM,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
