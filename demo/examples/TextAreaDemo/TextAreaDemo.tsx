import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextArea } from "@src/components/TextArea/TextArea";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { Info } from "@src/components/Info/Info";

export const TextAreaDemo: React.FC = () => {
    const [contactMessage, setContactMessage] = useState("");
    const [comment, setComment] = useState("");

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <MainTitle text="TextArea Component Demo" />

                <View style={styles.section}>
                    <Subtitle text="Uso Básico" />
                    <Info text="Exemplo simples de um TextArea" />
                    <TextArea
                        label="Mensagem simples"
                        value={contactMessage}
                        placeholder="Digite sua mensagem aqui..."
                        onChange={setContactMessage}
                    />
                </View>

                <View style={styles.section}>
                    <Title text="Com Contador de Caracteres" />
                    <Info text="Demonstração com limite de caracteres" />
                    <TextArea
                        label="Mensagem (máx. 200 caracteres)"
                        value={comment}
                        placeholder="Digite até 200 caracteres..."
                        onChange={setComment}
                    />
                    <Info text={`${comment.length}/200 caracteres`} />
                </View>

                <View style={styles.section}>
                    <Title text="Com Valor Pré-definido" />
                    <Info text="TextArea com texto inicial" />
                    <TextArea
                        label="Texto pré-definido"
                        value="Este é um exemplo de texto que já está preenchido no TextArea. Você pode editar este conteúdo conforme necessário."
                        placeholder="Digite aqui..."
                        onChange={() => { }}
                    />
                </View>
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
    },
    section: {
        marginBottom: 32,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 12,
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
