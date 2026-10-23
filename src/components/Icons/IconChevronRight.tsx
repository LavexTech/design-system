import React from 'react'
import ChevronRight from 'lucide-react-native/icons/chevron-right'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconChevronRightProps = IconProps

export const IconChevronRight: React.FC<IconChevronRightProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ChevronRight
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
