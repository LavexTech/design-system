import React from "react"
import {
    Modal as RNModal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TextBox as Text } from "../Text/Text"
import { Button } from "../Button/Button"
import Constants from "../../constants/constants"

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'secondary-outline'
    | 'default'
    | 'success'
    | 'danger'
    | 'default-outline'
    | 'success-outline'
    | 'danger-outline'
    | 'ghost'
    | 'ghost-danger'

type ModalProps = {
    title?: string,
    children: React.ReactNode,
    onClose: () => void,
    visible?: boolean,
    buttonVariant?: ButtonVariant,
    buttonText?: string,
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    /** When set, footer shows Cancel (onClose) + Confirm (onConfirm). */
    confirmText?: string,
    onConfirm?: () => void,
    confirmVariant?: ButtonVariant,
    confirmDisabled?: boolean,
    /** When true (default), calling confirm also invokes onClose. */
    closeOnConfirm?: boolean,
    darkMode?: boolean,
    fontScale?: number,
    /** Minimum height of the modal card (content + chrome). */
    contentMinHeight?: number,
}

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    onClose,
    visible = true,
    buttonVariant = 'default',
    buttonText = 'OK',
    buttonSize,
    confirmText,
    onConfirm,
    confirmVariant = 'success',
    confirmDisabled = false,
    closeOnConfirm = true,
    darkMode = false,
    fontScale = 1,
    contentMinHeight,
}: ModalProps) => {
    const { height: windowHeight } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const theme = darkMode ? Constants.styles.theme.dark : Constants.styles.theme.light
    const maxHeight =
        windowHeight -
        Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT -
        insets.bottom
    const hasConfirm = typeof onConfirm === 'function'

    function handleConfirm() {
        onConfirm?.()
        if (closeOnConfirm) {
            onClose()
        }
    }

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Fechar"
                    onPress={onClose}
                    style={styles.backdrop}
                />
                <View
                    style={[
                        styles.card,
                        {
                            maxHeight,
                            backgroundColor: theme.background.surface,
                            borderColor: theme.border.default,
                            ...(contentMinHeight ? { minHeight: contentMinHeight } : {}),
                        },
                    ]}
                >
                    {title ? (
                        <View style={styles.header}>
                            <Text text={title} position="center" darkMode={darkMode} fontScale={fontScale} />
                        </View>
                    ) : null}
                    <ScrollView style={{ maxHeight: maxHeight * 0.7 }} contentContainerStyle={styles.body}>
                        {children}
                    </ScrollView>
                    <View style={[styles.footer, hasConfirm ? styles.footerConfirm : styles.footerSingle]}>
                        <Button
                            text={hasConfirm ? (buttonText === 'OK' ? 'Cancelar' : buttonText) : buttonText}
                            onClick={onClose}
                            variant={hasConfirm ? (buttonVariant === 'default' ? 'default-outline' : buttonVariant) : buttonVariant}
                            size={buttonSize}
                            darkMode={darkMode}
                            fontScale={fontScale}
                            style={hasConfirm ? styles.footerButton : undefined}
                        />
                        {hasConfirm ? (
                            <Button
                                text={confirmText || 'OK'}
                                onClick={handleConfirm}
                                variant={confirmVariant}
                                size={buttonSize}
                                disabled={confirmDisabled}
                                darkMode={darkMode}
                                fontScale={fontScale}
                                style={styles.footerButton}
                            />
                        ) : null}
                    </View>
                </View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    card: {
        width: "80%",
        maxWidth: 510,
        borderRadius: 6,
        borderWidth: 1,
        padding: 24,
        overflow: "hidden",
    },
    header: {
        alignItems: "center",
        width: "100%",
    },
    body: {
        marginTop: 8,
        marginBottom: 24,
    },
    footer: {
        width: "100%",
        gap: Constants.styles.spacing.SMALL,
        flexDirection: "row",
        alignItems: "center",
    },
    footerConfirm: {
        justifyContent: "space-between",
    },
    footerSingle: {
        justifyContent: "flex-end",
    },
    footerButton: {
        flexGrow: 1,
        flexShrink: 1,
    },
})
