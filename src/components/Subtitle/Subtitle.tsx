import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface SubtitleProps {
  text: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return <Text style={styles.Subtitle}>{text}</Text>;
};

const styles = StyleSheet.create({
  Subtitle: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGE,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
