import React from "react"
import { View, StyleSheet } from "react-native"
import { Grid } from "../Grid/Grid"
import { TextBox as Text } from "../Text/Text"
import { Info } from "../Info/Info"
import { Stars } from "../Stars/Stars"
import { Card } from "../Card/Card"
import Constants from "../../constants/constants"

type User = {
  id: string,
  name: string,
  profileImage: string,
  ordersCount: number,
  rating: number,
}

type OfferProps = {
  amount: number,
  distance: number,
  user: User,
  onClick?: () => void,
}

export const Offer: React.FC<OfferProps> = ({ amount, distance, user, onClick }) => {

  return (
    <Card onClick={onClick}>
      <Grid columns={1} gap={2}>
        <View style={styles.header}>
          <Text text={"R$ " + String(amount)} level="success" size="large" />
          <Info text={String(distance) + "km"} />
        </View>
        
        <View style={styles.userInfo}>
          <Text text={user.name} />
          <View style={styles.ratingContainer}>
            <Stars rating={user.rating} size={16} />
            <Info text={String(user.rating) + "/5"} />
          </View>
        </View>
      </Grid>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Constants.styles.spacing.SMALL,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Constants.styles.spacing.TINY,
  },
});
