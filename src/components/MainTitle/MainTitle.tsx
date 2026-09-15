import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "../../fontSetup";
import Constants from "../../constants/constants";

export interface MainTitleProps {
  text: string;
  position?: 'left' | 'center' | 'right';
}

export const MainTitle: React.FC<MainTitleProps> = ({ text, position = 'left' }) => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);

  return (
    <Text
      style={[
        styles.MainTitle,
        {
          textAlign: position,
          fontFamily: fontLoaded
            ? Constants.styles.fontFamily.REGULAR
            : undefined,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  MainTitle: {
    fontSize: Constants.styles.fontSize.LARGEST,
    fontWeight: Constants.styles.fontWeight.BOLD,
    lineHeight: Constants.styles.fontSize.LARGEST,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
