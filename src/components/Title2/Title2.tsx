import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface Title2Props {
  text: string;
}

export const Title2: React.FC<Title2Props> = ({ text }) => {
  return <Text style={styles.title2}>{text}</Text>;
};

const styles = StyleSheet.create({
  title2: {
    fontSize: Constants.styles.fontSize.LARGER,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGER,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
