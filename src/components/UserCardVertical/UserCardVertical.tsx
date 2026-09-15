import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { Grid, GridItem } from "../Grid/Grid"
import { getOrdersCountLabel } from "../../utils/ordersCountLabel"

type User = {
  id: string
  name: string
  profileImage: string
  ordersCount: number
  rating: number
  totalRatings?: number
  userType: "client" | "provider"
}

type UserCardVerticalProps = {
  user: User
  onClick?: () => void
  onAvatarPress?: () => void
  darkMode?: boolean
}

export const UserCardVertical: React.FC<UserCardVerticalProps> = ({
  user,
  onClick,
  onAvatarPress,
  darkMode = false,
}: UserCardVerticalProps) => {
  const showStars =
    typeof user.totalRatings === "number"
      ? user.totalRatings > 0
      : user.rating > 0

  return (
    <Card onClick={onClick} darkMode={darkMode}>
      <Grid columns={12} gap={2} darkMode={darkMode}>
        <GridItem colSpan={12}>
          <View style={styles.centerImage}>
            <ProfileAvatar
              profileImage={user.profileImage}
              alt={user.name}
              size="md"
              onPress={onAvatarPress}
              darkMode={darkMode}
            />
          </View>
        </GridItem>
        <GridItem colSpan={12}>
          <View style={styles.centerItem}>
            <Text text={user.name} darkMode={darkMode} />
            <Info
              text={getOrdersCountLabel(user.ordersCount, user.userType)}
              darkMode={darkMode}
            />
          </View>
        </GridItem>
        <GridItem colSpan={12}>
          <View style={styles.centerItem}>
            {showStars ? (
              <>
                <Stars rating={user.rating} size={16} />
                <Info text={`${user.rating.toFixed(1)}/5`} darkMode={darkMode} />
              </>
            ) : (
              <Info text="Sem avaliações" darkMode={darkMode} />
            )}
          </View>
        </GridItem>
      </Grid>
    </Card>
  )
}

const styles = StyleSheet.create({
  centerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerImage: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
})
