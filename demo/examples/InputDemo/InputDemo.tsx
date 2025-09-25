import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Input } from "@src/components/Input/Input";

export const InputDemo: React.FC = () => {
  const [textInput, setTextInput] = useState("");
  const [numericInput, setNumericInput] = useState("");
  const [maskedInput, setMaskedInput] = useState("");
  const [validatedInput, setValidatedInput] = useState("");

  const validateMinLength =
    (minLength: number) =>
      (value: string): boolean => {
        return value.length >= minLength;
      };

  const validateNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Input Component Demo</Text>

        <Input
          label="Texto Simples"
          value={textInput}
          placeholder="Digite qualquer texto"
          onChange={setTextInput}
        />

        <Input
          label="Entrada Numérica"
          value={numericInput}
          placeholder="Digite apenas números"
          onChange={setNumericInput}
          validation={validateNumeric}
          errorMessage="Digite apenas números"
          mobileKeyboard="number"
        />

        <Input
          label="Entrada com Máscara"
          value={maskedInput}
          placeholder="000-000-000"
          onChange={setMaskedInput}
          mask="000-000-000"
          mobileKeyboard="number"
        />

        <Input
          label="Entrada com Validação"
          value={validatedInput}
          placeholder="Mínimo 5 caracteres"
          onChange={setValidatedInput}
          validation={validateMinLength(5)}
          errorMessage="Deve ter pelo menos 5 caracteres"
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
});
