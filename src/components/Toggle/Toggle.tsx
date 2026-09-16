import React from "react"
import { Switch, StyleSheet, View } from "react-native"
import { TextBox as Text } from "../Text/Text"
import Constants from "../../constants/constants"

type ToggleProps = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  darkMode?: boolean
  fontScale?: number
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onChange,
  darkMode = false,
  fontScale = 1,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.label}>
        <Text text={label} size="small" darkMode={darkMode} fontScale={fontScale} />
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: darkMode
            ? Constants.styles.theme.dark.border.default
            : Constants.styles.borderColor.MEDIUM,
          true: Constants.styles.color.PRIMARY_LIGHT,
        }}
        thumbColor={Constants.styles.color.WHITE}
        accessibilityLabel={label}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Constants.styles.spacing.SMALL,
  },
  label: {
    flex: 1,
    paddingRight: Constants.styles.spacing.SMALL,
  },
})
