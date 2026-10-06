import React from "react";
import { Text, StyleSheet } from "react-native";
import { useResolvedFontFamily } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface InfoProps {
  text: string;
  darkMode?: boolean;
  fontScale?: number;
  bold?: boolean;
  position?: "left" | "center" | "right";
  /** muted = `#5A6A72`; default = `#2D3B42` */
  tone?: "muted" | "default";
}

export const Info: React.FC<InfoProps> = ({
  text,
  darkMode = false,
  fontScale = 1,
  bold = false,
  position = "left",
  tone = "muted",
}) => {
  const regular = useResolvedFontFamily(Constants.styles.fontFamily.REGULAR);
  const boldFont = useResolvedFontFamily(Constants.styles.fontFamily.BOLD);
  const fontFamily = bold ? boldFont : regular;
  const mutedColor = darkMode
    ? Constants.styles.theme.dark.text.muted
    : Constants.styles.text.MUTED;
  const defaultColor = darkMode
    ? Constants.styles.theme.dark.text.default
    : Constants.styles.text.DEFAULT;

  return (
    <Text
      style={[
        styles.info,
        {
          color: tone === "default" ? defaultColor : mutedColor,
          fontSize: Constants.styles.fontSize.CAPTION * fontScale,
          lineHeight: Constants.styles.lineHeight.CAPTION * fontScale,
          fontFamily,
          fontWeight: "normal",
          textAlign: position,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    lineHeight: Constants.styles.lineHeight.CAPTION,
    color: Constants.styles.text.MUTED,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
    alignSelf: "stretch",
  },
});
