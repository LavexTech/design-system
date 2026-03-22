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
      <Grid columns={2} gap={2} darkMode={darkMode}>
        <GridItem colSpan={1}>
          <Grid columns={12} gap={2}>
            <GridItem colSpan={12}>
              <View style={styles.centerImage}>
                <Image
                  size="md"
                  src={getProfileImageUrl(user.profileImage, user.userType)}
                  type="circle"
                  alt={ user.name }
                  darkMode={darkMode}
                  />
              </View>
            </GridItem>
            <GridItem colSpan={12}>
              <View style={styles.centerItem}>
                <Text text={user.name} darkMode={darkMode} fontScale={fontScale} />
                <Info text={`${user.ordersCount} pedidos feitos`} darkMode={darkMode} fontScale={fontScale} />
              </View>
            </GridItem>
            <GridItem colSpan={12}>
              <View style={styles.centerItem}>
                <Stars rating={user.rating} size={16} />
                <Info text={`${Math.round(user.rating)}/5`} darkMode={darkMode} fontScale={fontScale} />
              </View>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={1}>
          <View>
            <Info text="Bio" darkMode={darkMode} fontScale={fontScale} />
            <Text size="small" text={user.bio} darkMode={darkMode} fontScale={fontScale} />
          </View>
        </GridItem>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  centerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerImage: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  }
});
