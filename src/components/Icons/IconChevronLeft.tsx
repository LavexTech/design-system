import React from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconChevronLeftProps = {
  fill?: string
  stroke?: string
  width?: number
  height?: number
}

export const IconChevronLeft: React.FC<IconChevronLeftProps> = ({ 
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
        d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"
        fill={fill}
        stroke={stroke}
      />
    </Svg>
  )
}

