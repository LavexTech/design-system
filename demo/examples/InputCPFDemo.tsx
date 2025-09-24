import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { InputCPF } from "@src/components/InputCPF/InputCPF";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Info } from "@src/components/Info/Info";

export const InputCPFDemo: React.FC = () => {
  const [cpf1, setCpf1] = useState("");
  const [cpf2, setCpf2] = useState("");
  const [cpf3, setCpf3] = useState("");
  const [cpf4, setCpf4] = useState("");
  const [cpf5, setCpf5] = useState("");

  // Função para determinar mensagem de erro inteligente
  const getErrorMessage = (cpf: string): string => {
    if (!cpf) return "CPF deve ter formato válido";

    const digits = cpf.replace(/\D/g, "");

    // Se não tem 11 dígitos, é erro de formato
    if (digits.length !== 11) {
      return "CPF deve ter formato válido";
    }

    // Se tem 11 dígitos mas é inválido, é erro de verificação
    return "CPF não passa na verificação";
  };

  return (
    <ScrollView style={styles.container}>
      <MainTitle text="InputCPF Demo" />

      <View style={styles.section}>
        <Subtitle text="Uso Básico" />
        <Info text="Exemplo básico com valores padrão" />
        <InputCPF value={cpf1} onChange={setCpf1} />
      </View>

      <View style={styles.section}>
        <Subtitle text="Com Mensagem de Erro Customizada" />
        <Info text="Exemplo com mensagem de erro personalizada" />
        <InputCPF
          value={cpf4}
          onChange={setCpf4}
          errorMessage="Por favor, insira um CPF válido"
        />
      </View>

      <View style={styles.section}>
        <Subtitle text="Mensagens de Erro Inteligentes" />
        <Info text="Digite um CPF incompleto (ex: 123) para ver 'CPF deve ter formato válido'" />
        <Info text="Digite um CPF completo mas inválido (ex: 111.111.111-11) para ver 'CPF não passa na verificação'" />
        <InputCPF
          value={cpf5}
          onChange={setCpf5}
          label="CPF com Validação Inteligente"
          errorMessage={getErrorMessage(cpf5)}
        />
      </View>

      <View style={styles.section}>
        <Subtitle text="Exemplos de CPFs Válidos" />
        <Info text="111.444.777-35" />
        <Info text="123.456.789-09" />
        <Info text="987.654.321-00" />
      </View>

      <View style={styles.section}>
        <Subtitle text="Exemplos de CPFs Inválidos" />
        <Info text="111.111.111-11 (todos os dígitos iguais)" />
        <Info text="123.456.789-00 (dígitos verificadores incorretos)" />
        <Info text="000.000.000-00 (sequência inválida)" />
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
