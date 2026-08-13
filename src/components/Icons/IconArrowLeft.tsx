import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconArrowLeftProps = IconProps

export const IconArrowLeft: React.FC<IconArrowLeftProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ArrowLeft
    color={resolveIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
