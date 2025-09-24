# Como utilizar - InputEmail

O componente `InputEmail` é uma caixa de texto especializada para captura de endereços de email. Ele oferece validação automática e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputEmail } from "lavex-design-system";
// ou
import { InputEmail, type InputEmailProps } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                  |
| -------------- | ---------- | ----------- | ---------------------------------------------------------- |
| `value`        | `string`   | ✅          | O valor atual do campo de email                            |
| `onChange`     | `function` | ✅          | Função chamada quando o valor muda                         |
| `label`        | `string`   | ❌          | Texto do rótulo (padrão: "Email")                          |
| `placeholder`  | `string`   | ❌          | Texto de placeholder (padrão: "example@email.com")         |
| `errorMessage` | `string`   | ❌          | Mensagem de erro (padrão: "Email deve ter formato válido") |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputEmail } from "lavex-design-system";

const MyComponent = () => {
  const [email, setEmail] = useState("");

  return <InputEmail value={email} onChange={setEmail} />;
};
```

## Exemplos de Uso

### Uso Padrão

```tsx
<InputEmail value={email} onChange={setEmail} />
```

### Com Label Customizada

```tsx
<InputEmail value={email} onChange={setEmail} label="Endereço de Email" />
```

### Com Placeholder Customizado

```tsx
<InputEmail value={email} onChange={setEmail} placeholder="seu@email.com" />
```

### Com Mensagem de Erro Customizada

```tsx
<InputEmail
  value={email}
  onChange={setEmail}
  errorMessage="Por favor, insira um email válido"
/>
```

### Configuração Completa

```tsx
<InputEmail
  value={email}
  onChange={setEmail}
  label="Email Corporativo"
  placeholder="usuario@empresa.com"
  errorMessage="Email deve ser válido e conter @ e ."
/>
```

## Validação

O componente inclui validação automática que verifica se o email tem formato válido:

- Contém um caractere "@" (não pode ser o primeiro caractere)
- Contém um caractere "." após o "@"
- O "." não pode ser o último caractere

### Comportamento da Validação

- **Campo vazio**: Considerado válido (não obrigatório)
- **Email inválido**: Mostra mensagem de erro e borda vermelha
- **Email válido**: Remove mensagem de erro e borda normal

## Teclado Otimizado

O componente automaticamente configura o teclado para email (`keyboardType="email-address"`), proporcionando:

- Tecla "@" facilmente acessível
- Sugestões de domínio
- Melhor experiência de digitação

## Boas Práticas

1. **Use para captura de email**: Reserve este componente especificamente para campos de email
2. **Validação adicional**: Para validações mais complexas, implemente lógica adicional no `onChange`
3. **Feedback visual**: O componente já fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste em dispositivos**: Verifique o comportamento do teclado em diferentes dispositivos

## Casos de Uso Comuns

### Formulário de Login

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputEmail } from "lavex-design-system";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Fazer Login" />
      <InputEmail value={email} onChange={setEmail} label="Email" />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Cadastro

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputEmail } from "lavex-design-system";

const SignupForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Criar Conta" />
      <InputEmail
        value={email}
        onChange={setEmail}
        label="Email"
        placeholder="seu@email.com"
      />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Contato

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputEmail } from "lavex-design-system";

const ContactForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Entre em Contato" />
      <InputEmail
        value={email}
        onChange={setEmail}
        label="Seu Email"
        placeholder="contato@exemplo.com"
        errorMessage="Email é obrigatório para resposta"
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
import { Title1, Title2, InputEmail, Info } from "lavex-design-system";

const EmailFormScreen = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Lógica adicional se necessário
    console.log("Email atualizado:", value);
  };

  return (
    <View style={styles.container}>
      <Title1 text="Configuração de Email" />

      <View style={styles.formSection}>
        <Title2 text="Informações de Contato" />
        <Info text="Digite seu email para receber notificações importantes" />

        <InputEmail
          value={email}
          onChange={handleEmailChange}
          label="Email Principal"
          placeholder="usuario@exemplo.com"
          errorMessage="Por favor, insira um email válido"
        />
      </View>

      <View style={styles.infoSection}>
        <Info text={`Email atual: ${email || "Não informado"}`} />
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

export default EmailFormScreen;
```

## Integração com Formulários

Para integração com bibliotecas de formulário como React Hook Form:

```tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputEmail } from "lavex-design-system";

const FormWithEmail = () => {
  const { control, handleSubmit } = useForm();

  return (
    <Controller
      control={control}
      name="email"
      rules={{
        required: "Email é obrigatório",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Email inválido",
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputEmail
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
        />
      )}
    />
  );
};
```
