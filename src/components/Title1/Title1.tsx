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
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 48,
    fontFamily: "Roboto, sans-serif",
    color: "#262627",
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
