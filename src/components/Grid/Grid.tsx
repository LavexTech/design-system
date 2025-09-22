import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface GridProps {
  children: React.ReactNode;
  columns: number;
  gap?: number;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns,
  gap = Constants.styles.spacing.SMALL,
}) => {
  const childrenArray = React.Children.toArray(children);

  const gridStyle = [
    styles.grid,
    gap > 0 && {
      gap: gap,
    },
  ];

  // Calculate width accounting for gaps
  // For n columns, there are (n-1) gaps between items
  const gapWidth = gap * (columns - 1);
  const availableWidth = 100;
  const itemWidth =
    gap === 0 ? 100 / columns : (availableWidth - gapWidth) / columns;

  const itemStyle = [
    styles.item,
    {
      width: `${itemWidth}%`,
    },
    gap > 0 && {
      paddingHorizontal: Constants.styles.spacing.TINY,
    },
  ];

  return (
    <View style={gridStyle}>
      {childrenArray.map((child, index) => (
        <View key={index} style={itemStyle}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {},
});
