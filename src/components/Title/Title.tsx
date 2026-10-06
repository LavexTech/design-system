import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
  darkMode?: boolean;
  fontScale?: number;
}

const C = Constants.styles

export const Title: React.FC<TitleProps> = ({ text, position = 'left', darkMode = false, fontScale = 1 }) => {
  const fontFamily = useResolvedFontFamily(C.fontFamily.BOLD)
  const color = darkMode ? C.theme.dark.text.default : C.text.DEFAULT

  return (
    <Text
      style={[
        styles.title,
        {
          textAlign: position,
          color,
          fontFamily,
          fontWeight: fontFamily ? "normal" : "700",
          fontSize: C.fontSize.TITLE * fontScale,
          lineHeight: C.lineHeight.TITLE * fontScale,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
