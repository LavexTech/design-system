import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TitleProps {
  text: string;
}

export const Title: React.FC<TitleProps> = ({ text }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  return <Text style={styles.Title}>{text}</Text>;
};

const styles = StyleSheet.create({
  Title: {
    fontSize: Constants.styles.fontSize.LARGER,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGER,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
