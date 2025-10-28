import React from "react"
import { TouchableOpacity } from "react-native"
import { MessageSent } from "./MessageSent"
import { MessageReceived } from "./MessageReceived"

export type MessageProps = {
    text: string
    onClick?: () => void
    isOwn?: boolean
    timestamp?: string
    senderName?: string
    avatarUrl?: string
}

export const Message: React.FC<MessageProps> = ({ 
    text, 
    onClick, 
    isOwn = false, 
    timestamp,
    senderName,
    avatarUrl
}: MessageProps) => {
    const messageComponent = isOwn ? (
        <MessageSent 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
        />
    ) : (
        <MessageReceived 
            text={text} 
            timestamp={timestamp}
            senderName={senderName}
            avatarUrl={avatarUrl}
        />
    )

    if (onClick) {
        return (
            <TouchableOpacity
                onPress={onClick}
                activeOpacity={0.7}
            >
                {messageComponent}
            </TouchableOpacity>
        )
    }

    return messageComponent
}
