import React from "react";
import { View, Image, Text as RNText, StyleSheet } from "react-native";
import { Card } from "../Card/Card";
import { TextBox } from "../Text/Text";
import Constants from "../../constants/constants";

export interface User {
  id: string;
  name: string;
  profileImage: string;
  ordersCount: number;
  rating: number;
}

export interface UserCardVerticalProps {
  user: User;
  onClick?: () => void;
}

export const UserCardVertical: React.FC<UserCardVerticalProps> = ({
  user,
  onClick,
}: UserCardVerticalProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.round(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <RNText key={i} style={styles.star}>
            ★
          </RNText>
        );
      } else {
        stars.push(
          <RNText key={i} style={styles.starEmpty}>
            ★
          </RNText>
        );
      }
    }

    return stars;
  };

  return (
    <Card onClick={onClick}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.ordersTextContainer}>
          <TextBox text={`${user.ordersCount} pedidos feitos`} />
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>{renderStars(user.rating)}</View>
        </View>

        <View style={styles.ratingTextContainer}>
          <TextBox text={`${Math.round(user.rating)}/5`} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: Constants.styles.spacing.SMALL,
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  ordersTextContainer: {
    marginBottom: Constants.styles.spacing.TINY,
    alignItems: "center",
  },
  ratingContainer: {
    marginBottom: Constants.styles.spacing.TINY,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    fontSize: 16,
    color: "#262627",
    marginHorizontal: 1,
  },
  starEmpty: {
    fontSize: 16,
    color: "#DEE2E6",
    marginHorizontal: 1,
  },
  ratingTextContainer: {
    alignItems: "center",
  },
});
