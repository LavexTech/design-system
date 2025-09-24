import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, children, onClick }) => {
  if (onClick) {
    return (
      <TouchableOpacity style={styles.card} onPress={onClick} activeOpacity={0.7}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.SMALL,
    borderColor: Constants.styles.borderColor.LIGHT,
    padding: Constants.styles.spacing.MEDIUM,
    marginBottom: Constants.styles.spacing.SMALL,
  },
  title: {
    fontSize: Constants.styles.fontSize.NORMAL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    marginBottom: Constants.styles.spacing.SMALL,
    textAlign: "left",
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
});
