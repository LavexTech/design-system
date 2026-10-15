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
  amountLabel?: string,
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

export const Offer: React.FC<OfferProps> = ({ amount, amountLabel, distance, user, onClick }) => {

  return (
    <Card onClick={onClick}>
      <Grid columns={1} gap={2}>
        <View style={styles.header}>
          <View style={styles.amount}>
            <Text text={amountLabel ?? ("R$ " + String(amount))} level="success" size="large" fill={false} />
          </View>
          <View style={styles.distance}>
            <Info text={String(distance) + "km"} />
          </View>
        </View>
        
        <View style={styles.userInfo}>
          <View style={styles.name}>
            <Text text={user.name} fill={false} />
          </View>
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
  // Em tela estreita o valor cede espaço; a distância nunca quebra em duas linhas
  amount: {
    flexShrink: 1,
    minWidth: 0,
  },
  distance: {
    flexShrink: 0,
    marginLeft: Constants.styles.spacing.SMALL,
  },
  // O nome nunca é espremido: se a nota não couber ao lado, ela desce para a linha de baixo
  name: {
    maxWidth: '100%',
    marginRight: Constants.styles.spacing.SMALL,
  },
  userInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: Constants.styles.spacing.TINY,
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
