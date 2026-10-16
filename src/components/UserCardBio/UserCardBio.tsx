import React from "react"
import { View, StyleSheet } from "react-native"
import { TextBox as Text } from "../Text/Text"
import { ShortStarRating } from "../ShortStarRating/ShortStarRating"
import { Info } from "../Info/Info"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"

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

function getOrdersLabel(ordersCount: number): string {
  return `· ${ordersCount} ${ordersCount === 1 ? "pedido" : "pedidos"}`
}

export const UserCardBio: React.FC<UserCardBioProps> = ({
  user,
  onAvatarPress,
  darkMode = false,
  fontScale = 1,
}: UserCardBioProps) => {
  const hasRating = user.rating > 0

  return (
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
        <Text text={user.name} bold darkMode={darkMode} fontScale={fontScale} />
        <View style={styles.ratingRow}>
          <ShortStarRating rating={user.rating} />
          <Info
            text={getOrdersLabel(user.ordersCount)}
            darkMode={darkMode}
            fontScale={fontScale}
          />
        </View>
        <Info
          text={
            hasRating
              ? "Nota média dada pelos Lavexers"
              : "Sua média será calculada após cada pedido"
          }
          darkMode={darkMode}
          fontScale={fontScale}
        />
      </View>
    </View>
  )
}

const AVATAR_SIZE_PX = 64

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "stretch",
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
    gap: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
})
