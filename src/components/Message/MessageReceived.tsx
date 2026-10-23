import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { TextBox } from "../Text/Text"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { IconHeadset } from "../Icons/IconHeadset"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"

type MessageReceivedProps = {
    text: string
    timestamp?: string
    senderName?: string
    avatarUrl?: string
    userType?: 'client' | 'provider' | 'support'
    showAvatar?: boolean
    showSenderName?: boolean
    isGrouped?: boolean
    avatarVariant?: 'image' | 'headset'
}

export const MessageReceived: React.FC<MessageReceivedProps> = ({
    text,
    timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    senderName = "Contact",
    avatarUrl,
    showAvatar = true,
    showSenderName = true,
    isGrouped = false,
    avatarVariant = 'image',
}: MessageReceivedProps) => {
    const { colors } = useLavexTheme()
    return (
        <View style={[styles.container, isGrouped && styles.containerGrouped]}>
            <View style={styles.row}>
                <View style={styles.avatarContainer}>
                    {showAvatar ? (
                        avatarVariant === 'headset' ? (
                            <View style={[styles.headsetAvatar, { backgroundColor: colors.surfaceMuted }]}>
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
                <View style={styles.bubbleColumn}>
                    {showSenderName ? (
                        <View style={styles.senderInfo}>
                            <TextBox text={senderName} size="small" level="default" />
                        </View>
                    ) : null}
                    <View style={styles.bubbleRow}>
                        <View style={[styles.messageBubble, { backgroundColor: colors.surfaceMuted }]}>
                            <Text style={[styles.bubbleText, { color: colors.text }]}>{text}</Text>
                        </View>
                        {timestamp ? (
                            <Text style={styles.timestamp}>{timestamp}</Text>
                        ) : null}
                    </View>
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
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    avatarContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: Constants.styles.spacing.SMALL,
        flexShrink: 0,
        overflow: 'hidden',
    },
    headsetAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubbleColumn: {
        flexShrink: 1,
        flexGrow: 1,
        alignItems: 'flex-start',
        maxWidth: '100%',
    },
    senderInfo: {
        marginBottom: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
    bubbleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        maxWidth: '100%',
        gap: Constants.styles.spacing.TINY,
    },
    messageBubble: {
        borderRadius: 18,
        borderWidth: 0,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        borderBottomLeftRadius: 4,
        flexShrink: 1,
        maxWidth: '75%',
    },
    bubbleText: {
        fontWeight: Constants.styles.fontWeight.NORMAL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        fontSize: Constants.styles.fontSize.MEDIUM,
        lineHeight: Constants.styles.lineHeight.LARGE,
        flexShrink: 1,
    },
    timestamp: {
        fontFamily: Constants.styles.fontFamily.REGULAR,
        fontSize: 12,
        lineHeight: 14,
        color: Constants.styles.textColor.INFO,
        flexShrink: 0,
        marginBottom: 2,
    },
})
