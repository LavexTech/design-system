import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated"
import Constants from "../../constants/constants"
import { useReduceMotion } from "../../utils/reduceMotion"

type AnimatedStatusIndicatorProps = {
  size?: number
  active?: boolean
  icon?: React.ReactNode
  accessibilityLabel?: string
}

const C = Constants.styles

function Ring({ size, delay, active }: { size: number; delay: number; active: boolean }) {
  const progress = useSharedValue(0)
  useEffect(() => {
    if (!active) {
      progress.value = 0
      return
    }
    progress.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) }), -1, false),
    )
  }, [active, delay, progress])
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 1.2 }],
    opacity: active ? 0.45 * (1 - progress.value) : 0,
  }))
  return <Animated.View style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }, style]} />
}

export const AnimatedStatusIndicator: React.FC<AnimatedStatusIndicatorProps> = ({
  size = 72,
  active = true,
  icon,
  accessibilityLabel,
}) => {
  const reduceMotion = useReduceMotion()
  const animate = active && !reduceMotion
  return (
  <View accessibilityRole="progressbar" accessibilityLabel={accessibilityLabel} style={[styles.wrap, { width: size * 2.4, height: size * 2.4 }]}>
    <Ring size={size} delay={0} active={animate} />
    <Ring size={size} delay={1000} active={animate} />
    <View style={[styles.core, { width: size, height: size, borderRadius: size / 2 }]}>{icon}</View>
  </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  ring: { position: "absolute", borderWidth: 2, borderColor: C.brand.PRIMARY },
  core: { backgroundColor: C.brand.PRIMARY, alignItems: "center", justifyContent: "center" },
})
