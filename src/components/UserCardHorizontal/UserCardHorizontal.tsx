import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import Constants from "../../constants/constants"

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
      <View style={styles.container}>
        <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
        <Info text={`${user.ordersCount} pedidos feitos`} darkMode={darkMode} fontScale={fontScale} />
        <Stars rating={user.rating} size={16} />
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
