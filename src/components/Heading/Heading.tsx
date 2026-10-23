import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";
import { useLavexTheme } from "../../theme/LavexThemeProvider";
import { ThemeColors } from "../../theme/tokens";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps {
  text: string;
  level: HeadingLevel;
  position?: "left" | "center" | "right";
}

type HeadingSpec = {
  fontSize: number;
  lineHeight: number;
  color: keyof ThemeColors;
  letterSpacing: number;
  font: string;
  fallbackWeight: TextStyle["fontWeight"];
  uppercase: boolean;
};

const C = Constants.styles;

const ARIA_LEVEL: Record<HeadingLevel, number> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
};

const LEVELS: Record<HeadingLevel, HeadingSpec> = {
  h1: {
    fontSize: C.fontSize.WORDMARK,
    lineHeight: C.lineHeight.WORDMARK,
    color: "primary",
    letterSpacing: -0.5,
    font: C.fontFamily.SEMIBOLD,
    fallbackWeight: "600",
    uppercase: false,
  },
  h2: {
    fontSize: C.fontSize.DISPLAY * 0.75,
    lineHeight: C.lineHeight.DISPLAY * 0.75,
    color: "text",
    letterSpacing: -0.4,
    font: C.fontFamily.BOLD,
    fallbackWeight: "700",
    uppercase: false,
  },
  h3: {
    fontSize: C.fontSize.MEDIUM,
    lineHeight: C.lineHeight.BODY,
    color: "text",
    letterSpacing: -0.2,
    font: C.fontFamily.BOLD,
    fallbackWeight: "700",
    uppercase: false,
  },
  h4: {
    fontSize: C.fontSize.CAPTION,
    lineHeight: C.lineHeight.CAPTION,
    color: "accent",
    letterSpacing: 0.6,
    font: C.fontFamily.BOLD,
    fallbackWeight: "700",
    uppercase: true,
  },
};

export const Heading: React.FC<HeadingProps> = ({ text, level, position = "left" }) => {
  const spec = LEVELS[level];
  const fontFamily = useResolvedFontFamily(spec.font);
  const { colors } = useLavexTheme();

  return (
    <Text
      accessibilityRole="header"
      aria-level={ARIA_LEVEL[level]}
      style={[
        styles.heading,
        {
          textAlign: position,
          fontFamily,
          fontWeight: fontFamily ? "normal" : spec.fallbackWeight,
          fontSize: spec.fontSize,
          lineHeight: spec.lineHeight,
          color: colors[spec.color],
          letterSpacing: spec.letterSpacing,
          textTransform: spec.uppercase ? "uppercase" : "none",
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
