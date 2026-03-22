import React from "react"
import { View } from "react-native"
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

type ModalProps = {
    title: string,
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
    return (
        <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
            <GluestackModal
                isOpen={visible}
                onClose={onClose}
                size="md"
            >
                <ModalBackdrop onPress={onClose} />
                <ModalContent>
                    <ModalHeader>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text text={title} position="center" darkMode={darkMode} fontScale={fontScale} />
                        </View>
                    </ModalHeader>
                    <ModalBody>
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