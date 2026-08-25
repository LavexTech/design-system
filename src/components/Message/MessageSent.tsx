import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { TextBox } from "../Text/Text"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
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
            <View style={styles.row}>
                <View style={styles.bubbleColumn}>
                    <View style={styles.messageBubble}>
                        <Text style={styles.bubbleText}>{text}</Text>
                    </View>
                    <View style={styles.messageInfo}>
                        <TextBox text={timestamp} size="small" level="default" />
                    </View>
                </View>
                <View style={styles.avatarContainer}>
                    <ProfileAvatar
                        profileImage={avatarUrl}
                        alt={`${senderName} avatar`}
                        size="xs"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: Constants.styles.spacing.TINY,
        width: '100%',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    bubbleColumn: {
        maxWidth: '75%',
        flexShrink: 1,
        alignItems: 'flex-end',
        marginRight: Constants.styles.spacing.SMALL,
    },
    messageBubble: {
        backgroundColor: Constants.styles.color.SOFT_BLUE,
        borderRadius: Constants.styles.borderRadius.LARGE,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        borderBottomRightRadius: Constants.styles.borderRadius.SMALL,
        alignSelf: 'flex-end',
        maxWidth: '100%',
    },
    bubbleText: {
        fontWeight: Constants.styles.fontWeight.NORMAL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        fontSize: Constants.styles.fontSize.MEDIUM,
        lineHeight: Constants.styles.lineHeight.LARGE,
        color: Constants.styles.theme.light.text.default,
        flexShrink: 1,
    },
    messageInfo: {
        marginTop: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
        alignSelf: 'flex-end',
    },
    avatarContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexShrink: 0,
    },
})
