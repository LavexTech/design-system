import React from "react"
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
    text: string,
    buttonText: string,
    onClose: () => void,
    visible?: boolean
}

export const Modal: React.FC<ModalProps> = ({
    title,
    text,
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
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader {...({} as any)}>
                        <Text text={title} />
                    </ModalHeader>
                    <ModalBody {...({} as any)}>
                        <Text size="small" text={text} />
                    </ModalBody>
                    <ModalFooter {...({} as any)}>
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