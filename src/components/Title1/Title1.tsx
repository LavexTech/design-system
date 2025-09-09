import React from "react";
import { Text, StyleSheet } from "react-native";

export interface Title1Props {
  text: string;
}

export const Title1: React.FC<Title1Props> = ({ text }) => {
  return <Text style={styles.title1}>{text}</Text>;
};

const styles = StyleSheet.create({
  title1: {
    boxSizing: "border-box",
    display: "block",
    height: 48,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    width: 66.7344,
    textSizeAdjust: "100%",
    fontFamily: "Roboto, sans-serif",
    fontFeatureSettings: "normal",
    fontSize: 48,
    fontStyle: "normal",
    fontVariationSettings: "normal",
    fontWeight: "700",
    lineHeight: 48,
    tabSize: 4,
    textAlign: "start",
    textDecorationLine: "none",
    textWrapMode: "wrap",
    whiteSpaceCollapse: "preserve",
    color: "#262627",
    borderBottomStyle: "solid",
  },
});
