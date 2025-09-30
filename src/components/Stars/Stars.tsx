import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { Grid } from "../Grid/Grid";

export interface StarsProps {
  rating: number;
}

export const Stars: React.FC<StarsProps> = ({ rating }) => {
  const renderStar = (index: number): string => {
    const starValue = rating - index;
    
    if (starValue >= 1) {
      return "★";
    } else if (starValue > 0) {
      return "✩";
    } else {
      return "☆";
    }
  };

  return (
    <Grid columns={5} gap={2}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Text key={index} style={styles.star}>
          {renderStar(index)}
        </Text>
      ))}
    </Grid>
  );
};

const styles = StyleSheet.create({
  star: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    color: Constants.styles.color.GOLD,
    textAlign: 'center',
  },
});
