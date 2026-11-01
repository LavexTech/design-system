import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { darkColors, lightColors } from "../../theme/tokens"
import { IconCheck } from "../Icons/IconCheck"

const C = Constants.styles

const DEFAULT_DURATION_MS = 5000
const ANIMATION_MS = 220
const TOP_OFFSET = 12
const MAX_WIDTH = 420
const ICON_SIZE = 20

export type ToastProps = {
    /** Texto do aviso. Com `visible` true e `message` vazio, nada aparece. */
    message: string
    visible: boolean
    /** Chamado quando o toast termina de sair, por tempo (`duration`) ou toque. O dono do estado põe `visible` em false. */
    onHide: () => void
    /** Tempo em tela, em ms. */
    duration?: number
    /**
     * Toast escuro (fundo `#2D3B42`, texto branco) ou claro (fundo branco com borda).
     * Não depende do `LavexThemeProvider`: o app escolhe o contraste que quer.
     */
    darkMode?: boolean
}

/**
 * Aviso rápido que desce do topo, sobre a tela, e some sozinho. Não bloqueia toques fora dele.
 * Monte uma vez no layout raiz, dentro do `SafeAreaProvider`, e controle `visible`/`message` pelo estado do app.
 * Um toque no aviso o fecha antes do tempo.
 */
export const Toast: React.FC<ToastProps> = ({
    message,
    visible,
    onHide,
    duration = DEFAULT_DURATION_MS,
    darkMode = false,
}) => {
    const insets = useSafeAreaInsets()
    const font = useResolvedFontFamily(C.fontFamily.SEMIBOLD)
    const progress = useRef(new Animated.Value(0)).current
    const onHideRef = useRef(onHide)
    onHideRef.current = onHide
    // Mantém o último texto na tela durante a animação de saída
    const [shownMessage, setShownMessage] = useState(message)
    const [mounted, setMounted] = useState(visible)

    useEffect(() => {
        if (!visible) {
            Animated.timing(progress, {
                toValue: 0,
                duration: ANIMATION_MS,
                easing: Easing.in(Easing.cubic),
                useNativeDriver: Platform.OS !== "web",
            }).start(({ finished }) => {
                if (finished) setMounted(false)
            })
            return
        }

        setShownMessage(message)
        setMounted(true)
        Animated.timing(progress, {
            toValue: 1,
            duration: ANIMATION_MS,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: Platform.OS !== "web",
        }).start()
        const timer = setTimeout(() => onHideRef.current(), duration)
        return () => clearTimeout(timer)
    }, [visible, message, duration, progress])

    if (!mounted || !shownMessage) return null

    const palette = darkMode
        ? { background: lightColors.inverseSurface, text: lightColors.onInverse, icon: darkColors.primary, border: "transparent" }
        : { background: lightColors.surface, text: lightColors.text, icon: lightColors.accent, border: lightColors.border }

    return (
        <View pointerEvents="box-none" style={[styles.container, { top: insets.top + TOP_OFFSET }]}>
            <Animated.View
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                style={{
                    opacity: progress,
                    transform: [
                        {
                            translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }),
                        },
                    ],
                }}
            >
                <Pressable
                    accessibilityRole="button"
                    onPress={() => onHideRef.current()}
                    style={[styles.toast, { backgroundColor: palette.background, borderColor: palette.border }]}
                >
                    <IconCheck size={ICON_SIZE} color={palette.icon} />
                    <Text
                        style={[
                            styles.message,
                            {
                                color: palette.text,
                                fontFamily: font,
                                fontWeight: font ? "normal" : "600",
                            },
                        ]}
                    >
                        {shownMessage}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        paddingHorizontal: C.spacing.MEDIUM,
        zIndex: 1000,
        elevation: 1000,
    },
    toast: {
        flexDirection: "row",
        alignItems: "center",
        gap: C.spacing.SMALL + 4,
        maxWidth: MAX_WIDTH,
        borderWidth: 1,
        borderRadius: C.borderRadius["2XL"],
        paddingVertical: 14,
        paddingHorizontal: C.spacing.MEDIUM,
        shadowColor: "#000000",
        shadowOpacity: 0.16,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    message: {
        flexShrink: 1,
        fontSize: C.fontSize.LABEL,
        lineHeight: C.lineHeight.LABEL,
    },
})
