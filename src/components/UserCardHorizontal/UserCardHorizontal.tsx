import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import Constants from "../../constants/constants"
import { getOrdersCountLabel } from "../../utils/ordersCountLabel"

export type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
  totalRatings?: number,
  userType: 'client' | 'provider',
}

type UserCardHorizontalProps = {
  user: User,
  onClick?: () => void,
  darkMode?: boolean,
  fontScale?: number,
  infoTone?: "muted" | "default",
}

function hasRatings(user: User): boolean {
  if (typeof user.totalRatings === "number") {
    return user.totalRatings > 0
  }
  return user.rating > 0
}

export const UserCardHorizontal: React.FC<UserCardHorizontalProps> = ({
  user,
  onClick,
  darkMode = false,
  fontScale = 1,
  infoTone = "muted",
}: UserCardHorizontalProps) => {

  return (
    <Card onClick={onClick} darkMode={darkMode} fontScale={fontScale}>
      <View style={styles.container}>
        <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
        <Info
          text={getOrdersCountLabel(user.ordersCount, user.userType)}
          darkMode={darkMode}
          fontScale={fontScale}
          tone={infoTone}
        />
        {hasRatings(user) ? (
          <Stars rating={user.rating} size={16} />
        ) : (
          <Info
            text="Sem avaliações"
            darkMode={darkMode}
            fontScale={fontScale}
            tone={infoTone}
          />
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    gap: Constants.styles.spacing.SMALL,
  },
});
