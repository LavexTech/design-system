import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface MainTitleProps {
  text: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({ text }) => {
  return <Text style={styles.MainTitle}>{text}</Text>;
};

const styles = StyleSheet.create({
  MainTitle: {
    fontSize: Constants.styles.fontSize.LARGEST,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGEST,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
