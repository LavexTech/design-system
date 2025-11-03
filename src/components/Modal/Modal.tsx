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
    buttonText: string,
    onClose: () => void,
    visible?: boolean
}

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    buttonText,
    onClose,
    visible = true,
}: ModalProps) => {
    return (
        <GluestackUIProvider>
            <GluestackModal
                isOpen={visible}
                onClose={onClose}
                size="md"
            >
                <ModalBackdrop onPress={onClose} />
                <ModalContent>
                    <ModalHeader>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text text={title} position="flex-end" />
                        </View>
                    </ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            text={buttonText}
                            onClick={onClose}
                            variant="default"
                        />
                    </ModalFooter>
                </ModalContent>
            </GluestackModal>
        </GluestackUIProvider>
    )
}