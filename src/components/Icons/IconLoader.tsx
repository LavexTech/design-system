import React from 'react'
import LoaderCircle from 'lucide-react-native/icons/loader-circle'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconLoaderProps = IconProps

export const IconLoader: React.FC<IconLoaderProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <LoaderCircle
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
