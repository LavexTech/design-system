import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface InfoProps {
  text: string;
  darkMode?: boolean;
  fontScale?: number;
  bold?: boolean;
  position?: "left" | "center" | "right";
}

export const Info: React.FC<InfoProps> = ({
  text,
  darkMode = false,
  fontScale = 1,
  bold = false,
  position = "left",
}) => {
  return (
    <Text
      style={[
        styles.info,
        {
          color: darkMode
            ? Constants.styles.theme.dark.text.muted
            : Constants.styles.theme.light.text.muted,
          fontSize: Constants.styles.fontSize.SMALL * fontScale,
          lineHeight: Constants.styles.fontSize.SMALL * 1.4 * fontScale,
          fontFamily: bold
            ? Constants.styles.fontFamily.BOLD
            : Constants.styles.fontFamily.REGULAR,
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
    opacity: 0.7,
  },
});
