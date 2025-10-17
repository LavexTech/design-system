import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { TextBox } from "../Text/Text"
import Constants from "../../constants/constants"

type MessageProps = {
    text: string,
    onClick?: () => void,
    isOwn?: boolean,
}

export const Message = ({ text, onClick, isOwn = false }: MessageProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.messageContainer,
                isOwn ? styles.ownMessage : styles.otherMessage
            ]}
            onPress={onClick}
            activeOpacity={onClick ? 0.7 : 1}
        >
            <TextBox text={text} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
        marginVertical: Constants.styles.spacing.TINY,
        maxWidth: "80%",
        borderWidth: Constants.styles.borderWidth.THIN,
    },
    otherMessage: {
        backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY,
        alignSelf: "flex-start",
        borderColor: Constants.styles.borderColor.LIGHT,
    },
    ownMessage: {
        backgroundColor: "#d7e7fa",
        alignSelf: "flex-end",
        borderColor: Constants.styles.borderColor.LIGHT,
    },
});
