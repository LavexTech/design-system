import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface MainTitleProps {
  text: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({ text }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  return <Text style={styles.MainTitle}>{text}</Text>;
};

const styles = StyleSheet.create({
  MainTitle: {
    fontSize: Constants.styles.fontSize.LARGEST,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGEST,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
