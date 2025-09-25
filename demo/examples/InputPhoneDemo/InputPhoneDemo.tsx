import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { InputPhone } from "@src/components/InputPhone/InputPhone";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Info } from "@src/components/Info/Info";

export const InputPhoneDemo: React.FC = () => {
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [phone4, setPhone4] = useState("");
    const [phone5, setPhone5] = useState("");

    return (
        <ScrollView style={styles.container}>
            <MainTitle text="InputPhone Demo" />

            <View style={styles.section}>
                <Subtitle text="Uso Básico" />
                <Info text="Exemplo básico com valores padrão" />
                <InputPhone value={phone1} onChange={setPhone1} />
            </View>

            <View style={styles.section}>
                <Subtitle text="Com Label Customizada" />
                <Info text="Exemplo com label personalizada" />
                <InputPhone
                    value={phone2}
                    onChange={setPhone2}
                    label="Número do Celular"
                />
            </View>

            <View style={styles.section}>
                <Subtitle text="Com Placeholder Customizado" />
                <Info text="Exemplo com placeholder personalizado" />
                <InputPhone
                    value={phone3}
                    onChange={setPhone3}
                    placeholder="(11) 99999-9999"
                />
            </View>

            <View style={styles.section}>
                <Subtitle text="Com Mensagem de Erro Customizada" />
                <Info text="Exemplo com mensagem de erro personalizada" />
                <InputPhone
                    value={phone4}
                    onChange={setPhone4}
                    errorMessage="Por favor, insira um telefone válido"
                />
            </View>

            <View style={styles.section}>
                <Subtitle text="Exemplos de Telefones Válidos" />
                <Info text="(11) 99999-9999 - Celular com DDD 11" />
                <Info text="(21) 98765-4321 - Celular com DDD 21" />
                <Info text="(11) 3333-4444 - Telefone fixo" />
                <Info text="(85) 3232-1234 - Telefone fixo com DDD 85" />
            </View>

            <View style={styles.section}>
                <Subtitle text="Exemplos de Telefones Inválidos" />
                <Info text="(11) 333-444 - Muito curto (menos de 10 dígitos)" />
                <Info text="(11) 12345 - Incompleto (menos de 10 dígitos)" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    section: {
        marginBottom: 30,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
