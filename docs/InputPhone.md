# Como utilizar - InputPhone

O componente `InputPhone` é uma caixa de texto especializada para captura de números de telefone brasileiros. Ele oferece validação automática para celulares e telefones fixos, máscara de formatação e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputPhone } from "lavex-design-system";
// ou
import { InputPhone, type InputPhoneProps } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                     |
| -------------- | ---------- | ----------- | ------------------------------------------------------------- |
| `value`        | `string`   | ✅          | O valor atual do campo de telefone                            |
| `onChange`     | `function` | ✅          | Função chamada quando o valor muda                            |
| `label`        | `string`   | ❌          | Texto do rótulo (padrão: "Telefone")                          |
| `placeholder`  | `string`   | ❌          | Texto de placeholder (padrão: "(00) 00000-0000")              |
| `errorMessage` | `string`   | ❌          | Mensagem de erro (padrão: "Telefone deve ter formato válido") |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputPhone } from "lavex-design-system";

const MyComponent = () => {
  const [phone, setPhone] = useState("");

  return <InputPhone value={phone} onChange={setPhone} />;
};
```

## Exemplos de Uso

### Uso Padrão

```tsx
<InputPhone value={phone} onChange={setPhone} />
```

### Com Label Customizada

```tsx
<InputPhone value={phone} onChange={setPhone} label="Número do Celular" />
```

### Com Placeholder Customizado

```tsx
<InputPhone value={phone} onChange={setPhone} placeholder="(11) 99999-9999" />
```

### Com Mensagem de Erro Customizada

```tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  errorMessage="Por favor, insira um telefone válido"
/>
```

### Configuração Completa

```tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  label="Telefone de Contato"
  placeholder="(00) 00000-0000"
  errorMessage="Telefone deve ser válido e ter 10 ou 11 dígitos"
/>
```

## Validação

O componente inclui validação específica para telefones brasileiros que verifica:

- **Formato**: Aplica máscara dinâmica que se adapta ao número de dígitos
- **Dígitos**: Deve ter 10 dígitos (DDD + 8) ou 11 dígitos (DDD + 9)

### Regras de Validação

1. **Telefone Fixo (10 dígitos)**:

   - Formato: `(XX) XXXX-XXXX`
   - DDD (2) + 8 dígitos
   - Exemplo: `(41) 9856-2124`

2. **Celular (11 dígitos)**:
   - Formato: `(XX) XXXXX-XXXX`
   - DDD (2) + 9 dígitos
   - Exemplo: `(41) 98234-1234`

### Comportamento da Validação

- **Campo vazio**: Considerado válido (não obrigatório)
- **Telefone inválido**: Mostra mensagem de erro e borda vermelha
- **Telefone válido**: Remove mensagem de erro e borda normal

## Máscara Automática

O componente aplica automaticamente uma máscara dinâmica que se adapta ao número de dígitos:

### Exemplos:

- **Digitação**: `4198562124` → `(41) 9856-2124`
- **Digitação**: `41982341234` → `(41) 98234-1234`
- **Backspace**: Remove caracteres da direita para esquerda
- **Paste**: Formata automaticamente números colados

## Teclado Otimizado

O componente automaticamente configura o teclado numérico (`keyboardType="phone-pad"`), proporcionando:

- Acesso rápido aos números
- Melhor experiência de digitação
- Redução de erros de entrada

## Boas Práticas

1. **Use para captura de telefone**: Reserve este componente especificamente para campos de telefone
2. **Validação específica**: O componente já valida formatos brasileiros automaticamente
3. **Feedback visual**: Fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste com telefones válidos**: Use números de teste para desenvolvimento

## Casos de Uso Comuns

### Formulário de Cadastro

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputPhone } from "lavex-design-system";

const SignupForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Criar Conta" />
      <InputPhone value={phone} onChange={setPhone} label="Celular" />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Contato

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputPhone } from "lavex-design-system";

const ContactForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Entre em Contato" />
      <InputPhone
        value={phone}
        onChange={setPhone}
        label="Telefone"
        placeholder="(11) 99999-9999"
      />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Dados Pessoais

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputPhone } from "lavex-design-system";

const PersonalDataForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Dados Pessoais" />
      <InputPhone
        value={phone}
        onChange={setPhone}
        label="Telefone de Contato"
        errorMessage="Telefone é obrigatório para contato"
      />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

## Exemplo Completo

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title1, Title2, InputPhone, Info } from "lavex-design-system";

const PhoneFormScreen = () => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    // Lógica adicional se necessário
    console.log("Telefone atualizado:", value);
  };

  return (
    <View style={styles.container}>
      <Title1 text="Cadastro de Telefone" />

      <View style={styles.formSection}>
        <Title2 text="Informações de Contato" />
        <Info text="Digite seu telefone para completar o cadastro" />

        <InputPhone
          value={phone}
          onChange={handlePhoneChange}
          label="Telefone"
          placeholder="(00) 00000-0000"
          errorMessage="Por favor, insira um telefone válido"
        />
      </View>

      <View style={styles.infoSection}>
        <Info text={`Telefone atual: ${phone || "Não informado"}`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  infoSection: {
    marginTop: 20,
  },
});

export default PhoneFormScreen;
```

## Telefones de Teste

Para desenvolvimento e testes, você pode usar estes telefones válidos:

### Telefones Fixos

- `(11) 3333-4444`
- `(21) 3232-1234`
- `(85) 3456-7890`

### Celulares

- `(11) 99999-9999`
- `(21) 98765-4321`
- `(85) 91234-5678`

### Telefones Inválidos

- `(11) 88888-8888` (celular sem 9 inicial)
- `(11) 95555-5555` (fixo com 9 inicial)
- `(11) 333-444` (muito curto)
- `(11) 99999-99999` (muito longo)

## Integração com Formulários

Para integração com bibliotecas de formulário como React Hook Form:

```tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputPhone } from "lavex-design-system";

const FormWithPhone = () => {
  const { control, handleSubmit } = useForm();

  return (
    <Controller
      control={control}
      name="phone"
      rules={{
        required: "Telefone é obrigatório",
        validate: (value) => {
          // A validação já é feita pelo componente
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputPhone
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
        />
      )}
    />
  );
};
```
