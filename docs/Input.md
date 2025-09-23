# Como utilizar - Input

O componente `Input` é uma caixa de texto editável que serve como base para outros inputs especializados como CPF, email, telefone, etc. Ele oferece funcionalidades de máscara, validação, teclado específico para mobile e mensagens de erro personalizáveis.

## Importação

```typescript
import { Input } from "lavex-design-system";
```

## Props

| Prop             | Tipo                                       | Obrigatório | Descrição                                                       |
| ---------------- | ------------------------------------------ | ----------- | --------------------------------------------------------------- |
| `label`          | `string`                                   | ✅          | O texto que aparece acima do campo de entrada                   |
| `value`          | `string`                                   | ✅          | O valor atual do input                                          |
| `placeholder`    | `string`                                   | ❌          | Texto de placeholder quando o campo está vazio                  |
| `onChange`       | `(value: string) => void`                  | ✅          | Função chamada quando o valor do input muda                     |
| `validation`     | `(value: string) => boolean`               | ❌          | Função de validação que retorna true/false                      |
| `errorMessage`   | `string`                                   | ❌          | Mensagem de erro personalizada exibida quando a validação falha |
| `mask`           | `string`                                   | ❌          | Padrão de máscara para formatação (use 0 ou 9 para dígitos)     |
| `mobileKeyboard` | `"text" \| "email" \| "phone" \| "number"` | ❌          | Tipo de teclado mobile (padrão: "text")                         |

## Uso Básico

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const MyComponent = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Nome"
      value={value}
      placeholder="Digite seu nome"
      onChange={setValue}
    />
  );
};
```

## Exemplos de Uso

### Input Simples com Validação

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const NameInput = () => {
  const [name, setName] = useState("");

  const validateName = (value: string): boolean => {
    return value.length >= 2;
  };

  return (
    <Input
      label="Nome Completo"
      value={name}
      placeholder="Digite seu nome completo"
      onChange={setName}
      validation={validateName}
      errorMessage="Nome deve ter pelo menos 2 caracteres"
    />
  );
};
```

### Input de Email

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const EmailInput = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <Input
      label="Email"
      value={email}
      placeholder="seu@email.com"
      onChange={setEmail}
      validation={validateEmail}
      errorMessage="Digite um email válido"
      mobileKeyboard="email"
    />
  );
};
```

### Input de Telefone com Máscara

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const PhoneInput = () => {
  const [phone, setPhone] = useState("");

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  return (
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
  );
};
```

### Input de CPF com Máscara

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const CpfInput = () => {
  const [cpf, setCpf] = useState("");

  const validateCpf = (value: string): boolean => {
    const cleanCpf = value.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  return (
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
  );
};
```

### Input Numérico

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const AgeInput = () => {
  const [age, setAge] = useState("");

  const validateAge = (value: string): boolean => {
    const num = parseInt(value);
    return num >= 18 && num <= 120;
  };

  return (
    <Input
      label="Idade"
      value={age}
      placeholder="Digite sua idade"
      onChange={setAge}
      validation={validateAge}
      errorMessage="Idade deve estar entre 18 e 120 anos"
      mobileKeyboard="number"
    />
  );
};
```

## Padrões de Máscara

O sistema de máscara usa `0` ou `9` para representar dígitos:

### Telefone

```tsx
mask = "(00) 00000-0000"; // (11) 99999-9999
```

### CPF

```tsx
mask = "000.000.000-00"; // 123.456.789-01
```

### CEP

```tsx
mask = "00000-000"; // 12345-678
```

### Data

```tsx
mask = "00/00/0000"; // 31/12/2023
```

### Hora

```tsx
mask = "00:00"; // 14:30
```

## Tipos de Teclado Mobile

### Texto (Padrão)

```tsx
mobileKeyboard = "text"; // Teclado padrão com letras
```

### Email

```tsx
mobileKeyboard = "email"; // Teclado com @ e .com
```

### Telefone

```tsx
mobileKeyboard = "phone"; // Teclado numérico com + e *
```

### Número

```tsx
mobileKeyboard = "number"; // Teclado apenas com números
```

## Boas Práticas

1. **Use labels descritivos**: Sempre forneça um label claro que explique o que o usuário deve inserir
2. **Placeholders úteis**: Use placeholders que mostrem o formato esperado
3. **Validação em tempo real**: Implemente validação para melhorar a experiência do usuário
4. **Mensagens de erro claras**: Forneça mensagens específicas sobre o que está incorreto
5. **Teclado apropriado**: Use o tipo de teclado correto para o tipo de dados
6. **Máscaras quando necessário**: Use máscaras para formatos específicos (CPF, telefone, etc.)
7. **Teste em dispositivos móveis**: Sempre teste a funcionalidade em dispositivos móveis

## Casos de Uso Comuns

### Formulário de Cadastro

```tsx
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Title2 } from "lavex-design-system";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCpf = (value: string): boolean => {
    const cleanCpf = value.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  const validateName = (value: string): boolean => {
    return value.length >= 2;
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title2 text="Cadastro" />

      <Input
        label="Nome Completo"
        value={name}
        placeholder="Digite seu nome completo"
        onChange={setName}
        validation={validateName}
        errorMessage="Nome deve ter pelo menos 2 caracteres"
      />

      <Input
        label="Email"
        value={email}
        placeholder="seu@email.com"
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
        errorMessage="Digite um telefone válido"
        mask="(00) 00000-0000"
        mobileKeyboard="phone"
      />

      <Input
        label="CPF"
        value={cpf}
        placeholder="000.000.000-00"
        onChange={setCpf}
        validation={validateCpf}
        errorMessage="Digite um CPF válido"
        mask="000.000.000-00"
        mobileKeyboard="number"
      />
    </ScrollView>
  );
};
```

### Formulário de Busca

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Input, Title3 } from "lavex-design-system";

