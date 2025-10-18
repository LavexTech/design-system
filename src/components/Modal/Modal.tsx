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
import { Grid, GridItem } from "../Grid/Grid"

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
                    <Grid columns={1} gap={1}>
                        <GridItem>  
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <ModalHeader {...({} as any)}>
                                    <Text text={title} />    
                                </ModalHeader>
                            </View>
                        </GridItem>
                        <GridItem>
                            <ModalBody {...({} as any)}>
                                <Text size="small" text={text} />
                            </ModalBody>
                        </GridItem>
                        <GridItem>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <ModalFooter {...({} as any)}>
                                    <Button
                                        text={buttonText}
                                        onClick={onClose}
                                        variant="default"
                                    />
                                </ModalFooter>
                            </View>
                        </GridItem>
                    </Grid>
                </ModalContent>  
            </GluestackModal>
        </GluestackUIProvider>
    )
}