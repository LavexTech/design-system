# Como utilizar - Input

O componente `Input` é uma caixa de texto editável genérica que oferece funcionalidades de máscara, validação, teclado específico para mobile e mensagens de erro personalizáveis. Ele serve como base para criar inputs especializados conforme necessário.

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

### Input Básico

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const BasicInput = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Campo de Texto"
      value={value}
      placeholder="Digite qualquer texto"
      onChange={setValue}
    />
  );
};
```

### Input com Validação

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const ValidatedInput = () => {
  const [value, setValue] = useState("");

  const validateMinLength = (value: string): boolean => {
    return value.length >= 3;
  };

  return (
    <Input
      label="Campo com Validação"
      value={value}
      placeholder="Mínimo 3 caracteres"
      onChange={setValue}
      validation={validateMinLength}
      errorMessage="Deve ter pelo menos 3 caracteres"
    />
  );
};
```

### Input Numérico

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const NumericInput = () => {
  const [value, setValue] = useState("");

  const validateNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  return (
    <Input
      label="Campo Numérico"
      value={value}
      placeholder="Digite apenas números"
      onChange={setValue}
      validation={validateNumeric}
      errorMessage="Digite apenas números"
      mobileKeyboard="number"
    />
  );
};
```

### Input com Máscara

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const MaskedInput = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Campo com Máscara"
      value={value}
      placeholder="000-000-000"
      onChange={setValue}
      mask="000-000-000"
      mobileKeyboard="number"
    />
  );
};
```

### Input com Teclado Específico

```tsx
import React, { useState } from "react";
import { Input } from "lavex-design-system";

const EmailKeyboardInput = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Campo com Teclado de Email"
      value={value}
      placeholder="Exemplo de teclado de email"
      onChange={setValue}
      mobileKeyboard="email"
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

### Formulário Simples

```tsx
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Title2 } from "lavex-design-system";

