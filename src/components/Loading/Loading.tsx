import React, { memo, useEffect } from "react"
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
import Svg, { Path } from "react-native-svg"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useReduceMotion } from "../../utils/reduceMotion"
import { DRUM_CENTER, DRUM_PATH, DRUM_RADIUS, HOUSE_PATH, ICON_VIEWBOX } from "./lavexIconGeometry"

/** Cor da logo em cada tema: verde da marca no claro, verde claro no escuro. */
const LOGO_COLORS = { light: "#0A7370", dark: "#2FB5AF" }
/** Fundo do overlay: a cor de fundo do tema com 85% de opacidade. */
const OVERLAY_COLORS = { light: "rgba(255, 255, 255, 0.85)", dark: "rgba(27, 37, 42, 0.85)" }

/** Uma volta leva 1,3 s, com pausa de 0,2 s antes de voltar no sentido contrário (ciclo de 3 s). */
const TURN_MS = 1300
const PAUSE_MS = 200
const TURN_EASING = Easing.bezier(0.45, 0, 0.55, 1)

const HOUSE_VIEWBOX = `${ICON_VIEWBOX.x} ${ICON_VIEWBOX.y} ${ICON_VIEWBOX.width} ${ICON_VIEWBOX.height}`
const DRUM_VIEWBOX = `${DRUM_CENTER.x - DRUM_RADIUS} ${DRUM_CENTER.y - DRUM_RADIUS} ${DRUM_RADIUS * 2} ${DRUM_RADIUS * 2}`

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
 *
 * Performance: cada parte é um único path preenchido, sem máscara. A rotação é um transform do `Animated.View`
 * na thread de UI, então o SVG não é redesenhado a cada frame e o JS não participa da animação.
 */
const LoadingIconBase: React.FC<LoadingIconProps> = ({ size = 120, color, accessibilityLabel }) => {
  const { mode } = useLavexTheme()
  const reduceMotion = useReduceMotion()
  const fill = color ?? LOGO_COLORS[mode]

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
      <Svg width={size} height={height} viewBox={HOUSE_VIEWBOX}>
        <Path d={HOUSE_PATH} fill={fill} fillRule="evenodd" />
      </Svg>
      <Animated.View
        pointerEvents="none"
        style={[styles.drum, { left: drumLeft, top: drumTop, width: drumSide, height: drumSide }, drumStyle]}
      >
        <Svg width={drumSide} height={drumSide} viewBox={DRUM_VIEWBOX}>
          <Path d={DRUM_PATH} fill={fill} fillRule="evenodd" />
        </Svg>
      </Animated.View>
    </View>
  )
}

export const LoadingIcon = memo(LoadingIconBase)
LoadingIcon.displayName = "LoadingIcon"

/** Loading padrão da Lavex: overlay em tela cheia com o ícone animado no centro. Bloqueia toques enquanto visível. */
const LoadingBase: React.FC<LoadingProps> = ({
  visible,
  size = 120,
  color,
  overlayColor,
  accessibilityLabel = "Carregando",
}) => {
  const { mode } = useLavexTheme()
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={noop}
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor ?? OVERLAY_COLORS[mode] }]}>
        <LoadingIcon size={size} color={color} accessibilityLabel={accessibilityLabel} />
      </View>
    </RNModal>
  )
}

export const Loading = memo(LoadingBase)
Loading.displayName = "Loading"

/** O botão voltar do Android não fecha o loading; quem controla é `visible`. */
function noop() {}

const styles = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center" },
  drum: { position: "absolute" },
})
