import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { Grid, GridItem } from "../Grid/Grid"
import { Subtitle } from "../Subtitle/Subtitle"

type ListProps ={
  title?: string
  children: React.ReactNode
  divider?: boolean
}

export const List: React.FC<ListProps> = ({ title, children, divider = true }) => {
  const childrenArray = React.Children.toArray(children)

  const renderItem = ({ item, index }: { item: React.ReactNode; index: number }) => (
    <View style={styles.itemContainer}>
      {item}
    </View>
  )

  const ItemSeparatorComponent = () => divider ? <View style={styles.separator} /> : null

  return (
    <Grid columns={1} gap={4}>
      <GridItem>
        {title && <Subtitle text={title} />}
      </GridItem>
      <GridItem>
        <FlatList
          data={childrenArray}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={(item: any, index: number) => index.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </GridItem>
    </Grid>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: Constants.styles.borderColor.LIGHT,
    marginVertical: Constants.styles.spacing.SMALL,
  },
})
