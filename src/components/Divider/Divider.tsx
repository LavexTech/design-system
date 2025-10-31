import React from "react"
import { View, StyleSheet } from "react-native"
import Constants from "../../constants/constants"

export const Divider: React.FC = () => {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  divider: {
    height: Constants.styles.borderWidth.THIN, 
	backgroundColor: Constants.styles.borderColor.LIGHT, 
	width: '100%',
  },
})