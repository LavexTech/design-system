import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface InfoProps {
  text: string;
  darkMode?: boolean;
  fontScale?: number;
  bold?: boolean;
  position?: "left" | "center" | "right";
  /** muted = cinza (#8F98AD); default = mesma cor do Title (#262627) */
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
  const mutedColor = darkMode
    ? Constants.styles.theme.dark.text.muted
    : Constants.styles.theme.light.text.muted;
  const defaultColor = darkMode
    ? Constants.styles.theme.dark.text.default
    : Constants.styles.theme.light.text.default;

  return (
    <Text
      style={[
        styles.info,
        {
          color: tone === "default" ? defaultColor : mutedColor,
          opacity: tone === "default" ? 1 : 0.7,
          fontSize: Constants.styles.fontSize.SMALL * fontScale,
          lineHeight: Constants.styles.fontSize.SMALL * 1.4 * fontScale,
          fontFamily: Constants.styles.fontFamily.REGULAR,
          fontWeight: bold
            ? (Constants.styles.fontWeight.BOLD as any)
            : (Constants.styles.fontWeight.NORMAL as any),
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
    lineHeight: Constants.styles.fontSize.SMALL * 1.4,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
    alignSelf: "stretch",
  },
});
