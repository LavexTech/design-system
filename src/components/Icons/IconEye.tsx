import React from 'react'
import Eye from 'lucide-react-native/icons/eye'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconEyeProps = IconProps

export const IconEye: React.FC<IconEyeProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <Eye
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
