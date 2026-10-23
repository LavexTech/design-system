import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";
import { useLavexTheme } from "../../theme/LavexThemeProvider";

export interface TextProps {
  text: string;
  size?: "small" | "medium" | "large";
  level? : "success" | "error" | "warning" | "default" | "primary";
  position? : "left" | "center" | "right";
  darkMode?: boolean;
  fontScale?: number;
  /** When false, text sizes to content (for use inside row layouts). Default true. */
  fill?: boolean;
  bold?: boolean;
}

const C = Constants.styles

export const TextBox: React.FC<TextProps> = ({
  text,
  size = "medium",
  level = "default",
  position = "left",
  fontScale = 1,
  fill = true,
  bold = false,
}) => {
  const fontFamily = useResolvedFontFamily(bold ? C.fontFamily.BOLD : C.fontFamily.REGULAR)
  const { colors } = useLavexTheme()

  const sizes = {
    small: { fontSize: C.fontSize.LABEL, lineHeight: C.lineHeight.LABEL },
    medium: { fontSize: C.fontSize.BODY, lineHeight: C.lineHeight.BODY },
    large: { fontSize: C.fontSize.ACTION, lineHeight: C.lineHeight.ACTION },
  }

  const levels = {
    success: colors.accent,
    error: colors.danger,
    warning: C.feedback.WARNING_TEXT,
    default: colors.text,
    primary: colors.accent,
  }

  const metrics = sizes[size]

  return (
    <Text
      style={[
        styles.text,
        {
          textAlign: position,
          fontFamily,
          fontWeight: fontFamily ? "normal" : bold ? "700" : "400",
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
