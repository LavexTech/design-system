import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { TextBox as Text } from "../Text/Text"

type NavigationBarProps = {
  pages: string[]
  icons?: ((isActive: boolean) => React.ReactNode)[]
  activePage: string
  onNavigate?: (page: string) => void
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  pages,
  icons,
  activePage,
  onNavigate
}: NavigationBarProps) => {
  const handlePagePress = (page: string) => {
    if (onNavigate) {
      onNavigate(page)
    }
  }

  return (
    <View style={styles.container}>
      {pages.map((page, index) => {
        const isActive = activePage === page

        return (
          <TouchableOpacity
            key={page}
            style={styles.tab}
            onPress={() => handlePagePress(page)}
            activeOpacity={0.7}
          >
            {icons && icons[index] && (
              <View style={styles.iconContainer}>
                {icons[index](isActive)}
              </View>
            )}
            <Text
              text={page}
              level={isActive ? "primary" : "default"}
              size="small"
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderTopWidth: Constants.styles.borderWidth.THIN,
    borderTopColor: Constants.styles.borderColor.LIGHT,
    shadowColor: Constants.styles.shadowColor.DEFAULT,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Constants.styles.spacing.SMALL,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Constants.styles.spacing.TINY,
  },
  tabText: {
    fontSize: Constants.styles.fontSize.SMALL,
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

