import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
  level? : "success" | "error" | "warning" | "default" | "primary";
  position? : "left" | "center" | "right";
  darkMode?: boolean;
  fontScale?: number;
  /** When false, text sizes to content (for use inside row layouts). Default true. */
  fill?: boolean;
}

const C = Constants.styles

export const TextBox: React.FC<TextProps> = ({
  text,
  size = "medium",
  level = "default",
  position = "left",
  darkMode = false,
  fontScale = 1,
  fill = true,
}) => {
  const fontFamily = useResolvedFontFamily(C.fontFamily.REGULAR)
  const theme = darkMode ? C.theme.dark : C.theme.light

  const sizes = {
    small: { fontSize: C.fontSize.LABEL, lineHeight: C.lineHeight.LABEL },
    medium: { fontSize: C.fontSize.BODY, lineHeight: C.lineHeight.BODY },
    large: { fontSize: C.fontSize.ACTION, lineHeight: C.lineHeight.ACTION },
  }

  const levels = {
    success: C.brand.DARK,
    error: C.text.DANGER,
    warning: C.feedback.WARNING_TEXT,
    default: darkMode ? theme.text.default : C.text.DEFAULT,
    primary: darkMode ? theme.text.primary : C.brand.DARK,
  }

  const metrics = sizes[size]

  return (
    <Text
      style={[
        styles.text,
        {
          textAlign: position,
          fontFamily,
          fontWeight: fontFamily ? "normal" : "400",
          fontSize: metrics.fontSize * fontScale,
          lineHeight: metrics.lineHeight * fontScale,
          color: levels[level],
          ...(fill ? { width: "100%" as const } : null),
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
