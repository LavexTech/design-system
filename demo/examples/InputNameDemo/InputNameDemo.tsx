import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { InputName } from "@src/components/InputName/InputName";

export const InputNameDemo: React.FC = () => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");

    const validateMinLength = (value: string): boolean => {
        return value.trim().length >= 3;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>InputName Component Demo</Text>

                <Text style={styles.sectionTitle}>1. InputName Básico</Text>
                <InputName
                    label="Nome Completo"
                    value={name1}
                    placeholder="Nome Sobrenome"
                    onChange={setName1}
                />

                <Text style={styles.sectionTitle}>2. InputName com Validação Externa</Text>
                <InputName
                    label="Nome Completo"
                    value={name2}
                    placeholder="Nome Sobrenome"
                    onChange={setName2}
                    validation={validateMinLength}
                    errorMessage="Digite pelo menos 3 caracteres"
                />

                <Text style={styles.sectionTitle}>3. InputName com Placeholder Customizado</Text>
                <InputName
                    label="Nome do Usuário"
                    value={name3}
                    placeholder="Digite seu nome completo"
                    onChange={setName3}
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
