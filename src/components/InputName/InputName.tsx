import React from "react";
import { Input } from "../Input/Input";

export interface InputNameProps {
    label: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

export const InputName: React.FC<InputNameProps> = ({
    label,
    value,
    placeholder = "Nome Sobrenome",
    onChange,
    validation,
    errorMessage,
}) => {
    const formatName = (inputValue: string): string => {
        const words = inputValue.split(' ');

        return words.map(word => {
            if (word.length === 0) return word;
            if (word.length < 3) return word.toLowerCase();

            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };

    const handleChange = (newValue: string) => {
        onChange(newValue);
    };

    const handleBlur = () => {
        const formattedValue = formatName(value);
        onChange(formattedValue);
    };

    const handleEndEditing = () => {
        const formattedValue = formatName(value);
        onChange(formattedValue);
    };

    return (
        <Input
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            mobileKeyboard="text"
            validation={validation}
            errorMessage={errorMessage}
            onBlur={handleBlur}
            onEndEditing={handleEndEditing}
        />
    );
};
