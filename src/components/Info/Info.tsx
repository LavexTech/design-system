import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface InfoProps {
  text: string;
}

export const Info: React.FC<InfoProps> = ({ text }) => {
  return <Text style={styles.info}>{text}</Text>;
};

const styles = StyleSheet.create({
  info: {
    fontSize: Constants.styles.fontSize.TINY,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.fontSize.TINY * 1.4,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.INFO,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
    opacity: 0.7,
  },
});
