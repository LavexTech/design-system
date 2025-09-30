import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { Format } from "../../utils/Format";
import { Grid } from "../Grid/Grid";

export interface User {
  name: string;
  rating: number;
}

export interface OfferProps {
  amount: number;
  distance: number;
  user: User;
}

export const Offer: React.FC<OfferProps> = ({ amount, distance, user }) => {

  return (
    <View style={styles.container}>
      <Grid columns={1} gap={4}>
        <View style={styles.header}>
          <Text style={styles.amount}>{Format.money(amount)}</Text>
          <Text style={styles.distance}>{Format.distance(distance)}</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{Format.stars(user.rating)}</Text>
            <Text style={styles.ratingText}>({Format.rating(user.rating)})</Text>
          </View>
        </View>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Constants.styles.spacing.SMALL,
  },
  amount: {
    fontSize: Constants.styles.fontSize.LARGER,
    fontWeight: Constants.styles.fontWeight.BOLD as any,
    fontFamily: Constants.styles.fontFamily.BOLD,
    color: Constants.styles.textColor.SUCCESS,
  },
  distance: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flex: 1,
    marginRight: Constants.styles.spacing.SMALL,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    color: Constants.styles.color.GOLD,
    marginRight: Constants.styles.spacing.TINY,
  },
  ratingText: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
  },
});
