import React from "react"
import { View, StyleSheet } from "react-native"
import { TextBox } from "../Text/Text"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"

type MessageSentProps = {
    text: string
    timestamp?: string
    senderName?: string
    avatarUrl?: string
    userType?: 'client' | 'provider'
}

export const MessageSent: React.FC<MessageSentProps> = ({ 
    text, 
    timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    senderName = "You",
    avatarUrl,
}: MessageSentProps) => {
    return (
        <View style={styles.container}>
            <Grid columns={12} gap={0}>
                <GridItem colSpan={10}>
                    <View style={styles.messageWrapper}>
                        <View style={styles.messageBubble}>
                            <TextBox text={text} />
                        </View>
                        <View style={styles.messageInfo}>
                            <TextBox text={timestamp} size="small" level="default" />
                        </View>
                    </View>
                </GridItem>
                <GridItem colSpan={2}>
                    <View style={styles.avatarContainer}>
                        <ProfileAvatar
                            profileImage={avatarUrl}
                            alt={`${senderName} avatar`}
                            size="xs"
                        />
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
    messageWrapper: {
        alignItems: 'flex-end',
    },
    messageBubble: {
        backgroundColor: Constants.styles.color.SOFT_BLUE,
        borderRadius: Constants.styles.borderRadius.LARGE,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        borderBottomRightRadius: Constants.styles.borderRadius.SMALL,
        width: '100%',
        maxWidth: Constants.styles.maxWidth.messageBubble as any,
        alignSelf: 'stretch',
    },
    messageWrapper: {
        alignItems: 'stretch',
        width: '100%',
    },
    messageInfo: {
        marginTop: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})