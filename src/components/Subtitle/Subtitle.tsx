import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";
import { useLavexTheme } from "../../theme/LavexThemeProvider";

export interface SubtitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
}

const C = Constants.styles

export const Subtitle: React.FC<SubtitleProps> = ({ text, position = 'left' }) => {
  const { colors } = useLavexTheme()
  const fontFamily = useResolvedFontFamily(C.fontFamily.SEMIBOLD)

  return (
    <Text
      style={[
        styles.subtitle,
        {
          textAlign: position,
          color: colors.text,
          fontFamily,
          fontWeight: fontFamily ? "normal" : "600",
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: C.fontSize.SUBTITLE,
    lineHeight: C.lineHeight.SUBTITLE,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
