import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";
import { useLavexTheme } from "../../theme/LavexThemeProvider";

export interface MainTitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
}

const C = Constants.styles

export const MainTitle: React.FC<MainTitleProps> = ({ text, position = 'left' }) => {
  const { colors } = useLavexTheme()
  const fontFamily = useResolvedFontFamily(C.fontFamily.BOLD)

  return (
    <Text
      style={[
        styles.title,
        {
          textAlign: position,
          color: colors.text,
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
    letterSpacing: -0.4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
