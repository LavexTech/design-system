import React from "react";
import { Text, Pressable } from "react-native";
import {
    Modal as GluestackModal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "../../ui/modal";

export interface ModalProps {
    title: string;
    text: string;
    buttonText: string;
    onClose: () => void;
    visible?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    text,
    buttonText,
    onClose,
    visible = true,
}: ModalProps) => {
    return (
        <GluestackModal 
            isOpen={visible} 
            onClose={onClose} 
            size="md"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader {...({} as any)}>
                    <Text className="text-typography-950 text-xl font-bold text-center flex-1">
                        {title}
                    </Text>
                </ModalHeader>
                <ModalBody {...({} as any)}>
                    <Text className="text-typography-900 text-base text-center leading-relaxed">
                        {text}
                    </Text>
                </ModalBody>
                <ModalFooter {...({} as any)}>
                    <Pressable
                        onPress={onClose}
                        className="bg-typography-950 px-6 py-3 rounded-lg w-full active:opacity-80"
                    >
                        <Text className="text-background-0 text-base font-bold text-center">
                            {buttonText}
                        </Text>
                    </Pressable>
                </ModalFooter>
            </ModalContent>
        </GluestackModal>
    );
};
