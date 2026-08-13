import React from 'react'
import { MessageCircle } from 'lucide-react-native'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  resolveIconColor,
  resolveIconSize,
} from './iconProps'

export type IconMessageProps = IconProps

export const IconMessage: React.FC<IconMessageProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <MessageCircle
    color={resolveIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
