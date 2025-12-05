import React, { useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { IconEye } from "../Icons/IconEye"
import { IconEyeClosed } from "../Icons/IconEyeClosed"
import { Input } from "../Input/Input"
import Constants from "../../constants/constants"

type InputPasswordProps = {
    label: string,
    value: string,
    placeholder?: string,
    onChange: (value: string) => void;
    showPasswordToggle?: boolean,
    validation?: (value: string) => boolean,
    errorMessage?: string,
    minLength?: number,
}

export const InputPassword: React.FC<InputPasswordProps> = ({
    label,
    value,
    placeholder = "Digite sua senha",
    onChange,
    showPasswordToggle = true,
    errorMessage,
    minLength,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    };
    
    const validatePassword = (password: string) => {
        if (minLength !== undefined && password.length < minLength) return false
        if (!/[A-Z]/.test(password)) return false
        if (!/[a-z]/.test(password)) return false
        if (!/[0-9]/.test(password)) return false
        
        return true
    }

    const getErrorMessage = (): string => {
        if (errorMessage) return errorMessage
        
        if (minLength !== undefined && value.length < minLength) {
            return `A senha deve ter pelo menos ${minLength} caracteres`
        }
        if (value && !/[A-Z]/.test(value)) {
            return "A senha deve conter pelo menos uma letra maiúscula"
        }
        if (value && !/[a-z]/.test(value)) {
            return "A senha deve conter pelo menos uma letra minúscula"
        }
        if (value && !/[0-9]/.test(value)) {
            return "A senha deve conter pelo menos um número"
        }
        
        return ""
    }

    const rightElement = showPasswordToggle ? (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
        >
            {isPasswordVisible ? (
                <IconEye />
            ) : (
                <IconEyeClosed />
            )}
        </TouchableOpacity>
    ) : undefined

    return (
        <Input
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            validation={validatePassword}
            errorMessage={getErrorMessage()}
            secureTextEntry={!isPasswordVisible}
            rightElement={rightElement}
        />
    )
}

const styles = StyleSheet.create({
    toggleButton: {
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.SMALL,
    },
})
