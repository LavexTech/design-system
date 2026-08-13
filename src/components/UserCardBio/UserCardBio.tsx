import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Image } from "../Image/Image"
import { Grid, GridItem } from "../Grid/Grid"
import { getProfileImageUrl } from "../../utils/profileImage"

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
      <Grid columns={12} gap={2} darkMode={darkMode}>
        <GridItem colSpan={3}>
          <View style={styles.centerImage}>
            <Image
              size="sm"
              src={getProfileImageUrl(user.profileImage, user.userType)}
              type="circle"
              alt={user.name}
              darkMode={darkMode}
            />
          </View>
        </GridItem>
        <GridItem colSpan={9}>
          <Grid columns={12} gap={2}>
            <GridItem colSpan={12}>
              <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
            </GridItem>
            <GridItem colSpan={12}>
              <Info text={`${user.ordersCount} pedidos feitos`} darkMode={darkMode} fontScale={fontScale} />
            </GridItem>
            <GridItem colSpan={12}>
              <View style={styles.ratingRow}>
                <Stars rating={user.rating} size={16} />
                <Info text={`${Math.round(user.rating)}/5`} darkMode={darkMode} fontScale={fontScale} />
              </View>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  centerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
