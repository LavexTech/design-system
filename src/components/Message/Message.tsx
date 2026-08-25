import React from "react"
import { TouchableOpacity } from "react-native"
import { MessageSent } from "./MessageSent"
import { MessageReceived } from "./MessageReceived"
import Constants from "../../constants/constants"

type MessageProps = {
    text: string
    onClick?: () => void
    isOwn?: boolean
    timestamp?: string
    senderName?: string
    avatarUrl?: string
    userType?: 'client' | 'provider' | 'support'
    /** When false, keeps avatar column empty (consecutive messages). Default true. */
    showAvatar?: boolean
    /** Hide sender name on received consecutive messages. Default true. */
    showSenderName?: boolean
    /** Tighter vertical spacing for consecutive same-sender messages. */
    isGrouped?: boolean
    /** Use headset icon instead of profile image (support sender). */
    avatarVariant?: 'image' | 'headset'
}

export const Message: React.FC<MessageProps> = ({ 
    text, 
    onClick, 
    isOwn = false, 
    timestamp,
    senderName,
    avatarUrl,
    userType = 'client',
    showAvatar = true,
    showSenderName = true,
    isGrouped = false,
    avatarVariant = 'image',
}: MessageProps) => {
    const messageComponent = isOwn ? (
        <MessageSent 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
            userType={userType}
            showAvatar={showAvatar}
            isGrouped={isGrouped}
            avatarVariant={avatarVariant}
        />
    ) : (
        <MessageReceived 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
            userType={userType}
            showAvatar={showAvatar}
            showSenderName={showSenderName}
            isGrouped={isGrouped}
            avatarVariant={avatarVariant}
        />
    )

    if (onClick) {
        return (
            <TouchableOpacity
                onPress={onClick}
                activeOpacity={Constants.styles.opacity.MEDIUM}
            >
                {messageComponent}
            </TouchableOpacity>
        )
    }

    return messageComponent
}
