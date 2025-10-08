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

export interface UserCardHorizontalProps {
  user: User;
  onClick?: () => void;
}

export const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  onClick,
}: UserCardHorizontalProps) => {
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

        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <TextBox text={user.name} />
          </View>

          <View style={styles.ordersContainer}>
            <TextBox text={`${user.ordersCount} pedidos feitos`} />
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderStars(user.rating)}</View>
            <RNText style={styles.ratingText}>
              {Math.round(user.rating)}/5
            </RNText>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: Constants.styles.spacing.MEDIUM,
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameContainer: {
    marginBottom: Constants.styles.spacing.TINY,
  },
  ordersContainer: {
    marginBottom: Constants.styles.spacing.TINY,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Constants.styles.spacing.TINY,
  },
  star: {
    fontSize: 14,
    color: "#262627",
    marginHorizontal: 1,
  },
  starEmpty: {
    fontSize: 14,
    color: "#DEE2E6",
    marginHorizontal: 1,
  },
  ratingText: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontFamily: Constants.styles.fontFamily.BOLD,
    fontWeight: Constants.styles.fontWeight.BOLD,
    color: Constants.styles.textColor.DEFAULT,
  },
});
