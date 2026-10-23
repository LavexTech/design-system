import React from 'react'
import ArrowRight from 'lucide-react-native/icons/arrow-right'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconArrowRightProps = IconProps

export const IconArrowRight: React.FC<IconArrowRightProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ArrowRight
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
