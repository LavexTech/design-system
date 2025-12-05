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
    userType?: 'client' | 'provider'
}

export const Message: React.FC<MessageProps> = ({ 
    text, 
    onClick, 
    isOwn = false, 
    timestamp,
    senderName,
    avatarUrl,
    userType = 'client'
}: MessageProps) => {
    const messageComponent = isOwn ? (
        <MessageSent 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
            userType={userType}
        />
    ) : (
        <MessageReceived 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
            userType={userType}
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
