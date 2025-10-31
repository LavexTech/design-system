import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox } from "../Text/Text"
import Constants from "../../constants/constants"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Image } from "../Image/Image"
import { Grid, GridItem } from "../Grid/Grid"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number
}

type UserCardHorizontalProps = {
  user: User,
  onClick?: () => void
}

export const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  onClick,
}: UserCardHorizontalProps) => {
  return (
    <Card onClick={onClick}>
      <Grid columns={3}>
        <GridItem colSpan={1}>
          <View>
            <Image
              src={user.profileImage}
              type="circle"
              size="md"
            />
          </View>
        </GridItem>
        <GridItem colSpan={2}>
          <View style={styles.nameContainer}>
            <TextBox text={user.name} />
          </View>
          <View style={styles.ordersContainer}>
            <Info text={`${user.ordersCount} pedidos feitos`} />
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              <Stars rating={user.rating} size={16} />
            </View>
            <View>
              <Info
                text={user.rating.toFixed(1)}
                size="small"
              />
            </View>
          </View>
        </GridItem>
      </Grid>
    </Card>
  )
}

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
    marginRight: Constants.styles.spacing.TINY,
  },
  ratingText: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontFamily: Constants.styles.fontFamily.BOLD,
    fontWeight: Constants.styles.fontWeight.BOLD,
    color: Constants.styles.textColor.DEFAULT,
  },
});
