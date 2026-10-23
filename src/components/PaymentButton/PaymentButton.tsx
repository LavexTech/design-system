import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useResolvedFontFamily } from "../../fontSetup"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { IconCheck } from "../Icons/IconCheck"

export interface PaymentButtonProps {
  /** Miniatura exibida na coluna esquerda (imagem ou ícone), sobre fundo branco. */
  graphic: React.ReactNode
  title: string
  subtitle: string
  initiallySelected?: boolean
  /** Modo controlado: quando informado, o botão mostra este valor e `initiallySelected` é ignorado. */
  selected?: boolean
  /** Recebe o novo valor de `selected`. */
  onChange?: (selected: boolean) => void
  disabled?: boolean
}

const C = Constants.styles

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  graphic,
  title,
  subtitle,
  initiallySelected = false,
  selected: controlledSelected,
  onChange,
  disabled = false,
}) => {
  const { colors } = useLavexTheme()
  const [internalSelected, setSelected] = useState(initiallySelected)
  const selected = controlledSelected ?? internalSelected
  const regular = useResolvedFontFamily(C.fontFamily.REGULAR)
  const bold = useResolvedFontFamily(C.fontFamily.BOLD)

  useEffect(() => {
    setSelected(initiallySelected)
  }, [initiallySelected])

  const handlePress = () => {
    const next = !selected
    if (controlledSelected === undefined) setSelected(next)
    onChange?.(next)
  }

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={`${title}. ${subtitle}`}
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: selected ? colors.accent : colors.borderInteractive,
          backgroundColor: selected ? colors.surfaceAccent : colors.surface,
          opacity: pressed && !disabled ? 0.85 : disabled ? C.opacity.LOW : 1,
        },
      ]}
    >
      <View style={styles.thumbColumn}>
        <View style={[styles.thumb, { borderColor: colors.border }]}>{graphic}</View>
      </View>
      <View style={styles.textColumn}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: colors.text, fontFamily: bold, fontWeight: bold ? "normal" : "700" }]}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.subtitle, { color: colors.textMuted, fontFamily: regular, fontWeight: regular ? "normal" : "400" }]}
        >
          {subtitle}
        </Text>
      </View>
      <View style={styles.checkColumn}>
        {selected ? (
          <View style={[styles.check, { backgroundColor: colors.accent }]}>
            <IconCheck size={14} color={colors.background} strokeWidth={3} />
          </View>
        ) : null}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: C.borderRadius.XL,
    borderWidth: C.borderWidth.INTERACTIVE,
  },
  thumbColumn: { flex: 3, alignItems: "center" },
  thumb: {
    width: "100%",
    maxWidth: 64,
    aspectRatio: 1.5,
    borderRadius: C.borderRadius.MEDIUM,
    backgroundColor: C.surface.DEFAULT,
    borderWidth: C.borderWidth.HAIRLINE,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  textColumn: { flex: 8, paddingLeft: 12, justifyContent: "center" },
  title: {
    fontSize: C.fontSize.BODY,
    lineHeight: C.lineHeight.BODY,
  },
  subtitle: {
    fontSize: C.fontSize.LABEL,
    lineHeight: C.lineHeight.LABEL,
  },
  checkColumn: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
})
