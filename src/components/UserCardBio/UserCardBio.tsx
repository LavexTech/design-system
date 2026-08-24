import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Image } from "../Image/Image"
import { getProfileImageUrl } from "../../utils/profileImage"
import { getOrdersCountLabel } from "../../utils/ordersCountLabel"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
  bio: string,
  userType: 'client' | 'provider',
}

type UserCardBioProps = {
  user: User,
  onClick?: () => void,
  darkMode?: boolean,
  fontScale?: number,
}

export const UserCardBio: React.FC<UserCardBioProps> = ({
  user,
  onClick,
  darkMode = false,
  fontScale = 1,
}: UserCardBioProps) => {
  return (
    <Card onClick={onClick} darkMode={darkMode} fontScale={fontScale}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Image
            size="sm"
            src={getProfileImageUrl(user.profileImage, user.userType)}
            type="circle"
            alt={user.name}
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
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  avatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    flex: 3,
    minWidth: 0,
    gap: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
