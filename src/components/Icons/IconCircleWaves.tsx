import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconCircle } from './IconCircle'
import { IconWaves } from './IconWaves'
import {
  IconProps,
  DEFAULT_STROKE_WIDTH,
  useIconColor,
  resolveIconSize,
} from './iconProps'

export type IconCircleWavesProps = IconProps

/** Ondas 40% menores que o círculo, centralizadas dentro dele. */
const WAVES_RATIO = 0.6

export const IconCircleWaves: React.FC<IconCircleWavesProps> = ({
  color,
  fill,
  width,
  height,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
}) => {
  const resolvedColor = useIconColor(color, fill)
  const resolvedSize = resolveIconSize(size, width, height)
  return (
    <View style={{ width: resolvedSize, height: resolvedSize }}>
      <IconCircle color={resolvedColor} size={resolvedSize} strokeWidth={strokeWidth} />
      <View style={styles.inner}>
        <IconWaves color={resolvedColor} size={resolvedSize * WAVES_RATIO} strokeWidth={strokeWidth} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
})
