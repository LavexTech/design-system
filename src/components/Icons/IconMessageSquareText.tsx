import React from 'react'
import MessageSquareText from 'lucide-react-native/icons/message-square-text'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconMessageSquareTextProps = IconProps

export const IconMessageSquareText: React.FC<IconMessageSquareTextProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => (
  <MessageSquareText
    color={useIconColor(color, fill)}
    size={resolveIconSize(size, width, height)}
    strokeWidth={strokeWidth}
  />
)
