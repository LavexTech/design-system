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

type ModalProps = {
    title?: string,
    children: React.ReactNode,
    onClose: () => void,
    visible?: boolean,
    buttonVariant?: 'primary' | 'secondary' | 'secondary-outline' | 'default' | 'success' | 'danger' | 'default-outline' | 'success-outline' | 'danger-outline',
    buttonText?: string,
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
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
    darkMode = false,
    fontScale = 1,
}: ModalProps) => {
    const { height: windowHeight } = useWindowDimensions()
    const insets = useSafeAreaInsets()
    const maxHeight =
        windowHeight -
        Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT -
        insets.bottom

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
                    <ModalFooter style={{ width: '100%' }}>
                            <Button 
                                text={buttonText} 
                                onClick={onClose} 
                                variant={buttonVariant} 
                                size={buttonSize}
                                darkMode={darkMode}
                                fontScale={fontScale}
                            />
                    </ModalFooter>
                </ModalContent>
            </GluestackModal>
        </GluestackUIProvider>
    )
}
