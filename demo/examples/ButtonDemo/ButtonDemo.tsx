import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button } from "@src/components/Button/Button";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Info } from "@src/components/Info/Info";

export const ButtonDemo: React.FC = () => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClicked, setLastClicked] = useState("");

    const handleButtonClick = (variant: string) => {
        setClickCount(prev => prev + 1);
        setLastClicked(variant);

        Alert.alert(
            "Botão Clicado!",
            `Você clicou no botão ${variant}. Total de cliques: ${clickCount + 1}`,
            [{ text: "OK" }]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <MainTitle text="Button Demo" />

            <View style={styles.section}>
                <Subtitle text="Variantes Básicas" />
                <Info text="Botões com diferentes estilos e cores" />

                <View style={styles.buttonRow}>
                    <Button
                        text="Default"
                        variant="default"
                        onClick={() => handleButtonClick("Default")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Success"
                        variant="success"
                        onClick={() => handleButtonClick("Success")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Danger"
                        variant="danger"
                        onClick={() => handleButtonClick("Danger")}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Subtitle text="Variantes Outline" />
                <Info text="Botões com borda e fundo transparente" />

                <View style={styles.buttonRow}>
                    <Button
                        text="Default Outline"
                        variant="default-outline"
                        onClick={() => handleButtonClick("Default Outline")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Success Outline"
                        variant="success-outline"
                        onClick={() => handleButtonClick("Success Outline")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Danger Outline"
                        variant="danger-outline"
                        onClick={() => handleButtonClick("Danger Outline")}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Subtitle text="Exemplos de Uso Prático" />
                <Info text="Simulação de ações comuns em aplicativos" />

                <View style={styles.buttonRow}>
                    <Button
                        text="Salvar"
                        variant="success"
                        onClick={() => handleButtonClick("Salvar")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Cancelar"
                        variant="default-outline"
                        onClick={() => handleButtonClick("Cancelar")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Excluir"
                        variant="danger"
                        onClick={() => handleButtonClick("Excluir")}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <Button
                        text="Confirmar"
                        variant="success-outline"
                        onClick={() => handleButtonClick("Confirmar")}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Subtitle text="Botões em Linha" />
                <Info text="Exemplo de botões lado a lado" />

                <View style={styles.buttonRowHorizontal}>
                    <View style={styles.buttonHalf}>
                        <Button
                            text="Ação 1"
                            variant="default"
                            onClick={() => handleButtonClick("Ação 1")}
                        />
                    </View>
                    <View style={styles.buttonHalf}>
                        <Button
                            text="Ação 2"
                            variant="success-outline"
                            onClick={() => handleButtonClick("Ação 2")}
                        />
                    </View>
                </View>

                <View style={styles.buttonRowHorizontal}>
                    <View style={styles.buttonHalf}>
                        <Button
                            text="Sim"
                            variant="success"
                            onClick={() => handleButtonClick("Sim")}
                        />
                    </View>
                    <View style={styles.buttonHalf}>
                        <Button
                            text="Não"
                            variant="danger-outline"
                            onClick={() => handleButtonClick("Não")}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Subtitle text="Estados dos Botões" />
                <Info text={`Total de cliques: ${clickCount}`} />
                <Info text={`Último botão clicado: ${lastClicked || "Nenhum"}`} />

                <View style={styles.buttonRow}>
                    <Button
                        text="Reset Contador"
                        variant="default-outline"
                        onClick={() => {
                            setClickCount(0);
                            setLastClicked("");
                        }}
                    />
                </View>
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
    buttonRow: {
        marginBottom: 12,
    },
    buttonRowHorizontal: {
        flexDirection: "row",
        marginBottom: 12,
        gap: 12,
    },
    buttonHalf: {
        flex: 1,
    },
});
