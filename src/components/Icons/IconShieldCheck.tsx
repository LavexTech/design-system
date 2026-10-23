import React from 'react'
import ShieldCheck from 'lucide-react-native/icons/shield-check'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconShieldCheckProps = IconProps

export const IconShieldCheck: React.FC<IconShieldCheckProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <ShieldCheck
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
