import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { useLavexTheme } from "../../theme/LavexThemeProvider";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  darkMode?: boolean;
  fontScale?: number;
}

export const Card: React.FC<CardProps> = ({ title, children, onClick, fontScale = 1 }) => {
  const { colors } = useLavexTheme();
  const dynamicCardStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  };
  const dynamicTitleStyle = {
    color: colors.text,
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
    width: "100%",
    alignSelf: "stretch",
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    padding: Constants.styles.spacing.MEDIUM,
    marginBottom: Constants.styles.spacing.SMALL,
  },
  title: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    marginBottom: Constants.styles.spacing.SMALL,
    textAlign: "left",
  },
  content: {
    width: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
  },
});
