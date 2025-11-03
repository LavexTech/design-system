import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Image } from "../Image/Image"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
}

type UserCardHorizontalProps = {
  user: User,
  onClick?: () => void,
}

export const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  onClick,
}: UserCardHorizontalProps) => {

  return (
    <Card onClick={onClick}>
      <View style={styles.container}>
        <Grid columns={12} gap={2}>
          <GridItem colSpan={3}>
            <Image
              src={user.profileImage}
              alt={user.name}
              size="md"
              type="circle"
              />
          </GridItem>

          <GridItem colSpan={9}>
            <View>
              <Text text={user.name} />
              <Info text={`${user.ordersCount} pedidos feitos`} />
            </View>

            <View style={styles.ratingContainer}>
              <Stars rating={user.rating} size={16} />
              <Info text={`${user.rating}/5`} />
            </View>
          </GridItem>
          </Grid>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Constants.styles.spacing.TINY,
  },
});
