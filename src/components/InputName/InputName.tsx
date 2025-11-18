import React from "react"
import { Input } from "../Input/Input"

type InputNameProps = {
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

export const InputName: React.FC<InputNameProps> = ({
    label,
    value,
    placeholder = "Nome Sobrenome",
    onChange,
}) => {
    const formatName = (inputValue: string): string => {
        // Lista de preposições e artigos que devem permanecer em minúsculo,
        // incluindo contrações comuns.
        const excecoes = ["de", "di", "do", "da", "dos", "das", "del"]

        // Converte o nome inteiro para minúsculo para garantir consistência inicial
        let nomeCompleto = inputValue.toLowerCase()

        // Expressão regular para encontrar palavras (sequências de letras/apóstrofo)
        // A flag /g garante que todas as ocorrências sejam substituídas
        const nomeCapitalizado = nomeCompleto.replace(/\b([a-zA-Z']+)\b/g, (match, palavra) => {
            // Verifica se a palavra está na lista de exceções
            if (excecoes.includes(palavra)) {
                return palavra // Mantém minúscula
            } else if (palavra.includes("'") && palavra.length > 1) {
                // Lida com casos como "d'Avila" ou "O'Malley"
                // Capitaliza a primeira letra e o que vem depois do apóstrofo, se necessário
                const partes = palavra.split("'")
                return partes[0].toLowerCase() + "'" + partes[1].charAt(0).toUpperCase() + partes[1].slice(1)
            } else {
                // Capitaliza a primeira letra da palavra normal
                return palavra.charAt(0).toUpperCase() + palavra.slice(1)
            }
        })

        return nomeCapitalizado
    }

    const handleChange = (newValue: string) => {
        onChange(newValue)
    }

    const handleBlur = () => {
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
        />
    )
}
