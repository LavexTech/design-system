import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { InputPassword } from "@src/components/InputPassword/InputPassword";

export const InputPasswordDemo: React.FC = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [password3, setPassword3] = useState("");

    const validateMinLength = (minLength: number) => (value: string): boolean => {
        return value.length >= minLength;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>InputPassword Component Demo</Text>

                <Text style={styles.sectionTitle}>1. InputPassword Básico</Text>
                <InputPassword
                    label="Senha"
                    value={password1}
                    placeholder="Digite sua senha"
                    onChange={setPassword1}
                />

                <Text style={styles.sectionTitle}>2. InputPassword com Validação Externa</Text>
                <InputPassword
                    label="Senha Mínima"
                    value={password3}
                    placeholder="Mínimo 6 caracteres"
                    onChange={setPassword3}
                    validation={validateMinLength(6)}
                    errorMessage="A senha deve ter pelo menos 6 caracteres"
                />

                <Text style={styles.sectionTitle}>3. InputPassword sem Toggle</Text>
                <InputPassword
                    label="Senha Confidencial"
                    value={password2}
                    placeholder="Digite sua senha"
                    onChange={setPassword2}
                    showPasswordToggle={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    content: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#262627",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
        color: "#262627",
    },
});
