import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconSearch } from "../Icons/IconSearch"

type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const C = Constants.styles

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => {
  const { colors } = useLavexTheme()
  const titleFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const bodyFont = useResolvedFontFamily(C.fontFamily.REGULAR)

  return (
  <View accessibilityRole="summary" style={styles.wrap}>
    <View style={styles.circle} importantForAccessibility="no-hide-descendants">
      {icon ?? <IconSearch size={36} color={colors.accent} />}
    </View>
    <Text style={[styles.title, { color: colors.text, fontFamily: titleFont, fontWeight: "normal" }]}>{title}</Text>
    {description ? <Text style={[styles.description, { color: colors.textMuted, fontFamily: bodyFont, fontWeight: "normal" }]}>{description}</Text> : null}
    {action}
  </View>
  )
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", alignItems: "center", padding: 32, gap: 8 },
  circle: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.surface.ILLUSTRATION, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  title: { fontSize: C.fontSize.ACTION, textAlign: "center" },
  description: { fontSize: C.fontSize.SUBTITLE, lineHeight: C.lineHeight.SUBTITLE, textAlign: "center", maxWidth: 280 },
})
