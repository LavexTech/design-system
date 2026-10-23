import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { AnimatedStatusIndicator } from "../AnimatedStatusIndicator/AnimatedStatusIndicator"
import { IconCheck } from "../Icons/IconCheck"
import { IconCircleCheck } from "../Icons/IconCircleCheck"
import { IconCircleWaves } from "../Icons/IconCircleWaves"
import { IconCreditCard } from "../Icons/IconCreditCard"
import { IconExclamation } from "../Icons/IconExclamation"
import { IconHourglass } from "../Icons/IconHourglass"
import { IconMapPin } from "../Icons/IconMapPin"
import { IconMessageSquare } from "../Icons/IconMessageSquare"
import { IconReceipt } from "../Icons/IconReceipt"
import { IconShieldCheck } from "../Icons/IconShieldCheck"

type DarkInformationBoxProps = {
  /** Nome do ícone: `check`, `circle-check`, `circle-waves`, `hourglass`, `map-pin`, `message-square`, `shield-check`, `credit-card`, `receipt` ou `exclamation`. Nome desconhecido não desenha ícone. */
  icon: string
  /** Com `true`, o círculo emite anéis de pulso. */
  animated: boolean
  title: string
  text: string
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
}

const C = Constants.styles
const CORE = 50
const ICON_SIZE = 20

/** Caixa de status horizontal: ícone à esquerda (3/12) e título + texto à direita (9/12). */
export const DarkInformationBox: React.FC<DarkInformationBoxProps> = ({ icon, animated, title, text }) => {
  const { colors } = useLavexTheme()
  const titleFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const bodyFont = useResolvedFontFamily(C.fontFamily.REGULAR)
  const Icon = Object.prototype.hasOwnProperty.call(ICONS, icon) ? ICONS[icon] : undefined
  const glyph = Icon ? <Icon size={ICON_SIZE} color={colors.onPrimary} /> : null
  return (
    <View accessibilityRole="summary" style={[styles.box, { backgroundColor: colors.inverseSurface }]}>
      <View style={styles.iconColumn}>
        {animated ? (
          <AnimatedStatusIndicator accessibilityLabel={title} icon={glyph} size={CORE} />
        ) : (
          <View style={[styles.core, { backgroundColor: colors.primary }]}>{glyph}</View>
        )}
      </View>
      <View style={styles.textColumn}>
        <Text style={[styles.title, { color: colors.onInverse, fontFamily: titleFont, fontWeight: "normal" }]}>{title}</Text>
        <Text style={[styles.text, { color: colors.onInverse, fontFamily: bodyFont, fontWeight: "normal" }]}>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: C.borderRadius["2XL"],
    paddingHorizontal: 12,
    paddingVertical: 16,
    overflow: "visible",
  },
  iconColumn: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textColumn: {
    flex: 9,
    gap: 4,
  },
  core: {
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: C.fontSize.LARGE, lineHeight: C.lineHeight.TITLE, textAlign: "left" },
  text: { fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION, textAlign: "left" },
})
