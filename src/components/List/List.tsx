import React from "react"
import { View, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { Subtitle } from "../Subtitle/Subtitle"

type ListProps = {
  title?: string
  children: React.ReactNode
  divider?: boolean
}

export const List: React.FC<ListProps> = ({
  title,
  children,
  divider = true,
}) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <View style={styles.root}>
      {title ? <Subtitle text={title} /> : null}
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && divider ? <View style={styles.separator} /> : null}
          <View style={styles.itemContainer}>{child}</View>
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignSelf: "stretch",
  },
  itemContainer: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: Constants.styles.borderColor.LIGHT,
    marginVertical: Constants.styles.spacing.SMALL,
  },
})
