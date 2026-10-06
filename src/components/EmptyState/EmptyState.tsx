import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { IconSearch } from "../Icons/IconSearch"

type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const C = Constants.styles

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action }) => (
  <View accessibilityRole="summary" style={styles.wrap}>
    <View style={styles.circle} importantForAccessibility="no-hide-descendants">
      {icon ?? <IconSearch size={36} color={C.brand.DARK} />}
    </View>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {action}
  </View>
)

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", alignItems: "center", padding: 32, gap: 8 },
  circle: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.surface.ILLUSTRATION, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  title: { fontSize: C.fontSize.ACTION, fontWeight: "700", color: C.text.DEFAULT, textAlign: "center" },
  description: { fontSize: C.fontSize.SUBTITLE, lineHeight: C.lineHeight.SUBTITLE, color: C.text.MUTED, textAlign: "center", maxWidth: 280 },
})
