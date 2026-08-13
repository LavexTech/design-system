import React from 'react'
import { Star } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconStarProps = IconProps

/** Rating glyph: keeps solid fill when `fill` is passed (Stars/StarRating). */
export const IconStar: React.FC<IconStarProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => {
  const resolved = resolveIconColor(color, fill)
  return (
    <Star
      color={resolved}
      fill={fill != null ? resolved : 'none'}
      size={resolveIconSize(size, width, height)}
      strokeWidth={strokeWidth}
    />
  )
}
