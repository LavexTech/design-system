import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
}

export const TextBox: React.FC<TextProps> = ({ text, size = "medium" }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  const sizes = {
    small: 15,
    medium: Constants.styles.fontSize.MEDIUM,
    large: 20,
  }

  const fontSize = sizes[size];

  return <Text style={
    {
      ...styles.text,
      fontSize
    }}>
    {text}
  </Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.fontSize.MEDIUM,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
