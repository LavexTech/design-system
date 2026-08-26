import React from "react"
import { View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { GluestackUIProvider } from '../../ui/gluestack-ui-provider'
import { TextBox as Text } from "../Text/Text"
import { Button } from "../Button/Button"
import {
    Modal as GluestackModal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "../../ui/modal"
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
    darkMode?: boolean,
    fontScale?: number,
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
    darkMode = false,
    fontScale = 1,
}: ModalProps) => {
    const { height: windowHeight } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const maxHeight =
        windowHeight -
        Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT -
        insets.bottom
    const hasConfirm = typeof onConfirm === 'function'

    return (
        <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
            <GluestackModal
                isOpen={visible}
                onClose={onClose}
                size="md"
            >
                <ModalBackdrop onPress={onClose} />
                <ModalContent style={{ maxHeight }}>
                    {title ? (
                        <ModalHeader>
                            <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
                                <Text text={title} position="center" darkMode={darkMode} fontScale={fontScale} />
                            </View>
                        </ModalHeader>
                    ) : null}
                    <ModalBody style={{ maxHeight: maxHeight * 0.7 }}>
                        {children}
                    </ModalBody>
                    <ModalFooter style={{ width: '100%', gap: Constants.styles.spacing.SMALL, flexDirection: 'row', justifyContent: hasConfirm ? 'space-between' : 'flex-end' }}>
                            <Button 
                                text={hasConfirm ? (buttonText === 'OK' ? 'Cancelar' : buttonText) : buttonText} 
                                onClick={onClose} 
                                variant={hasConfirm ? (buttonVariant === 'default' ? 'default-outline' : buttonVariant) : buttonVariant} 
                                size={buttonSize}
                                darkMode={darkMode}
                                fontScale={fontScale}
                            />
                            {hasConfirm ? (
                                <Button
                                    text={confirmText || 'OK'}
                                    onClick={onConfirm}
                                    variant={confirmVariant}
                                    size={buttonSize}
                                    disabled={confirmDisabled}
                                    darkMode={darkMode}
                                    fontScale={fontScale}
                                />
                            ) : null}
                    </ModalFooter>
                </ModalContent>
            </GluestackModal>
        </GluestackUIProvider>
    )
}
