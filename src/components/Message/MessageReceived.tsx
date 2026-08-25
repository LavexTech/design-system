import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { TextBox } from "../Text/Text"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import Constants from "../../constants/constants"

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
}: MessageReceivedProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.avatarContainer}>
                    <ProfileAvatar
                        profileImage={avatarUrl}
                        alt={`${senderName} avatar`}
                        size="xs"
                    />
                </View>
                <View style={styles.bubbleColumn}>
                    <View style={styles.senderInfo}>
                        <TextBox text={senderName} size="small" level="default" />
                    </View>
                    <View style={styles.messageBubble}>
                        <Text style={styles.bubbleText}>{text}</Text>
                    </View>
                    <View style={styles.messageInfo}>
                        <TextBox text={timestamp} size="small" level="default" />
                    </View>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    avatarContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.styles.spacing.LARGE,
        marginRight: Constants.styles.spacing.SMALL,
        flexShrink: 0,
    },
    bubbleColumn: {
        maxWidth: '75%',
        flexShrink: 1,
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
        alignSelf: 'flex-start',
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
    },
})
