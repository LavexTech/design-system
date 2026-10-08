import React, { useEffect, useRef, useState } from "react"
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleSheet,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from "react-native"
import Constants from "../../constants/constants"

type PhotoSkeletonProps = {
  width?: DimensionValue
  height?: DimensionValue
  borderRadius?: number
  style?: StyleProp<ViewStyle>
}

const SHIMMER_MS = 1200
const BAND_WIDTH_RATIO = 0.45
const BAND_MIN_WIDTH = 24
const BAND_OPACITY = 0.55
const C = Constants.styles

export const PhotoSkeleton: React.FC<PhotoSkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = C.borderRadius.XL,
  style,
}) => {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [trackWidth, setTrackWidth] = useState(0)
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let mounted = true
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled)
    })
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion)
    return () => {
      mounted = false
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (reduceMotion || trackWidth <= 0) {
      progress.setValue(0)
      return
    }
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: SHIMMER_MS,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    )
    animation.start()
    return () => animation.stop()
  }, [progress, reduceMotion, trackWidth])

  const bandWidth = Math.max(BAND_MIN_WIDTH, trackWidth * BAND_WIDTH_RATIO)
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-bandWidth, trackWidth],
  })
  const showBand = !reduceMotion && trackWidth > 0

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onLayout={(event) => {
        const next = event.nativeEvent.layout.width
        setTrackWidth((current) => (Math.abs(current - next) < 1 ? current : next))
      }}
      style={[styles.base, { width, height, borderRadius }, style]}
    >
      {showBand ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.band,
            { width: bandWidth, borderRadius, transform: [{ translateX }] },
          ]}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
    backgroundColor: C.surface.MUTED,
  },
  band: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: C.color.WHITE,
    opacity: BAND_OPACITY,
  },
})
