import React from "react"
import { View, StyleSheet } from "react-native"
import Constants from "../../constants/constants"

type DividerProps = {
  darkMode?: boolean;
};

export const Divider: React.FC<DividerProps> = ({ darkMode = false }) => {
  return <View style={[styles.divider, darkMode ? styles.dividerDark : null]} />
}

const styles = StyleSheet.create({
  divider: {
    height: Constants.styles.borderWidth.THIN, 
	backgroundColor: Constants.styles.borderColor.LIGHT, 
	width: '100%',
  },
  dividerDark: {
    backgroundColor: Constants.styles.theme.dark.border.default,
  },
})