import React from "react"
import { View, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"

type DividerProps = {
  darkMode?: boolean;
};

export const Divider: React.FC<DividerProps> = () => {
  const { colors } = useLavexTheme()
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />
}

const styles = StyleSheet.create({
  divider: {
    height: Constants.styles.borderWidth.THIN, 
	width: '100%',
  },
})