import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
  level? : "success" | "error" | "warning" | "default" | "primary";
  position? : "left" | "center" | "right";
  darkMode?: boolean;
  fontScale?: number;
  /** When false, text sizes to content (for use inside row layouts). Default true. */
  fill?: boolean;
}

export const TextBox: React.FC<TextProps> = ({
  text,
  size = "medium",
  level = "default",
  position = "left",
  darkMode = false,
  fontScale = 1,
  fill = true,
}) => {
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
    default: darkMode ? Constants.styles.theme.dark.text.default : Constants.styles.theme.light.text.default,
    primary: darkMode ? Constants.styles.theme.dark.text.primary : Constants.styles.theme.light.text.primary
  }

  const fontSize = sizes[size] * fontScale;
  const color = levels[level];

  const styles = StyleSheet.create({
    text: {
      fontWeight: Constants.styles.fontWeight.NORMAL,
      lineHeight: Constants.styles.lineHeight.LARGE,
      fontFamily: Constants.styles.fontFamily.REGULAR,
      textAlign: position,
      flexWrap: "wrap",
      flexShrink: 1,
      ...(fill ? { width: "100%" as const } : null),
    },
  });

  return <Text style={
    {
      ...styles.text,
      fontSize,
      lineHeight: Constants.styles.lineHeight.LARGE * fontScale,
      color
    }}>
    {text}
  </Text>;
};

