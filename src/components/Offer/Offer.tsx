import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface User {
  name: string;
  rating: number;
}

export interface OfferProps {
  value: number;
  distance: number;
  user: User;
}

export const Offer: React.FC<OfferProps> = ({ value, distance, user }) => {
  const formatValue = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatDistance = (distance: number): string => {
    return `${distance.toFixed(1).replace('.', ',')} km`;
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1).replace('.', ',');
  };

  const renderStars = (rating: number): string => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.value}>{formatValue(value)}</Text>
        <Text style={styles.distance}>{formatDistance(distance)}</Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(user.rating)}</Text>
          <Text style={styles.ratingText}>({formatRating(user.rating)})</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
    padding: Constants.styles.spacing.MEDIUM,
    marginBottom: Constants.styles.spacing.SMALL,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Constants.styles.spacing.SMALL,
  },
  value: {
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
    fontFamily: Constants.styles.fontFamily.MEDIUM,
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
    color: '#FFD700', // Gold color for stars
    marginRight: Constants.styles.spacing.TINY,
  },
  ratingText: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
  },
});
