import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { getOrdersCountLabel } from "../../utils/ordersCountLabel"

type User = {
  id: string
  name: string
  profileImage: string
  ordersCount: number
  rating: number
  bio: string
  userType: "client" | "provider"
}

type UserCardBioProps = {
  user: User
  onClick?: () => void
  onAvatarPress?: () => void
  darkMode?: boolean
  fontScale?: number
}

export const UserCardBio: React.FC<UserCardBioProps> = ({
  user,
  onClick,
  onAvatarPress,
  darkMode = false,
  fontScale = 1,
}: UserCardBioProps) => {
  return (
    <Card onClick={onClick} darkMode={darkMode} fontScale={fontScale}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <ProfileAvatar
            profileImage={user.profileImage}
            alt={user.name}
            size="sm"
            onPress={onAvatarPress}
            darkMode={darkMode}
          />
        </View>
        <View style={styles.meta}>
          <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
          <Info
            text={getOrdersCountLabel(user.ordersCount, user.userType)}
            darkMode={darkMode}
            fontScale={fontScale}
          />
          <View style={styles.ratingRow}>
            <Stars rating={user.rating} size={16} />
            <Info
              text={`${Math.round(user.rating)}/5`}
              darkMode={darkMode}
              fontScale={fontScale}
            />
          </View>
        </View>
      </View>
    </Card>
  )
}

const AVATAR_SIZE_PX = 64

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    gap: 8,
  },
  avatar: {
    width: AVATAR_SIZE_PX,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
})
