import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { IconHeadset } from "../Icons/IconHeadset"
import Constants from "../../constants/constants"

type MessageSentProps = {
    text: string
    timestamp?: string
    senderName?: string
    avatarUrl?: string
    userType?: 'client' | 'provider' | 'support'
    showAvatar?: boolean
    isGrouped?: boolean
    avatarVariant?: 'image' | 'headset'
}

export const MessageSent: React.FC<MessageSentProps> = ({ 
    text, 
    timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    senderName = "You",
    avatarUrl,
    showAvatar = true,
    isGrouped = false,
    avatarVariant = 'image',
}: MessageSentProps) => {
    return (
        <View style={[styles.container, isGrouped && styles.containerGrouped]}>
            <View style={styles.row}>
                {timestamp ? (
                    <Text style={styles.timestamp}>{timestamp}</Text>
                ) : null}
                <View style={styles.messageBubble}>
                    <Text style={styles.bubbleText}>{text}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    {showAvatar ? (
                        avatarVariant === 'headset' ? (
                            <View style={styles.headsetAvatar}>
                                <IconHeadset
                                    size={22}
                                    color={Constants.styles.textColor.INFO}
                                />
                            </View>
                        ) : (
                            <ProfileAvatar
                                profileImage={avatarUrl}
                                alt={`${senderName} avatar`}
                                size="xs"
                            />
                        )
                    ) : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.styles.spacing.SMALL,
        width: '100%',
    },
    containerGrouped: {
        marginTop: 2,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: Constants.styles.spacing.TINY,
    },
    messageBubble: {
        backgroundColor: Constants.styles.color.SOFT_BLUE,
        borderRadius: Constants.styles.borderRadius.LARGE,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        borderBottomRightRadius: Constants.styles.borderRadius.SMALL,
        flexShrink: 1,
        maxWidth: '75%',
    },
    bubbleText: {
        fontWeight: Constants.styles.fontWeight.NORMAL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        fontSize: Constants.styles.fontSize.MEDIUM,
        lineHeight: Constants.styles.lineHeight.LARGE,
        color: Constants.styles.theme.light.text.default,
        flexShrink: 1,
    },
    timestamp: {
        fontFamily: Constants.styles.fontFamily.REGULAR,
        fontSize: 12,
        lineHeight: 14,
        color: Constants.styles.textColor.INFO,
        flexShrink: 0,
        marginBottom: 2,
        marginRight: Constants.styles.spacing.TINY,
    },
    avatarContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexShrink: 0,
        minHeight: 32,
        marginLeft: Constants.styles.spacing.SMALL,
    },
    headsetAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Constants.styles.backgroundColor.GRAY,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
