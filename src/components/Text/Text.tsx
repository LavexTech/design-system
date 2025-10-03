import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
}

export const TextBox: React.FC<TextProps> = ({ text }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.fontSize.MEDIUM,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
