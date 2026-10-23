import React from 'react'
import ChevronLeft from 'lucide-react-native/icons/chevron-left'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconChevronLeftProps = IconProps

export const IconChevronLeft: React.FC<IconChevronLeftProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ChevronLeft
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
