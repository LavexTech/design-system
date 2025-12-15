import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Constants from '../../constants/constants'
import { IconStar } from '../Icons/IconStar'
import { IconStarHalf } from '../Icons/IconStarHalf'
import { Grid, GridItem } from '../Grid/Grid'

type StarRatingProps = {
  size?: number
  initialRating?: number
  onRatingChange?: (rating: number) => void
  disabled?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  size = 24,
  initialRating = 0,
  onRatingChange,
  disabled = false,
}) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handlePress = (starIndex: number, isHalf: boolean) => {
    if (disabled) return
    
    const newRating = starIndex + (isHalf ? 0.5 : 1.0)
    const normalizedRating = Math.max(0, Math.min(5, newRating))
    
    setRating(normalizedRating)
    onRatingChange?.(normalizedRating)
  }

  const handlePressIn = (starIndex: number, isHalf: boolean) => {
    if (disabled) return
    
    const previewRating = starIndex + (isHalf ? 0.5 : 1.0)
    setHoverRating(previewRating)
  }

  const handlePressOut = () => {
    setHoverRating(null)
  }

  const displayRating = hoverRating !== null ? hoverRating : rating

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1
    const isFull = displayRating >= starValue
    const isHalf = displayRating >= starIndex + 0.5 && displayRating < starValue

    return (
      <View key={starIndex} style={[styles.starContainer, { width: size, height: size }]}>
        <View style={styles.starBackground}>
          <IconStar 
            fill={Constants.styles.color.GRAY}
            width={size}
            height={size}
          />
        </View>
        
        {isFull && (
          <View style={[styles.starForeground, { width: size, height: size }]}>
            <IconStar 
              fill={Constants.styles.color.GOLD}
              width={size}
              height={size}
            />
          </View>
        )}
        
        {!isFull && isHalf && (
          <View style={[styles.starForeground, { width: size, height: size }]}>
            <IconStarHalf 
              fill={Constants.styles.color.GOLD}
              width={size}
              height={size}
            />
          </View>
        )}

        <View style={[styles.clickableAreas, { width: size, height: size }]}>
          <Pressable
            style={styles.halfPressable}
            onPress={() => handlePress(starIndex, true)}
            onPressIn={() => handlePressIn(starIndex, true)}
            onPressOut={handlePressOut}
            disabled={disabled}
          />
          
          <Pressable
            style={styles.halfPressable}
            onPress={() => handlePress(starIndex, false)}
            onPressIn={() => handlePressIn(starIndex, false)}
            onPressOut={handlePressOut}
            disabled={disabled}
          />
        </View>
      </View>
    )
  }

  return (
    <Grid columns={5} gap={1}>
      {[0, 1, 2, 3, 4].map((starIndex) => (
        <GridItem key={starIndex} colSpan={1}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {renderStar(starIndex)}
          </View>
        </GridItem>
      ))}
    </Grid>
  )
}

const styles = StyleSheet.create({
  starContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  starForeground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  clickableAreas: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    zIndex: 10,
  },
  halfPressable: {
    flex: 1,
    height: '100%',
  },
})

