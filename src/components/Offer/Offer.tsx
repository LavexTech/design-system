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
  totalRatings?: number,
  userType: 'client' | 'provider',
}

type OfferProps = {
  amount: number,
  distance: number,
  user: User,
  onClick?: () => void,
}

function hasRatings(user: User): boolean {
  if (typeof user.totalRatings === "number") {
    return user.totalRatings > 0
  }
  return user.rating > 0
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
          {hasRatings(user) ? (
            <View style={styles.ratingContainer}>
              <Stars rating={user.rating} size={16} />
              <Info text={`${user.rating.toFixed(1)}/5`} />
            </View>
          ) : (
            <View style={styles.emptyRating}>
              <Info text="Sem avaliações" />
            </View>
          )}
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
    flexShrink: 0,
    gap: Constants.styles.spacing.TINY,
  },
  emptyRating: {
    flexShrink: 0,
  },
});
