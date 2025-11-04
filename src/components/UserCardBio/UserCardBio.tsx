import React from "react"
import { View, StyleSheet } from "react-native"
import { Card } from "../Card/Card"
import { TextBox as Text } from "../Text/Text"
import { Stars } from "../Stars/Stars"
import { Info } from "../Info/Info"
import { Image } from "../Image/Image"
import { Grid, GridItem } from "../Grid/Grid"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
  bio: string,
}

type UserCardBioProps = {
  user: User,
  onClick?: () => void,
}

export const UserCardBio: React.FC<UserCardBioProps> = ({
  user,
  onClick,
}: UserCardBioProps) => {
  return (
    <Card onClick={onClick}>
      <Grid columns={2} gap={2}>
        <GridItem colSpan={1}>
          <Grid columns={12} gap={2}>
            <GridItem colSpan={12}>
              <View style={styles.centerImage}>
                <Image
                  size="md"
                  src={ user.profileImage }
                  type="circle"
                  alt={ user.name }
                  />
              </View>
            </GridItem>
            <GridItem colSpan={12}>
              <View style={styles.centerItem}>
                <Text text={user.name} />
                <Info text={`${user.ordersCount} pedidos feitos`} />
              </View>
            </GridItem>
            <GridItem colSpan={12}>
              <View style={styles.centerItem}>
                <Stars rating={user.rating} size={16} />
                <Info text={`${Math.round(user.rating)}/5`} />
              </View>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={1}>
          <View>
            <Info text="Bio" />
            <Text size="small" text={user.bio} />
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
