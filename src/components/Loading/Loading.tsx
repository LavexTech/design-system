import React, { useEffect, useId } from "react"
import { Modal as RNModal, StyleSheet, View } from "react-native"
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"
import Svg, { Circle, Defs, Mask, Path, Rect } from "react-native-svg"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useReduceMotion } from "../../utils/reduceMotion"
import {
  DRUM_BAND_PATH,
  DRUM_BAND_WIDTH,
  DRUM_CENTER,
  DRUM_END_RADIUS,
  DRUM_ENDS,
  DRUM_RADIUS,
  DRUM_WAVE_PATH,
  DRUM_WAVE_WIDTH,
  HOUSE_HOLE_PATH,
  HOUSE_HOLE_WIDTH,
  HOUSE_STUB_PATHS,
  ICON_VIEWBOX,
  LOGO_AREA,
  STROKE_WIDTH,
  SYMBOL_PATH,
} from "./lavexIconGeometry"

/** Cor da logo em cada tema: verde da marca no claro, verde claro no escuro. */
const LOGO_COLORS = { light: "#0A7370", dark: "#2FB5AF" }
/** Fundo do overlay: a cor de fundo do tema com 85% de opacidade. */
const OVERLAY_COLORS = { light: "rgba(255, 255, 255, 0.85)", dark: "rgba(27, 37, 42, 0.85)" }

/** Uma volta leva 1,3 s, com pausa de 0,2 s antes de voltar no sentido contrário (ciclo de 3 s). */
const TURN_MS = 1300
const PAUSE_MS = 200
const TURN_EASING = Easing.bezier(0.45, 0, 0.55, 1)

export type LoadingIconProps = {
  /** Largura do ícone; a altura segue a proporção da logo. */
  size?: number
  /** Cor da logo. Sem valor, segue o tema. */
  color?: string
  accessibilityLabel?: string
}

export type LoadingProps = LoadingIconProps & {
  visible: boolean
  /** Cor do fundo do overlay. Sem valor, o fundo do tema com 85% de opacidade. */
  overlayColor?: string
}

/**
 * Ícone da Lavex animado: a casa fica parada e o tambor da máquina gira uma volta no sentido horário,
 * pausa, gira uma volta no anti-horário e pausa, em loop. Com "reduzir movimento" do sistema, fica parado.
 */
export const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 120, color, accessibilityLabel }) => {
  const { mode } = useLavexTheme()
  const reduceMotion = useReduceMotion()
  const fill = color ?? LOGO_COLORS[mode]
  const id = useId().replace(/[^a-zA-Z0-9]/g, "")
  const houseMaskId = `loading-house-${id}`
  const drumMaskId = `loading-drum-${id}`

  const scale = size / ICON_VIEWBOX.width
  const height = ICON_VIEWBOX.height * scale
  const drumSide = DRUM_RADIUS * 2 * scale
  const drumLeft = (DRUM_CENTER.x - DRUM_RADIUS - ICON_VIEWBOX.x) * scale
  const drumTop = (DRUM_CENTER.y - DRUM_RADIUS - ICON_VIEWBOX.y) * scale

  const rotation = useSharedValue(0)
  useEffect(() => {
    if (reduceMotion) {
      rotation.value = 0
      return
    }
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: TURN_MS, easing: TURN_EASING }),
        withTiming(360, { duration: PAUSE_MS }),
        withTiming(0, { duration: TURN_MS, easing: TURN_EASING }),
        withTiming(0, { duration: PAUSE_MS }),
      ),
      -1,
      false,
    )
    return () => cancelAnimation(rotation)
  }, [reduceMotion, rotation])

  const drumStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      style={{ width: size, height }}
    >
      <Svg
        width={size}
        height={height}
        viewBox={`${ICON_VIEWBOX.x} ${ICON_VIEWBOX.y} ${ICON_VIEWBOX.width} ${ICON_VIEWBOX.height}`}
      >
        <Defs>
          <Mask id={houseMaskId} maskUnits="userSpaceOnUse" x={0} y={0} width={LOGO_AREA.width} height={LOGO_AREA.height}>
            <Rect x={0} y={0} width={LOGO_AREA.width} height={LOGO_AREA.height} fill="#ffffff" />
            <Path d={HOUSE_HOLE_PATH} fill="none" stroke="#000000" strokeWidth={HOUSE_HOLE_WIDTH} strokeLinejoin="round" />
          </Mask>
        </Defs>
        <Path d={SYMBOL_PATH} fill={fill} mask={`url(#${houseMaskId})`} />
        {HOUSE_STUB_PATHS.map((d) => (
          <Path
            key={d}
            d={d}
            fill="none"
            stroke={fill}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
      <Animated.View
        pointerEvents="none"
        style={[styles.drum, { left: drumLeft, top: drumTop, width: drumSide, height: drumSide }, drumStyle]}
      >
        <Svg
          width={drumSide}
          height={drumSide}
          viewBox={`${DRUM_CENTER.x - DRUM_RADIUS} ${DRUM_CENTER.y - DRUM_RADIUS} ${DRUM_RADIUS * 2} ${DRUM_RADIUS * 2}`}
        >
          <Defs>
            <Mask id={drumMaskId} maskUnits="userSpaceOnUse" x={0} y={0} width={LOGO_AREA.width} height={LOGO_AREA.height}>
              <Path d={DRUM_BAND_PATH} fill="none" stroke="#ffffff" strokeWidth={DRUM_BAND_WIDTH} strokeLinejoin="round" />
              <Path d={DRUM_WAVE_PATH} fill="none" stroke="#ffffff" strokeWidth={DRUM_WAVE_WIDTH} strokeLinejoin="round" />
              {DRUM_ENDS.map((end) => (
                <Circle key={`${end.x}-${end.y}`} cx={end.x} cy={end.y} r={DRUM_END_RADIUS} fill="#ffffff" />
              ))}
            </Mask>
          </Defs>
          <Path d={SYMBOL_PATH} fill={fill} mask={`url(#${drumMaskId})`} />
        </Svg>
      </Animated.View>
    </View>
  )
}

LoadingIcon.displayName = "LoadingIcon"

/** Loading padrão da Lavex: overlay em tela cheia com o ícone animado no centro. Bloqueia toques enquanto visível. */
export const Loading: React.FC<LoadingProps> = ({
  visible,
  size = 120,
  color,
  overlayColor,
  accessibilityLabel = "Carregando",
}) => {
  const { mode } = useLavexTheme()
  return (
    <RNModal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={() => undefined}>
      <View style={[styles.overlay, { backgroundColor: overlayColor ?? OVERLAY_COLORS[mode] }]}>
        <LoadingIcon size={size} color={color} accessibilityLabel={accessibilityLabel} />
      </View>
    </RNModal>
  )
}

Loading.displayName = "Loading"

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center" },
  drum: { position: "absolute" },
})
