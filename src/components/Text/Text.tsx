import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
  level? : "success" | "error" | "warning" | "default";
  position? : "left" | "center" | "right";
}

export const TextBox: React.FC<TextProps> = ({ text, size = "medium", level = "default", position = "left" }) => {
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

  const styles = StyleSheet.create({
    text: {
      fontWeight: Constants.styles.fontWeight.NORMAL,
      lineHeight: Constants.styles.lineHeight.LARGE,
      fontFamily: Constants.styles.fontFamily.REGULAR,
      textAlign: position,
      flexWrap: "wrap",
      flexShrink: 1,
    },
  });

  return <Text style={
    {
      ...styles.text,
      fontSize,
      color
    }}>
    {text}
  </Text>;
};


