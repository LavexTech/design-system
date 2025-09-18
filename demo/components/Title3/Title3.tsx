import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface Title3Props {
  text: string;
}

export const Title3: React.FC<Title3Props> = ({ text }) => {
  return <Text style={styles.title3}>{text}</Text>;
};

const styles = StyleSheet.create({
  title3: {
    fontSize: Constants.styles.fontSize.NORMAL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.NORMAL,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
