import React, { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "../../constants/constants";

export interface InputPasswordProps {
    label: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    showPasswordToggle?: boolean;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
    label,
    value,
    placeholder = "Digite sua senha",
    onChange,
    showPasswordToggle = true,
    validation,
    errorMessage,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleTextChange = (text: string) => {
        onChange(text);

        if (validation) {
            const valid = validation(text);
            setIsValid(valid);
        }
    };

    useEffect(() => {
        if (validation && value) {
            const valid = validation(value);
            setIsValid(valid);
        }
    }, [value, validation]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputContainer,
                !isValid && styles.inputContainerError
            ]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleTextChange}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor={Constants.styles.textColor.INFO}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {showPasswordToggle && (
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={togglePasswordVisibility}
                    >
                        <Text style={styles.toggleText}>
                            {isPasswordVisible ? "Ocultar" : "Mostrar"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {!isValid && errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
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
        marginBottom: Constants.styles.spacing.TINY,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: Constants.styles.borderWidth.REGULAR,
        borderColor: Constants.styles.borderColor.MEDIUM,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        backgroundColor: Constants.styles.backgroundColor.WHITE,
    },
    inputContainerError: {
        borderColor: Constants.styles.textColor.DANGER,
    },
    input: {
        flex: 1,
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.MEDIUM,
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.DEFAULT,
    },
    toggleButton: {
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.MEDIUM,
    },
    toggleText: {
        fontSize: Constants.styles.fontSize.SMALL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.PRIMARY,
        fontWeight: Constants.styles.fontWeight.MEDIUM,
    },
    errorText: {
        fontSize: Constants.styles.fontSize.SMALL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.DANGER,
        marginTop: Constants.styles.spacing.TINY,
    },
});