const SearchForm = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={{ padding: 16 }}>
      <Title3 text="Buscar Produtos" />
      <Input
        label="Termo de Busca"
        value={search}
        placeholder="Digite o que você procura..."
        onChange={setSearch}
      />
    </View>
  );
};
```

### Formulário de Contato

```tsx
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Title2 } from "lavex-design-system";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateName = (value: string): boolean => {
    return value.length >= 2;
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title2 text="Entre em Contato" />

      <Input
        label="Seu Nome"
        value={name}
        placeholder="Digite seu nome"
        onChange={setName}
        validation={validateName}
        errorMessage="Nome deve ter pelo menos 2 caracteres"
      />

      <Input
        label="Email"
        value={email}
        placeholder="seu@email.com"
        onChange={setEmail}
        validation={validateEmail}
        errorMessage="Digite um email válido"
        mobileKeyboard="email"
      />

      <Input
        label="Mensagem"
        value={message}
        placeholder="Digite sua mensagem..."
        onChange={setMessage}
      />
    </ScrollView>
  );
};
```

## Exemplo Completo

```tsx
import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Input, Title1, Title2 } from "lavex-design-system";

const UserProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [age, setAge] = useState("");

  // Funções de validação
  const validateName = (value: string): boolean => {
    return value.length >= 2;
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateCpf = (value: string): boolean => {
    const cleanCpf = value.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  const validateAge = (value: string): boolean => {
    const num = parseInt(value);
    return num >= 18 && num <= 120;
  };

  const handleSave = () => {
    // Validação geral antes de salvar
    const isFormValid =
      validateName(name) &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validateCpf(cpf) &&
      validateAge(age);

    if (isFormValid) {
      Alert.alert("Sucesso", "Dados salvos com sucesso!");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={{ padding: 20 }}>
        <Title1 text="Meu Perfil" />

        <View style={{ marginTop: 20 }}>
          <Title2 text="Informações Pessoais" />

          <Input
            label="Nome Completo"
            value={name}
            placeholder="Digite seu nome completo"
            onChange={setName}
            validation={validateName}
            errorMessage="Nome deve ter pelo menos 2 caracteres"
          />

          <Input
            label="Email"
            value={email}
            placeholder="seu@email.com"
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
            label="Idade"
            value={age}
            placeholder="Digite sua idade"
            onChange={setAge}
            validation={validateAge}
            errorMessage="Idade deve estar entre 18 e 120 anos"
            mobileKeyboard="number"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfileForm;
```
