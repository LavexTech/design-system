import React from "react"
import { Input } from "../Input/Input"

type InputNameProps = {
    label: string,
    value: string,
    placeholder?: string,
    onChange: (value: string) => void
}

export const InputName: React.FC<InputNameProps> = ({
    label,
    value,
    placeholder = "Nome Sobrenome",
    onChange,
}) => {
    const formatName = (inputValue: string): string => {
        const words = inputValue.split(' ')

        return words.map(word => {
            if (word.length === 0) return word
            if (word.length < 3) return word.toLowerCase()

            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }).join(' ')
    }

    const handleChange = (newValue: string) => {
        onChange(newValue)
    }

    const handleBlur = () => {
        const formattedValue = formatName(value)
        onChange(formattedValue)
    }

    const handleEndEditing = () => {
        const formattedValue = formatName(value)
        onChange(formattedValue)
    }

    const validateName = (inputValue: string): boolean => {
        const trimmedValue = inputValue.trim()
        if (trimmedValue.length === 0) return true 

        const words = trimmedValue.split(' ').filter(word => word.length > 0)
        return words.length >= 2;
    }

    const getErrorMessage = (): string => {
        return "Digite pelo menos nome e sobrenome"
    }

    return (
        <Input
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            mobileKeyboard="text"
            validation={validateName}
            errorMessage={getErrorMessage()}
            onBlur={handleBlur}
            onEndEditing={handleEndEditing}
        />
    )
}
