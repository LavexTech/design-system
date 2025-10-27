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
  
  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5
  
  const renderRatingStars = () => {
    const stars = []
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IconStar 
          key={`full-${i}`} 
          fill={Constants.styles.color.GOLD}
          width={size} 
          height={size} 
        />
      )
    }
    
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <IconStarHalf 
          key="half" 
          fill={Constants.styles.color.GOLD} 
          width={size} 
          height={size} 
        />
      )
    }
    
    return stars
  }
  
  const renderBackgroundStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IconStar 
          key={`bg-${i}`} 
          fill={Constants.styles.color.GRAY} 
          width={size} 
          height={size} 
        />
      )
    }
    return stars
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsRow}>
        {renderBackgroundStars()}
      </View>
      
      <View style={[styles.starsRow, styles.ratingLayer]}>
        {renderRatingStars()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
})