import React from 'react'
import { Pencil } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconEditProps = IconProps

export const IconEdit: React.FC<IconEditProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <Pencil
    color={resolveIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
