import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface SubtitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
}

export const Subtitle: React.FC<SubtitleProps> = ({ text, position = 'left' }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  return <Text style={[styles.Subtitle, { textAlign: position }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  Subtitle: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGE,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
