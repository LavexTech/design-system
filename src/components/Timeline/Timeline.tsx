import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconCheck } from "../Icons/IconCheck"
import { Info } from "../Info/Info"

export type TimelineStepStatus = "DONE" | "CURRENT" | "EMPTY"

export type TimelineStep = {
  id: string
  title: string
  description?: string
  timestamp?: string
  /** Texto opcional alinhado à direita, na mesma linha do título. */
  extra?: string
  status: TimelineStepStatus
}

type TimelineProps = { steps: TimelineStep[]; fontScale?: number }

const C = Constants.styles

export const Timeline: React.FC<TimelineProps> = ({ steps, fontScale = 1 }) => {
  const { colors } = useLavexTheme()
  const boldFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const regularFont = useResolvedFontFamily(C.fontFamily.REGULAR)

  return (
  <View accessibilityRole="list" style={styles.list}>
    {steps.map((step, index) => {
      const last = index === steps.length - 1
      const lineColor = step.status === "EMPTY" ? colors.border : colors.accent
      return (
        <View key={step.id} style={styles.row} accessibilityLabel={`${step.title}${step.extra ? `, ${step.extra}` : ""}, ${step.status === "DONE" ? "concluída" : step.status === "CURRENT" ? "em andamento" : "pendente"}`}>
          <View style={styles.rail}>
            <View
              style={[
                styles.node,
                step.status === "DONE"
                  ? [styles.done, { backgroundColor: colors.accent, borderColor: colors.accent }]
                  : step.status === "CURRENT"
                    ? [styles.current, { backgroundColor: colors.primary, borderColor: colors.accent }]
                    : [styles.empty, { backgroundColor: colors.surface, borderColor: colors.borderInteractive }],
              ]}
            >
              {step.status === "DONE" ? <IconCheck size={13} color={colors.background} /> : null}
            </View>
            {!last ? <View style={[styles.line, { backgroundColor: lineColor }]} /> : null}
          </View>
          <View style={styles.copy}>
            <View style={styles.titleRow}>
              <Text style={{
                flex: 1,
                fontFamily: step.status === "CURRENT" ? boldFont : regularFont,
                fontWeight: "normal",
                fontSize: 15 * fontScale,
                color: step.status === "EMPTY" ? colors.textMuted : colors.text,
              }}>{step.title}</Text>
              {step.extra ? <Info text={step.extra} tone="default" /> : null}
            </View>
            {step.description ? <Text style={[styles.meta, { color: colors.textMuted, fontFamily: regularFont, fontWeight: "normal" }]}>{step.description}</Text> : null}
            {step.timestamp ? <Text style={[styles.meta, { color: colors.textMuted, fontFamily: regularFont, fontWeight: "normal" }]}>{step.timestamp}</Text> : null}
          </View>
        </View>
      )
    })}
  </View>
  )
}

const styles = StyleSheet.create({
  list: { alignSelf: "stretch" },
  row: { flexDirection: "row", gap: 14 },
  rail: { width: 22, alignItems: "center" },
  node: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  done: { borderWidth: 2 },
  current: { borderWidth: 2 },
  empty: { borderWidth: C.borderWidth.INTERACTIVE },
  line: { width: 2, flex: 1, minHeight: 14 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  copy: { flex: 1, paddingBottom: 20 },
  meta: { fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION },
})
