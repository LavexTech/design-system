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
    {
      gap: gap,
    },
  ];

  const itemStyle = [
    styles.item,
    {
      width: `${100 / columns}%`,
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
  item: {
    paddingHorizontal: Constants.styles.spacing.TINY,
    boxSizing: "border-box",
  },
});
