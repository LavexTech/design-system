import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
  darkMode?: boolean;
  fontScale?: number;
}

export const Title: React.FC<TitleProps> = ({ text, position = 'left', darkMode = false, fontScale = 1 }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);
  if (!fontLoaded) return null;

  return <Text style={[styles.Title, { textAlign: position, color: darkMode ? Constants.styles.theme.dark.text.default : Constants.styles.theme.light.text.default, fontSize: Constants.styles.fontSize.LARGER * fontScale, lineHeight: Constants.styles.fontSize.LARGER * fontScale }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  Title: {
    fontSize: Constants.styles.fontSize.LARGER,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGER,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
