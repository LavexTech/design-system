import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
}

export const Text: React.FC<TextProps> = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.fontSize.SMALL,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
