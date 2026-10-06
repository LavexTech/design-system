import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "../../constants/constants"
import { IconCheck } from "../Icons/IconCheck"

export type TimelineStep = {
  id: string
  title: string
  description?: string
  timestamp?: string
  status: "done" | "current" | "pending"
}

type TimelineProps = { steps: TimelineStep[]; fontScale?: number }

const C = Constants.styles

export const Timeline: React.FC<TimelineProps> = ({ steps, fontScale = 1 }) => (
  <View accessibilityRole="list" style={styles.list}>
    {steps.map((step, index) => {
      const last = index === steps.length - 1
      const lineColor = step.status === "pending" ? C.border.SOFT : C.brand.DARK
      return (
        <View key={step.id} style={styles.row} accessibilityLabel={`${step.title}, ${step.status === "done" ? "concluída" : step.status === "current" ? "em andamento" : "pendente"}`}>
          <View style={styles.rail}>
            <View style={[styles.node, step.status === "done" ? styles.done : step.status === "current" ? styles.current : styles.pending]}>
              {step.status === "done" ? <IconCheck size={13} color={C.color.WHITE} /> : null}
            </View>
            {!last ? <View style={[styles.line, { backgroundColor: lineColor }]} /> : null}
          </View>
          <View style={styles.copy}>
            <Text style={{ fontSize: 15 * fontScale, fontWeight: step.status === "pending" ? "500" : "700", color: step.status === "pending" ? C.text.MUTED : C.text.DEFAULT }}>{step.title}</Text>
            {step.description ? <Text style={styles.meta}>{step.description}</Text> : null}
            {step.timestamp ? <Text style={styles.meta}>{step.timestamp}</Text> : null}
          </View>
        </View>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  list: { alignSelf: "stretch" },
  row: { flexDirection: "row", gap: 14 },
  rail: { width: 22, alignItems: "center" },
  node: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  done: { backgroundColor: C.brand.DARK },
  current: { backgroundColor: C.brand.PRIMARY, borderWidth: 2, borderColor: C.brand.DARK },
  pending: { backgroundColor: C.surface.DEFAULT, borderWidth: C.borderWidth.INTERACTIVE, borderColor: C.border.INTERACTIVE },
  line: { width: 2, flex: 1, minHeight: 14 },
  copy: { flex: 1, paddingBottom: 20 },
  meta: { fontSize: C.fontSize.CAPTION, lineHeight: C.lineHeight.CAPTION, color: C.text.MUTED },
})
