import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";

export type HeadingLevel = "h1" | "h2" | "h4";

export interface HeadingProps {
  text: string;
  level: HeadingLevel;
  position?: "left" | "center" | "right";
}

type HeadingSpec = {
  fontSize: number;
  lineHeight: number;
  color: string;
  letterSpacing: number;
  font: string;
  fallbackWeight: TextStyle["fontWeight"];
  uppercase: boolean;
};

const C = Constants.styles;

const ARIA_LEVEL: Record<HeadingLevel, number> = {
  h1: 1,
  h2: 2,
  h4: 4,
};

const LEVELS: Record<HeadingLevel, HeadingSpec> = {
  h1: {
    fontSize: C.fontSize.WORDMARK,
    lineHeight: C.lineHeight.WORDMARK,
    color: C.brand.PRIMARY,
    letterSpacing: -0.5,
    font: C.fontFamily.SEMIBOLD,
    fallbackWeight: "600",
    uppercase: false,
  },
  h2: {
    fontSize: C.fontSize.DISPLAY,
    lineHeight: C.lineHeight.DISPLAY,
    color: C.color.PRIMARY_DARK,
    letterSpacing: -0.4,
    font: C.fontFamily.BOLD,
    fallbackWeight: "700",
    uppercase: false,
  },
  h4: {
    fontSize: C.fontSize.CAPTION,
    lineHeight: C.lineHeight.CAPTION,
    color: C.brand.DARK,
    letterSpacing: 0.6,
    font: C.fontFamily.BOLD,
    fallbackWeight: "700",
    uppercase: true,
  },
};

export const Heading: React.FC<HeadingProps> = ({ text, level, position = "left" }) => {
  const spec = LEVELS[level];
  const fontFamily = useResolvedFontFamily(spec.font);

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
          color: spec.color,
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
