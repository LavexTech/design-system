import React from 'react'
import Star from 'lucide-react-native/icons/star'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
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
  const stroke = useIconColor(color, fill)
  const solid = fill != null ? (color != null ? fill : stroke) : 'none'
  return (
    <Star
      color={stroke}
      fill={solid}
      size={resolveIconSize(size, width, height)}
      strokeWidth={strokeWidth}
    />
  )
}
