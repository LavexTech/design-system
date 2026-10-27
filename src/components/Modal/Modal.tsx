import React from "react"
import {
    KeyboardAvoidingView,
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
import { useLavexTheme } from "../../theme/LavexThemeProvider"

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
    | 'link'

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
    /** When true and there is a confirm action, stack confirm above the close button. */
    stackedButtons?: boolean,
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
    stackedButtons = false,
    darkMode = false,
    fontScale = 1,
    contentMinHeight,
}: ModalProps) => {
    const { height: windowHeight } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const { colors } = useLavexTheme()
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
            {/* Com teclado aberto a área encolhe e o cartão sobe: campos e botões nunca ficam atrás dele.
                Dentro do RN Modal a KAV começa no topo da tela, então não precisa de offset. */}
            <KeyboardAvoidingView style={styles.overlay} behavior="padding">
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
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            ...(contentMinHeight ? { minHeight: contentMinHeight } : {}),
                        },
                    ]}
                >
                    {title ? (
                        <View style={styles.header}>
                            <Text text={title} position="center" darkMode={darkMode} fontScale={fontScale} />
                        </View>
                    ) : null}
                    <ScrollView
                        style={[styles.scroll, { maxHeight: maxHeight * 0.7 }]}
                        contentContainerStyle={styles.body}
                        keyboardShouldPersistTaps="handled"
                    >
                        {children}
                    </ScrollView>
                    <View style={[styles.footer, hasConfirm ? (stackedButtons ? styles.footerStacked : styles.footerConfirm) : styles.footerSingle]}>
                        <Button
                            text={hasConfirm ? (buttonText === 'OK' ? 'Cancelar' : buttonText) : buttonText}
                            onClick={onClose}
                            variant={hasConfirm ? (buttonVariant === 'default' ? 'default-outline' : buttonVariant) : buttonVariant}
                            size={buttonSize}
                            darkMode={darkMode}
                            fontScale={fontScale}
                            style={
                                hasConfirm && !stackedButtons
                                    ? styles.footerButton
                                    : stackedButtons && buttonVariant === 'link'
                                      ? styles.footerLink
                                      : undefined
                            }
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
                                style={stackedButtons ? undefined : styles.footerButton}
                            />
                        ) : null}
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        // Encolhe junto com a área visível quando o teclado abre
        flexShrink: 1,
    },
    scroll: {
        flexShrink: 1,
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
    footerStacked: {
        flexDirection: "column-reverse",
        alignItems: "stretch",
    },
    footerLink: {
        alignSelf: "center",
    },
    footerSingle: {
        justifyContent: "flex-end",
    },
    footerButton: {
        flexGrow: 1,
        flexShrink: 1,
    },
})
