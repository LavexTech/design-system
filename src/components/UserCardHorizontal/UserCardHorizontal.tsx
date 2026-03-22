import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Image } from "../Image/Image"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"
import { getProfileImageUrl } from "../../utils/profileImage"

export type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
  userType: 'client' | 'provider',
}

type UserCardHorizontalProps = {
  user: User,
  onClick?: () => void,
  darkMode?: boolean,
  fontScale?: number,
}

export const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  onClick,
  darkMode = false,
  fontScale = 1,
}: UserCardHorizontalProps) => {

  return (
    <Card onClick={onClick} darkMode={darkMode} fontScale={fontScale}>
      <Grid columns={12} gap={0} darkMode={darkMode}>
        <GridItem colSpan={4}>
          <Image
            src={getProfileImageUrl(user.profileImage, user.userType)}
            alt={user.name}
            size="md"
            type="circle"
            darkMode={darkMode}
            />
        </GridItem>

        <GridItem colSpan={8}>
          <View>
            <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
            <Info text={`${user.ordersCount} pedidos feitos`} darkMode={darkMode} fontScale={fontScale} />
          </View>

          <View style={styles.ratingContainer}>
            <Stars rating={user.rating} size={16} />
            <Info text={`${user.rating}/5`} darkMode={darkMode} fontScale={fontScale} />
          </View>
        </GridItem>
      </Grid>
    </Card>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Constants.styles.spacing.TINY,
    marginTop: Constants.styles.spacing.SMALL,
  },
});
