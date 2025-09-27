import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface TextAreaProps {
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    value,
    placeholder,
    onChange,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textArea}
                value={value}
                placeholder={placeholder}
                onChangeText={onChange}
                multiline={true}
                textAlignVertical="top"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Constants.styles.spacing.MEDIUM,
    },
    label: {
        fontSize: Constants.styles.fontSize.SMALL,
        fontWeight: Constants.styles.fontWeight.NORMAL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.DEFAULT,
        marginBottom: Constants.styles.spacing.SMALL,
    },
    textArea: {
        borderWidth: Constants.styles.borderWidth.REGULAR,
        borderColor: Constants.styles.borderColor.MEDIUM,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        padding: Constants.styles.spacing.MEDIUM,
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.DEFAULT,
        backgroundColor: Constants.styles.backgroundColor.WHITE,
        minHeight: 100,
        textAlignVertical: "top",
    },
});
