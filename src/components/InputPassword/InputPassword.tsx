import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../Input/Input";
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
    errorMessage,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    
    const validatePassword = (password: string) => {
        if (password.length < 8) return false;
        if (!/[A-Z]/.test(password)) return false;  
        if (!/[a-z]/.test(password)) return false;
        if (!/[0-9]/.test(password)) return false;
        
        return true;
    }

    const rightElement = showPasswordToggle ? (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
        >
            <Ionicons 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={24} 
                color={Constants.styles.textColor.DEFAULT}
            />
        </TouchableOpacity>
    ) : undefined;

    return (
        <Input
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            validation={validatePassword}
            errorMessage={errorMessage}
            secureTextEntry={!isPasswordVisible}
            rightElement={rightElement}
        />
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
    },
});
