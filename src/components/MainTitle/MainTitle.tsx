import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface MainTitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
}

const C = Constants.styles

export const MainTitle: React.FC<MainTitleProps> = ({ text, position = 'left' }) => {
  const fontFamily = useResolvedFontFamily(C.fontFamily.BOLD)

  return (
    <Text
      style={[
        styles.title,
        {
          textAlign: position,
          fontFamily,
          fontWeight: fontFamily ? "normal" : "700",
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: C.fontSize.DISPLAY,
    lineHeight: C.lineHeight.DISPLAY,
    color: C.text.DEFAULT,
    letterSpacing: -0.4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
