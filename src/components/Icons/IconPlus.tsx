import React from 'react'
import Plus from 'lucide-react-native/icons/plus'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconPlusProps = IconProps

export const IconPlus: React.FC<IconPlusProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <Plus
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
