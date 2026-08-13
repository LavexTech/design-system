import React from 'react'
import { StarHalf } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconStarHalfProps = IconProps

/** Rating glyph: keeps solid fill when `fill` is passed (Stars/StarRating). */
export const IconStarHalf: React.FC<IconStarHalfProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => {
  const resolved = resolveIconColor(color, fill)
  return (
    <StarHalf
      color={resolved}
      fill={fill != null ? resolved : 'none'}
      size={resolveIconSize(size, width, height)}
      strokeWidth={strokeWidth}
    />
  )
}
