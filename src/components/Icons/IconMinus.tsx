import React from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconMinusProps = {
  fill?: string
  stroke?: string
  width?: number
  height?: number
}

export const IconMinus: React.FC<IconMinusProps> = ({ 
  fill = '#262627',
  stroke,
  width = 24,
  height = 24,
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 640 640"
    >
      <Path
        d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  )
}

