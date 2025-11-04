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
    modalStyle?: 'info' | 'confirm' | 'save',
    onSave?: () => void,
    onConfirm?: () => void,
}

const modalStyleMap = (
        modalStyle: 'info' | 'confirm' | 'save',
        onClose: () => void,
        onSave: () => void,
        onConfirm: () => void
    ) => {
    switch (modalStyle) {
        case 'info':
            return <Button text="OK" onClick={onClose} variant="default" />
        case 'confirm':
            return <>
                <Button text="OK" onClick={onConfirm} variant="default" />
                <Button text="Cancelar" onClick={onClose} variant="default-outline" />
            </>
        case 'save':
            return <>
                <Button text="Salvar" onClick={onSave} variant="default" />
                <Button text="Cancelar" onClick={onClose} variant="default-outline" />
            </>
        default:
            return null
    }
}

export const Modal: React.FC<ModalProps> = ({
    title,
    children,
    onClose,
    visible = true,
    modalStyle = 'info',
    onSave,
    onConfirm,
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
                        {modalStyleMap(modalStyle, onClose, onSave || (() => {}), onConfirm || (() => {}))}
                    </ModalFooter>
                </ModalContent>
            </GluestackModal>
        </GluestackUIProvider>
    )
}