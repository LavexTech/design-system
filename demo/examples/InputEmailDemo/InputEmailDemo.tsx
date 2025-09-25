import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { InputEmail } from "@src/components/InputEmail/InputEmail";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Info } from "@src/components/Info/Info";

export const InputEmailDemo: React.FC = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [email4, setEmail4] = useState("");

  return (
    <ScrollView style={styles.container}>
      <MainTitle text="InputEmail Demo" />

      <View style={styles.section}>
        <Subtitle text="Uso Básico" />
        <Info text="Exemplo básico com valores padrão" />
        <InputEmail value={email1} onChange={setEmail1} />
      </View>

      <View style={styles.section}>
        <Subtitle text="Com Label Customizada" />
        <Info text="Exemplo com label personalizada" />
        <InputEmail
          value={email2}
          onChange={setEmail2}
          label="Endereço de Email"
        />
      </View>

      <View style={styles.section}>
        <Subtitle text="Com Mensagem de Erro Customizada" />
        <Info text="Exemplo com mensagem de erro personalizada" />
        <InputEmail
          value={email4}
          onChange={setEmail4}
          errorMessage="Email deve ser válido e conter @ e ."
        />
      </View>

      <View style={styles.section}>
        <Subtitle text="Com Placeholder Customizado" />
        <Info text="Exemplo com placeholder personalizado" />
        <InputEmail
          value={email3}
          onChange={setEmail3}
          placeholder="seu@email.com"
        />
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
