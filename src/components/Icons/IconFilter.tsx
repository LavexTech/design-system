import React from 'react'
import { ListFilter } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconFilterProps = IconProps

export const IconFilter: React.FC<IconFilterProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ListFilter
    color={resolveIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
