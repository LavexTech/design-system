import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { TextBox } from "../Text/Text";
import Constants from "../../constants/constants";

export interface MessageProps {
    text: string;
    onClick?: () => void;
    isOwn?: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, onClick, isOwn = false }) => {
    return (
        <TouchableOpacity
            style={[
                styles.messageContainer,
                isOwn ? styles.ownMessage : styles.otherMessage
            ]}
            onPress={onClick}
            activeOpacity={onClick ? 0.7 : 1}
        >
            {isOwn ? (
                <Text style={styles.ownMessageText}>{text}</Text>
            ) : (
                <TextBox text={text} />
            )}
        </TouchableOpacity>
    );
};

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
        backgroundColor: "#007AFF",
        alignSelf: "flex-end",
        borderColor: "#007AFF",
    },
    ownMessageText: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontWeight: Constants.styles.fontWeight.NORMAL,
        lineHeight: Constants.styles.fontSize.MEDIUM,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: "#FFFFFF",
        textAlign: "left",
        flexWrap: "wrap",
        flexShrink: 1,
    },
});
