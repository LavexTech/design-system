import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconChevronLeft } from "../Icons/IconChevronLeft"

type TopHeaderProps = {
  title: string
  subtitle?: string
  onBack?: () => void
  align?: "left" | "center"
  leading?: React.ReactNode
  trailing?: React.ReactNode
  titleAccessory?: React.ReactNode
  fontScale?: number
}

const C = Constants.styles

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  onBack,
  align = "left",
  leading,
  trailing,
  titleAccessory,
  fontScale = 1,
}) => {
  const bold = useResolvedFontFamily(C.fontFamily.BOLD)
  const centered = align === "center"
  return (
    <View style={[styles.wrap, { paddingLeft: onBack || leading ? 12 : 24 }]}>
      <View style={styles.row}>
        {leading ?? (onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack} style={styles.back}>
            <IconChevronLeft size={24} color={C.text.DEFAULT} />
          </Pressable>
        ) : null)}
        <View style={[styles.titles, centered ? styles.center : null]}>
          <View style={styles.titleRow}>
            <Text
              accessibilityRole="header"
              style={{
                fontSize: C.fontSize.DISPLAY * fontScale,
                lineHeight: C.lineHeight.DISPLAY * fontScale,
                fontFamily: bold,
                fontWeight: bold ? "normal" : "700",
                letterSpacing: -0.4,
                color: C.text.DEFAULT,
                textAlign: centered ? "center" : "left",
              }}
            >
              {title}
            </Text>
            {titleAccessory}
          </View>
          {subtitle ? (
            <Text style={[styles.subtitle, { textAlign: centered ? "center" : "left", fontSize: C.fontSize.SUBTITLE * fontScale }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {trailing}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", backgroundColor: C.surface.DEFAULT, paddingRight: 24 },
  row: { flexDirection: "row", alignItems: "center" },
  back: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  titles: { flex: 1, gap: 6 },
  center: { alignItems: "center" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  subtitle: { color: C.text.MUTED, lineHeight: C.lineHeight.SUBTITLE },
})
