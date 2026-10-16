import React from "react"
import { View, StyleSheet } from "react-native"
import Constants from "../../constants/constants"
import { IconStar } from "../Icons/IconStar"
import { TextBox as Text } from "../Text/Text"

type ShortStarRatingProps = {
  rating: number
  size?: number
  darkMode?: boolean
  fontScale?: number
}

const DEEP = Constants.styles.brand.DEEP

export function formatShortRating(rating: number): string {
  return rating.toFixed(1).replace(".", ",")
}

/** Uma estrela DEEP e a nota com 1 casa decimal e vírgula (ex.: "4,8"). Sem nota (<= 0), mostra "–". */
export const ShortStarRating: React.FC<ShortStarRatingProps> = ({ rating, size = 16, darkMode = false, fontScale = 1 }) => {
  const label = rating > 0 ? formatShortRating(rating) : "–"

  return (
    <View style={styles.row} accessibilityLabel={rating > 0 ? `Nota ${label}` : "Sem nota"}>
      <IconStar fill={DEEP} width={size * fontScale} height={size * fontScale} />
      <Text text={label} size="small" fill={false} darkMode={darkMode} fontScale={fontScale} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
})
