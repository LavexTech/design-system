import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface ListProps {
  title?: string;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ title, children }) => {
  const childrenArray = React.Children.toArray(children);

  const renderItem = ({ item, index }: { item: React.ReactNode; index: number }) => (
    <View style={styles.itemContainer}>
      {item}
    </View>
  );

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={childrenArray}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Constants.styles.spacing.MEDIUM,
  },
  title: {
    fontSize: Constants.styles.fontSize.NORMAL,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.MAIN,
    color: Constants.styles.textColor.DEFAULT,
    marginBottom: Constants.styles.spacing.MEDIUM,
    textAlign: "left",
  },
  itemContainer: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: Constants.styles.borderColor.LIGHT,
    marginVertical: Constants.styles.spacing.SMALL,
  },
});
