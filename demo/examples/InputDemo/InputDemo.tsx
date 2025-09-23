import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Input } from "@src/components/Input/Input";

export const InputDemo: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");

  // Validation functions
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    // Brazilian phone number validation (with or without mask)
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCpf = (value: string): boolean => {
    // Basic CPF validation (11 digits)
    const cleanCpf = value.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  const validateName = (value: string): boolean => {
    return value.length >= 2;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Input Component Demo</Text>

        <Input
          label="Nome"
          value={name}
          placeholder="Digite seu nome"
          onChange={setName}
          validation={validateName}
          errorMessage="Nome deve ter pelo menos 2 caracteres"
        />

        <Input
          label="Email"
          value={email}
          placeholder="Digite seu email"
          onChange={setEmail}
          validation={validateEmail}
          errorMessage="Digite um email válido"
          mobileKeyboard="email"
        />

        <Input
          label="Telefone"
          value={phone}
          placeholder="(11) 99999-9999"
          onChange={setPhone}
          validation={validatePhone}
          errorMessage="Digite um telefone válido (10 ou 11 dígitos)"
          mask="(00) 00000-0000"
          mobileKeyboard="phone"
        />

        <Input
          label="CPF"
          value={cpf}
          placeholder="000.000.000-00"
          onChange={setCpf}
          validation={validateCpf}
          errorMessage="Digite um CPF válido (11 dígitos)"
          mask="000.000.000-00"
          mobileKeyboard="number"
        />

        <Input
          label="Observações"
          value=""
          placeholder="Digite suas observações..."
          onChange={() => {}}
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
