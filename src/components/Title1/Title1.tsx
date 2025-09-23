import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface Title1Props {
  text: string;
}

export const Title1: React.FC<Title1Props> = ({ text }) => {
  return <Text style={styles.title1}>{text}</Text>;
};

const styles = StyleSheet.create({
  title1: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGE,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
