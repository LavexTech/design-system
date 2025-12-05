import React from "react"
import { View, StyleSheet } from "react-native"
import { TextBox } from "../Text/Text"
import { Image } from "../Image/Image"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"
import { getProfileImageUrl } from "../../utils/profileImage"

type MessageReceivedProps = {
    text: string
    timestamp?: string
    senderName?: string
    avatarUrl?: string
    userType?: 'client' | 'provider'
}

export const MessageReceived: React.FC<MessageReceivedProps> = ({
    text,
    timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    senderName = "Contact",
    avatarUrl,
    userType = 'client'
}: MessageReceivedProps) => {
    const finalAvatarUrl = getProfileImageUrl(avatarUrl, userType);
    
    return (
        <View style={styles.container}>
            <Grid columns={12} gap={0}>
                <GridItem colSpan={2}>
                    <View style={styles.avatarContainer}>
                        <Image
                            src={finalAvatarUrl}
                            alt={`${senderName} avatar`}
                            size="xs"
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
        paddingTop: Constants.styles.spacing.LARGE,
    },
    messageWrapper: {
        alignItems: 'flex-start',
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
        maxWidth: Constants.styles.maxWidth.messageBubble as any,
    },
    messageInfo: {
        marginTop: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
})