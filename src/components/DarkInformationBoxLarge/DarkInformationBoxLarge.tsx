import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { AnimatedStatusIndicator } from "../AnimatedStatusIndicator/AnimatedStatusIndicator"
import { IconCheck } from "../Icons/IconCheck"
import { IconCircleCheck } from "../Icons/IconCircleCheck"
import { IconCircleWaves } from "../Icons/IconCircleWaves"
import { IconClose } from "../Icons/IconClose"
import { IconCreditCard } from "../Icons/IconCreditCard"
import { IconExclamation } from "../Icons/IconExclamation"
import { IconHourglass } from "../Icons/IconHourglass"
import { IconMapPin } from "../Icons/IconMapPin"
import { IconMessageSquare } from "../Icons/IconMessageSquare"
import { IconReceipt } from "../Icons/IconReceipt"
import { IconShieldCheck } from "../Icons/IconShieldCheck"

type DarkInformationBoxLargeProps = {
  /** Nome do ícone: `check`, `circle-check`, `circle-waves`, `hourglass`, `map-pin`, `message-square`, `shield-check`, `credit-card`, `receipt`, `exclamation` ou `x`. Nome desconhecido não desenha ícone. */
  icon: string
  /** Com `true`, o círculo emite anéis de pulso. */
  animated: boolean
  title: string
  /** Corpo abaixo do título. Ausente ou vazio não desenha a linha. */
  text?: string
  /** Cor do ícone. Sem valor, grafite `#2D3B42`. */
  iconColor?: string
  /** Fundo do círculo. Sem valor, verde-água `#3CDBC0`. */
  circleColor?: string
}

type IconComponent = React.ComponentType<{ size?: number; color?: string }>

const ICONS: Record<string, IconComponent> = {
  check: IconCheck,
  "circle-check": IconCircleCheck,
  "circle-waves": IconCircleWaves,
  hourglass: IconHourglass,
  "map-pin": IconMapPin,
  "message-square": IconMessageSquare,
  "shield-check": IconShieldCheck,
  "credit-card": IconCreditCard,
  receipt: IconReceipt,
  exclamation: IconExclamation,
  x: IconClose,
}

const C = Constants.styles
const CORE = 72
const ICON_SIZE = 28

export const DarkInformationBoxLarge: React.FC<DarkInformationBoxLargeProps> = ({ icon, animated, title, text, iconColor, circleColor }) => {
  const titleFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const bodyFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const Icon = Object.prototype.hasOwnProperty.call(ICONS, icon) ? ICONS[icon] : undefined
  const glyph = Icon ? <Icon size={ICON_SIZE} color={iconColor ?? C.brand.SURFACE} /> : null
  const circle = circleColor ?? C.brand.PRIMARY
  return (
    <View accessibilityRole="summary" style={styles.box}>
      {animated ? (
        <AnimatedStatusIndicator accessibilityLabel={title} icon={glyph} coreColor={circle} />
      ) : (
        <View style={[styles.core, { backgroundColor: circle }]}>{glyph}</View>
      )}
      <Text style={[styles.title, { fontFamily: titleFont, fontWeight: "normal" }]}>{title}</Text>
      {text?.trim() ? (
        <Text style={[styles.text, { fontFamily: bodyFont, fontWeight: "normal" }]}>{text}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: C.brand.SURFACE,
    borderRadius: C.borderRadius["2XL"],
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 8,
    overflow: "visible",
  },
  core: {
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
    backgroundColor: C.brand.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: C.fontSize.LARGE, lineHeight: C.lineHeight.TITLE, color: C.color.WHITE, textAlign: "center" },
  text: { fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION, color: C.color.WHITE, textAlign: "center" },
})
