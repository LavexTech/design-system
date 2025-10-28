import React from "react"
import { View, StyleSheet } from "react-native"
import { TextBox } from "../Text/Text"
import { Image } from "../Image/Image"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"

export type MessageReceivedProps = {
    text: string
    timestamp?: string
    senderName?: string
    avatarUrl?: string
}

export const MessageReceived: React.FC<MessageReceivedProps> = ({
    text,
    timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    senderName = "Contact",
    avatarUrl = "https://picsum.photos/id/91/40/40"
}: MessageReceivedProps) => {
    return (
        <View style={styles.container}>
            <Grid columns={12} gap={4}>
                <GridItem colSpan={2}>
                    <View style={styles.avatarContainer}>
                        <Image
                            src={avatarUrl}
                            alt={`${senderName} avatar`}
                            size="sm"
                            type="circle"
                        />
                    </View>
                </GridItem>
                <GridItem colSpan={10}>
                    <View style={styles.messageWrapper}>
                        <View style={styles.senderInfo}>
                            <TextBox text={senderName} size="small" level="default" />
                        </View>
                        <View style={styles.messageBubble}>
                            <TextBox text={text} />
                        </View>
                        <View style={styles.messageInfo}>
                            <TextBox text={timestamp} size="small" level="default" />
                        </View>
                    </View>
                </GridItem>
            </Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: Constants.styles.spacing.TINY,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.styles.spacing.LARGE, // Align with message bubble
        minWidth: 64, // Ensure enough space for sm image (h-16 w-16)
        minHeight: 64,
    },
    messageWrapper: {
        alignItems: 'flex-start',
        paddingLeft: Constants.styles.spacing.SMALL, // Add space between avatar and message
    },
    senderInfo: {
        marginBottom: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
    messageBubble: {
        backgroundColor: Constants.styles.backgroundColor.WHITE,
        borderRadius: Constants.styles.borderRadius.LARGE,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        borderBottomLeftRadius: Constants.styles.borderRadius.SMALL,
        borderWidth: Constants.styles.borderWidth.THIN,
        borderColor: Constants.styles.borderColor.LIGHT,
        maxWidth: '90%',
    },
    messageInfo: {
        marginTop: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
})