import React from "react"
import { View, StyleSheet } from "react-native"
import { TextBox } from "../Text/Text"
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar"
import { Grid, GridItem } from "../Grid/Grid"
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
            <Grid columns={12} gap={0}>
                <GridItem colSpan={2}>
                    <View style={styles.avatarContainer}>
                        <ProfileAvatar
                            profileImage={avatarUrl}
                            alt={`${senderName} avatar`}
                            size="xs"
                        />
                    </View>
                </GridItem>
                <GridItem colSpan={9}>
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
                <GridItem colSpan={1}>
                    <View />
                </GridItem>
            </Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: Constants.styles.spacing.TINY,
        width: '100%',
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.styles.spacing.LARGE,
    },
    messageWrapper: {
        alignItems: 'flex-start',
        width: '100%',
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
        maxWidth: '100%',
        alignSelf: 'flex-start',
    },
    messageInfo: {
        marginTop: Constants.styles.spacing.TINY,
        paddingHorizontal: Constants.styles.spacing.TINY,
    },
})
