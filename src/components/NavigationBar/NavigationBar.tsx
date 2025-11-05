import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { TextBox as Text } from "../Text/Text"
import Constants from "../../constants/constants"
import { Grid } from "../Grid/Grid"

type NavbarProps = {
  options: string[],
  icons?: ((isSelected: boolean) => React.ReactNode)[],
  onSelected: (index: number) => void
}

export const NavigationBar: React.FC<NavbarProps> = ({ options, icons, onSelected }: NavbarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabPress = (index: number) => {
    setSelectedIndex(index)
    onSelected(index)
  }

  return (
    <View style={styles.container}>
      <Grid columns={options.length} gap={0}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              {icons && icons[index] && (
                <View style={styles.iconContainer}>
                  {icons[index](isSelected)}
                </View>
              )}
              <Text text={option} size="small"/>
            </TouchableOpacity>
          );
        })}
      </Grid>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderTopWidth: Constants.styles.borderWidth.THIN,
    borderTopColor: Constants.styles.borderColor.LIGHT,
    elevation: 8,
    shadowColor: Constants.styles.shadowColor.DEFAULT,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    gap: Constants.styles.spacing.TINY,
    padding: Constants.styles.spacing.SMALL,
    paddingBottom: Constants.styles.spacing.EXTRA_LARGE,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 12,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
    textAlign: "center",
  },
  tabTextActive: {
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.BOLD,
    color: Constants.styles.textColor.DEFAULT,
  },
})

