import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
    Modal as RNModal,
    NativeScrollEvent,
    NativeSyntheticEvent,
    PanResponder,
    Pressable,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native"
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconClose } from "../Icons/IconClose"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"

const DEFAULT_HEIGHT_RATIO = 0.75
const ANIMATION_MS = 300
/** Arrastar mais que esta fração da altura (ou soltar rápido) fecha a drawer. */
const DISMISS_DRAG_RATIO = 0.25
const DISMISS_VELOCITY = 1
/** Movimento vertical mínimo para a drawer tomar o gesto do conteúdo. */
const DRAG_SLOP = 6
const RADIUS = 16
const CLOSE_ICON_SIZE = 24

type DrawerScroll = {
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
    scrollEventThrottle: number
}

const DrawerScrollContext = createContext<DrawerScroll | null>(null)

/**
 * Para listas roláveis dentro da `Drawer`: espalhe o retorno na `ScrollView`/`FlatList`
 * (`<FlatList {...useDrawerScroll()} />`). Assim o swipe para baixo só fecha a drawer com a lista no topo.
 * Fora de uma `Drawer`, devolve um handler vazio.
 */
export function useDrawerScroll(): DrawerScroll {
    return useContext(DrawerScrollContext) ?? { onScroll: () => undefined, scrollEventThrottle: 16 }
}

export type DrawerProps = {
    visible: boolean
    /** Chamado depois da animação de saída: X, toque no fundo escuro, swipe para baixo ou voltar do Android. */
    onClose: () => void
    children: React.ReactNode
    /** Fração da altura da janela ocupada pela drawer. */
    heightRatio?: number
    /** Rodapé fixo (ex.: botão de ação), acima da safe area. */
    footer?: React.ReactNode
    closeAccessibilityLabel?: string
}

/**
 * Painel que sobe de baixo (slide-up) sobre a tela inteira, inclusive a tab bar. Sem barra de título:
 * só o X no canto superior direito. O fundo escuro cobre o restante da tela.
 */
export const Drawer: React.FC<DrawerProps> = ({
    visible,
    onClose,
    children,
    heightRatio = DEFAULT_HEIGHT_RATIO,
    footer,
    closeAccessibilityLabel = "Fechar",
}) => {
    const { height: windowHeight } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const { colors } = useLavexTheme()
    const sheetHeight = Math.round(windowHeight * Math.min(Math.max(heightRatio, 0.1), 1))

    const [mounted, setMounted] = useState(visible)
    const translateY = useSharedValue(sheetHeight)
    const closingRef = useRef(false)
    const atTopRef = useRef(true)
    const onCloseRef = useRef(onClose)
    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    const notifyClosed = useCallback(() => {
        closingRef.current = false
        onCloseRef.current()
    }, [])

    useEffect(() => {
        if (visible) {
            closingRef.current = false
            atTopRef.current = true
            setMounted(true)
            translateY.value = sheetHeight
            translateY.value = withTiming(0, { duration: ANIMATION_MS, easing: Easing.out(Easing.cubic) })
            return
        }
        // Fechada por fora (ex.: o app navegou): sai com a mesma animação e desmonta
        translateY.value = withTiming(
            sheetHeight,
            { duration: ANIMATION_MS, easing: Easing.in(Easing.cubic) },
            (finished) => {
                if (finished) runOnJS(setMounted)(false)
            }
        )
    }, [visible, sheetHeight, translateY])

    /** Todas as formas de fechar passam por aqui: anima a saída e só então avisa o app. */
    const dismiss = useCallback(() => {
        if (closingRef.current) return
        closingRef.current = true
        translateY.value = withTiming(
            sheetHeight,
            { duration: ANIMATION_MS, easing: Easing.in(Easing.cubic) },
            (finished) => {
                if (finished) runOnJS(notifyClosed)()
            }
        )
    }, [notifyClosed, sheetHeight, translateY])

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponderCapture: (_event, gesture) =>
                    atTopRef.current && gesture.dy > DRAG_SLOP && Math.abs(gesture.dy) > Math.abs(gesture.dx),
                onPanResponderMove: (_event, gesture) => {
                    translateY.value = Math.max(0, gesture.dy)
                },
                onPanResponderRelease: (_event, gesture) => {
                    if (gesture.dy > sheetHeight * DISMISS_DRAG_RATIO || gesture.vy > DISMISS_VELOCITY) {
                        dismiss()
                        return
                    }
                    translateY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) })
                },
                onPanResponderTerminate: () => {
                    translateY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) })
                },
            }),
        [dismiss, sheetHeight, translateY]
    )

    const scroll = useMemo<DrawerScroll>(
        () => ({
            onScroll: (event) => {
                atTopRef.current = event.nativeEvent.contentOffset.y <= 0
            },
            scrollEventThrottle: 16,
        }),
        []
    )

    const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }))
    const backdropStyle = useAnimatedStyle(() => ({ opacity: 1 - translateY.value / sheetHeight }))

    if (!mounted) return null

    return (
        <RNModal visible transparent animationType="none" statusBarTranslucent onRequestClose={dismiss}>
            <View style={styles.root}>
                <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={closeAccessibilityLabel}
                        onPress={dismiss}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.sheet, { height: sheetHeight, backgroundColor: colors.surface }, sheetStyle]}
                >
                    <View style={styles.grabberRow} pointerEvents="none">
                        <View style={[styles.grabber, { backgroundColor: colors.border }]} />
                    </View>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={closeAccessibilityLabel}
                        onPress={dismiss}
                        hitSlop={12}
                        style={styles.close}
                    >
                        <IconClose size={CLOSE_ICON_SIZE} color={colors.text} />
                    </Pressable>
                    <DrawerScrollContext.Provider value={scroll}>
                        <View style={styles.body}>{children}</View>
                    </DrawerScrollContext.Provider>
                    {footer ? (
                        <View
                            style={[
                                styles.footer,
                                { paddingBottom: Constants.styles.spacing.MEDIUM + insets.bottom, borderTopColor: colors.border },
                            ]}
                        >
                            {footer}
                        </View>
                    ) : null}
                </Animated.View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-end",
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sheet: {
        width: "100%",
        borderTopLeftRadius: RADIUS,
        borderTopRightRadius: RADIUS,
        overflow: "hidden",
    },
    grabberRow: {
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 4,
    },
    grabber: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    close: {
        position: "absolute",
        top: 12,
        right: 16,
        zIndex: 2,
        padding: 4,
    },
    body: {
        flex: 1,
        minHeight: 0,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: Constants.styles.spacing.MEDIUM,
        borderTopWidth: 1,
    },
})
