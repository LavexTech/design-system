import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  darkMode?: boolean;
  fontScale?: number;
}

export const Card: React.FC<CardProps> = ({ title, children, onClick, darkMode = false, fontScale = 1 }) => {
  const dynamicCardStyle = {
    backgroundColor: darkMode ? Constants.styles.theme.dark.background.surface : Constants.styles.theme.light.background.surface,
    borderColor: darkMode ? Constants.styles.theme.dark.border.default : Constants.styles.theme.light.border.default,
  };
  const dynamicTitleStyle = {
    color: darkMode ? Constants.styles.theme.dark.text.default : Constants.styles.theme.light.text.default,
    fontSize: Constants.styles.fontSize.SMALL * fontScale,
  };

  if (onClick) {
    return (
      <TouchableOpacity style={[styles.card, dynamicCardStyle]} onPress={onClick} activeOpacity={0.7}>
        {title && <Text style={[styles.title, dynamicTitleStyle]}>{title}</Text>}
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, dynamicCardStyle]}>
      {title && <Text style={[styles.title, dynamicTitleStyle]}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
    padding: Constants.styles.spacing.MEDIUM,
    marginBottom: Constants.styles.spacing.SMALL,
  },
  title: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    marginBottom: Constants.styles.spacing.SMALL,
    textAlign: "left",
  },
  content: {
    width: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
  },
});
