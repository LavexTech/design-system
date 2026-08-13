import React from 'react'
import { X } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconCloseProps = IconProps

export const IconClose: React.FC<IconCloseProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <X
    color={resolveIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
