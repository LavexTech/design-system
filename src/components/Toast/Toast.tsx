import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconCheck } from "../Icons/IconCheck"
import { IconExclamation } from "../Icons/IconExclamation"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { darkColors, lightColors } from "../../theme/tokens"

/** Tempo padrão na tela. */
export const TOAST_DURATION_MS = 5000
const ANIMATION_MS = 220
const OFFSET_Y = -24

export type ToastAppearance = "light" | "dark"
export type ToastVariant = "success" | "error"

export type ToastOptions = {
    variant?: ToastVariant
    /** Milissegundos na tela (padrão 5 s). */
    duration?: number
}

type ToastRequest = { id: number; message: string; variant: ToastVariant; duration: number }

let nextId = 1
const listeners = new Set<(toast: ToastRequest) => void>()

/**
 * Mostra um aviso curto no topo da tela, acima do conteúdo e sem bloquear o toque. Precisa de um `ToastHost`
 * montado no layout raiz. Um toast novo substitui o que estiver na tela.
 */
export function showToast(message: string, options: ToastOptions = {}): void {
    const request: ToastRequest = {
        id: nextId++,
        message,
        variant: options.variant ?? "success",
        duration: options.duration ?? TOAST_DURATION_MS,
    }
    listeners.forEach((listener) => listener(request))
}

/** Paleta própria do toast: não segue o tema do app, para o app escolher o contraste (claro no app escuro e vice-versa). */
function toastPalette(appearance: ToastAppearance) {
    if (appearance === "light") {
        return {
            background: lightColors.surface,
            text: lightColors.text,
            border: lightColors.border,
            iconBackground: lightColors.primary,
            iconColor: lightColors.onPrimary,
            errorBackground: lightColors.danger,
        }
    }
    return {
        background: lightColors.inverseSurface,
        text: lightColors.onInverse,
        border: lightColors.inverseSurface,
        iconBackground: darkColors.primary,
        iconColor: darkColors.onPrimary,
        errorBackground: darkColors.danger,
    }
}

export type ToastHostProps = {
    /** `light`: fundo branco (para o app de tema escuro). `dark`: fundo grafite (para o app de tema claro). */
    appearance?: ToastAppearance
    /** Distância extra do topo, além da safe area. */
    topOffset?: number
}

/** Montar uma vez no layout raiz. Recebe os pedidos de `showToast`. */
export const ToastHost: React.FC<ToastHostProps> = ({ appearance = "dark", topOffset = 8 }) => {
    const insets = useSafeAreaInsets()
    const font = useResolvedFontFamily(Constants.styles.fontFamily.SEMIBOLD)
    const [toast, setToast] = useState<ToastRequest | null>(null)
    const progress = useSharedValue(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const clearTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = null
    }, [])

    const hide = useCallback(() => {
        clearTimer()
        progress.value = withTiming(0, { duration: ANIMATION_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
            if (finished) runOnJS(setToast)(null)
        })
    }, [clearTimer, progress])

    useEffect(() => {
        const listener = (request: ToastRequest) => {
            clearTimer()
            setToast(request)
            progress.value = withTiming(1, { duration: ANIMATION_MS, easing: Easing.out(Easing.cubic) })
            timerRef.current = setTimeout(hide, request.duration)
        }
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
            clearTimer()
        }
    }, [clearTimer, hide, progress])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [{ translateY: (1 - progress.value) * OFFSET_Y }],
    }))

    if (!toast) return null

    const palette = toastPalette(appearance)
    const isError = toast.variant === "error"

    return (
        <View pointerEvents="box-none" style={[styles.host, { top: insets.top + topOffset }]}>
            <Animated.View style={[styles.wrapper, animatedStyle]}>
                <Pressable
                    accessibilityRole="alert"
                    accessibilityLiveRegion="polite"
                    onPress={hide}
                    style={[styles.toast, { backgroundColor: palette.background, borderColor: palette.border }]}
                >
                    <View
                        style={[
                            styles.icon,
                            { backgroundColor: isError ? palette.errorBackground : palette.iconBackground },
                        ]}
                    >
                        {isError ? (
                            <IconExclamation size={14} color={Constants.styles.color.WHITE} />
                        ) : (
                            <IconCheck size={14} color={palette.iconColor} strokeWidth={3} />
                        )}
                    </View>
                    <Text
                        style={[
                            styles.text,
                            { color: palette.text, fontFamily: font, fontWeight: font ? "normal" : "600" },
                        ]}
                    >
                        {toast.message}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    host: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        paddingHorizontal: 16,
        zIndex: 1000,
        elevation: 1000,
    },
    wrapper: {
        width: "100%",
        maxWidth: 480,
    },
    toast: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        flex: 1,
        fontSize: 15,
        lineHeight: 21,
    },
})
