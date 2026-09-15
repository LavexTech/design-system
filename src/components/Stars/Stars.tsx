import React from 'react'
import { View, StyleSheet } from 'react-native'
import Constants from '../../constants/constants'
import { IconStar } from '../Icons/IconStar'
import { IconStarHalf } from '../Icons/IconStarHalf'

type StarsProps = {
  rating: number,
  size?: number,
}

export const Stars: React.FC<StarsProps> = ({ rating, size = 24 }) => {
  const normalizedRating = Math.max(0, Math.min(5, rating))
  const roundedRating = Math.round(normalizedRating * 2) / 2

  return (
    <View style={[styles.container, { height: size }]}>
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFull = roundedRating >= starValue
        const isHalf =
          !isFull &&
          roundedRating >= starValue - 0.5 &&
          roundedRating < starValue

        return (
          <View
            key={starValue}
            style={[styles.starCell, { width: size, height: size }]}
          >
            <IconStar
              fill={Constants.styles.color.GRAY}
              width={size}
              height={size}
            />
            {isFull ? (
              <View style={styles.starOverlay}>
                <IconStar
                  fill={Constants.styles.color.GOLD}
                  width={size}
                  height={size}
                />
              </View>
            ) : null}
            {isHalf ? (
              <View style={styles.starOverlay}>
                <IconStarHalf
                  fill={Constants.styles.color.GOLD}
                  width={size}
                  height={size}
                />
              </View>
            ) : null}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starCell: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
})