const SimpleForm = () => {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");

  const validateMinLength = (value: string): boolean => {
    return value.length >= 2;
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title2 text="Formulário Simples" />

      <Input
        label="Campo 1"
        value={field1}
        placeholder="Digite o valor do campo 1"
        onChange={setField1}
        validation={validateMinLength}
        errorMessage="Deve ter pelo menos 2 caracteres"
      />

      <Input
        label="Campo 2"
        value={field2}
        placeholder="Digite o valor do campo 2"
        onChange={setField2}
        mobileKeyboard="email"
      />

      <Input
        label="Campo 3"
        value={field3}
        placeholder="Digite o valor do campo 3"
        onChange={setField3}
        mask="000-000-000"
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
      <Title3 text="Buscar" />
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

### Formulário com Validações

```tsx
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Title2 } from "lavex-design-system";

const ValidatedForm = () => {
  const [textField, setTextField] = useState("");
  const [numericField, setNumericField] = useState("");
  const [maskedField, setMaskedField] = useState("");

  const validateText = (value: string): boolean => {
    return value.length >= 3;
  };

  const validateNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title2 text="Formulário com Validações" />

      <Input
        label="Campo de Texto"
        value={textField}
        placeholder="Mínimo 3 caracteres"
        onChange={setTextField}
        validation={validateText}
        errorMessage="Deve ter pelo menos 3 caracteres"
      />

      <Input
        label="Campo Numérico"
        value={numericField}
        placeholder="Apenas números"
        onChange={setNumericField}
        validation={validateNumeric}
        errorMessage="Digite apenas números"
        mobileKeyboard="number"
      />

      <Input
        label="Campo com Máscara"
        value={maskedField}
        placeholder="000-000-000"
        onChange={setMaskedField}
        mask="000-000-000"
        mobileKeyboard="number"
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

const CompleteFormExample = () => {
  const [textField, setTextField] = useState("");
  const [numericField, setNumericField] = useState("");
  const [maskedField, setMaskedField] = useState("");
  const [emailField, setEmailField] = useState("");

  // Funções de validação genéricas
  const validateMinLength =
    (minLength: number) =>
    (value: string): boolean => {
      return value.length >= minLength;
    };

  const validateNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSave = () => {
    // Validação geral antes de salvar
    const isFormValid =
      validateMinLength(3)(textField) &&
      validateNumeric(numericField) &&
      validateEmail(emailField);

    if (isFormValid) {
      Alert.alert("Sucesso", "Dados salvos com sucesso!");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={{ padding: 20 }}>
        <Title1 text="Formulário Completo" />

        <View style={{ marginTop: 20 }}>
          <Title2 text="Campos de Entrada" />

          <Input
            label="Campo de Texto"
            value={textField}
            placeholder="Digite pelo menos 3 caracteres"
            onChange={setTextField}
            validation={validateMinLength(3)}
            errorMessage="Deve ter pelo menos 3 caracteres"
          />

          <Input
            label="Campo Numérico"
            value={numericField}
            placeholder="Digite apenas números"
            onChange={setNumericField}
            validation={validateNumeric}
            errorMessage="Digite apenas números"
            mobileKeyboard="number"
          />

          <Input
            label="Campo com Máscara"
            value={maskedField}
            placeholder="000-000-000"
            onChange={setMaskedField}
            mask="000-000-000"
            mobileKeyboard="number"
          />

          <Input
            label="Campo de Email"
            value={emailField}
            placeholder="exemplo@email.com"
            onChange={setEmailField}
            validation={validateEmail}
            errorMessage="Digite um email válido"
            mobileKeyboard="email"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CompleteFormExample;
```

## Criando Inputs Especializados

O componente `Input` genérico pode ser usado como base para criar inputs especializados. Aqui estão alguns exemplos de como criar componentes específicos:

### Input de Email Especializado

```tsx
import React, { useState } from "react";
import { Input, InputProps } from "lavex-design-system";

interface EmailInputProps
  extends Omit<InputProps, "validation" | "errorMessage" | "mobileKeyboard"> {
  required?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  required = false,
  ...props
}) => {
  const validateEmail = (value: string): boolean => {
    if (required && !value) return false;
    if (!value) return true; // Campo opcional vazio é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <Input
      {...props}
      validation={validateEmail}
      errorMessage={required ? "Email é obrigatório" : "Digite um email válido"}
      mobileKeyboard="email"
    />
  );
};
```

### Input de CPF Especializado

```tsx
import React, { useState } from "react";
import { Input, InputProps } from "lavex-design-system";

interface CpfInputProps
  extends Omit<
    InputProps,
    "validation" | "errorMessage" | "mobileKeyboard" | "mask"
  > {
  required?: boolean;
}

export const CpfInput: React.FC<CpfInputProps> = ({
  required = false,
  ...props
}) => {
  const validateCpf = (value: string): boolean => {
    if (required && !value) return false;
    if (!value) return true; // Campo opcional vazio é válido
    const cleanCpf = value.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  return (
    <Input
      {...props}
      validation={validateCpf}
      errorMessage={
        required ? "CPF é obrigatório" : "Digite um CPF válido (11 dígitos)"
      }
      mask="000.000.000-00"
      mobileKeyboard="number"
    />
  );
};
```

### Input de Telefone Especializado

```tsx
import React, { useState } from "react";
import { Input, InputProps } from "lavex-design-system";

interface PhoneInputProps
  extends Omit<
    InputProps,
    "validation" | "errorMessage" | "mobileKeyboard" | "mask"
  > {
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  required = false,
  ...props
}) => {
  const validatePhone = (value: string): boolean => {
    if (required && !value) return false;
    if (!value) return true; // Campo opcional vazio é válido
    const cleanPhone = value.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  return (
    <Input
      {...props}
      validation={validatePhone}
      errorMessage={
        required
          ? "Telefone é obrigatório"
          : "Digite um telefone válido (10 ou 11 dígitos)"
      }
      mask="(00) 00000-0000"
      mobileKeyboard="phone"
    />
  );
};
```

### Uso dos Inputs Especializados

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { EmailInput, CpfInput, PhoneInput } from "./specialized-inputs";

const SpecializedForm = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <EmailInput
        label="Email"
        value={email}
        placeholder="seu@email.com"
        onChange={setEmail}
        required={true}
      />

      <CpfInput
        label="CPF"
        value={cpf}
        placeholder="000.000.000-00"
        onChange={setCpf}
        required={true}
      />

      <PhoneInput
        label="Telefone"
        value={phone}
        placeholder="(11) 99999-9999"
        onChange={setPhone}
        required={false}
      />
    </View>
  );
};
```
