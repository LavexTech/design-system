import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox } from "../Text/Text"
import Constants from "../../constants/constants"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
  bio: string
}

type UserCardBioProps = {
  user: User,
  onClick?: () => void
}

export const UserCardBio: React.FC<UserCardBioProps> = ({
  user,
  onClick,
}: UserCardBioProps) => {
  const getStarsText = (rating: number) => {
    const fullStars = Math.round(rating)
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars)
  }

  return (
    <Card onClick={onClick}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.bioContainer}>
            <TextBox text={user.bio} />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.ordersContainer}>
            <TextBox text={`${user.ordersCount} pedidos feitos`} />
          </View>

          <View style={styles.ratingContainer}>
            <TextBox text={`${getStarsText(user.rating)} ${Math.round(user.rating)}/5`} />
          </View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: Constants.styles.spacing.MEDIUM,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: Constants.styles.spacing.MEDIUM,
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  bioContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerContainer: {
    alignItems: "center",
  },
  ordersContainer: {
    marginBottom: Constants.styles.spacing.TINY,
  },
  ratingContainer: {
    alignItems: "center",
  },
})
