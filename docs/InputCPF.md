# Como utilizar - InputCPF

O componente `InputCPF` é uma caixa de texto especializada para captura de números de CPF. Ele oferece validação automática dos dígitos verificadores, máscara de formatação e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputCPF } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                |
| -------------- | ---------- | ----------- | -------------------------------------------------------- |
| `value`        | `string`   | ✅          | O valor atual do campo de CPF                            |
| `onChange`     | `function` | ✅          | Função chamada quando o valor muda                       |
| `label`        | `string`   | ❌          | Texto do rótulo (padrão: "CPF")                          |
| `placeholder`  | `string`   | ❌          | Texto de placeholder (padrão: "000.000.000-00")          |
| `errorMessage` | `string`   | ❌          | Mensagem de erro (padrão: "CPF deve ter formato válido") |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputCPF } from "lavex-design-system";

const MyComponent = () => {
  const [cpf, setCpf] = useState("");

  return <InputCPF value={cpf} onChange={setCpf} />;
};
```

## Exemplos de Uso

### Uso Padrão

```tsx
<InputCPF value={cpf} onChange={setCpf} />
```

### Com Label Customizada

```tsx
<InputCPF value={cpf} onChange={setCpf} label="Número do CPF" />
```

### Com Placeholder Customizado

```tsx
<InputCPF value={cpf} onChange={setCpf} placeholder="123.456.789-00" />
```

### Com Mensagem de Erro Customizada

```tsx
<InputCPF
  value={cpf}
  onChange={setCpf}
  errorMessage="Por favor, insira um CPF válido"
/>
```

### Configuração Completa

```tsx
<InputCPF
  value={cpf}
  onChange={setCpf}
  label="CPF do Titular"
  placeholder="000.000.000-00"
  errorMessage="CPF deve ser válido e ter 11 dígitos"
/>
```

## Validação

O componente inclui validação completa de CPF que verifica:

- **Formato**: Aplica máscara automática (000.000.000-00)
- **Dígitos**: Deve ter exatamente 11 dígitos numéricos
- **Dígitos verificadores**: Valida os dois últimos dígitos usando o algoritmo oficial
- **Sequências inválidas**: Rejeita CPFs com todos os dígitos iguais (111.111.111-11, etc.)

### Algoritmo de Validação

1. Remove pontos, traços e espaços
2. Verifica se tem exatamente 11 dígitos
3. Rejeita sequências com todos os dígitos iguais
4. Calcula o primeiro dígito verificador
5. Calcula o segundo dígito verificador
6. Compara com os dígitos informados

### Comportamento da Validação

- **Campo vazio**: Considerado válido (não obrigatório)
- **CPF inválido**: Mostra mensagem de erro e borda vermelha
- **CPF válido**: Remove mensagem de erro e borda normal

## Máscara Automática

O componente aplica automaticamente a máscara `000.000.000-00`, formatando o CPF conforme o usuário digita:

- **Digitação**: `12345678901` → `123.456.789-01`
- **Backspace**: Remove caracteres da direita para esquerda
- **Paste**: Formata automaticamente números colados

## Teclado Otimizado

O componente automaticamente configura o teclado numérico (`keyboardType="numeric"`), proporcionando:

- Acesso rápido aos números
- Melhor experiência de digitação
- Redução de erros de entrada

## Boas Práticas

1. **Use para captura de CPF**: Reserve este componente especificamente para campos de CPF
2. **Validação robusta**: O componente já valida dígitos verificadores automaticamente
3. **Feedback visual**: Fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste com CPFs válidos**: Use CPFs de teste para desenvolvimento

## Casos de Uso Comuns

### Formulário de Cadastro

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputCPF } from "lavex-design-system";

const SignupForm = () => {
  const [cpf, setCpf] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Criar Conta" />
      <InputCPF value={cpf} onChange={setCpf} label="CPF" />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Dados Pessoais

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputCPF } from "lavex-design-system";

const PersonalDataForm = () => {
  const [cpf, setCpf] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Dados Pessoais" />
      <InputCPF
        value={cpf}
        onChange={setCpf}
        label="CPF"
        placeholder="000.000.000-00"
      />
      {/* Outros campos do formulário */}
    </View>
  );
};
```

### Formulário de Verificação

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, InputCPF } from "lavex-design-system";

const VerificationForm = () => {
  const [cpf, setCpf] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Verificação de Identidade" />
      <InputCPF
        value={cpf}
        onChange={setCpf}
        label="CPF para Verificação"
        errorMessage="CPF é obrigatório para verificação"
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
import { Title1, Title2, InputCPF, Info } from "lavex-design-system";

const CPFFormScreen = () => {
  const [cpf, setCpf] = useState("");

  const handleCpfChange = (value: string) => {
    setCpf(value);
    // Lógica adicional se necessário
    console.log("CPF atualizado:", value);
  };

  return (
    <View style={styles.container}>
      <Title1 text="Cadastro de CPF" />

      <View style={styles.formSection}>
        <Title2 text="Informações Pessoais" />
        <Info text="Digite seu CPF para completar o cadastro" />

        <InputCPF
          value={cpf}
          onChange={handleCpfChange}
          label="CPF"
          placeholder="000.000.000-00"
          errorMessage="Por favor, insira um CPF válido"
        />
      </View>

      <View style={styles.infoSection}>
        <Info text={`CPF atual: ${cpf || "Não informado"}`} />
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

export default CPFFormScreen;
```

## CPFs de Teste

Para desenvolvimento e testes, você pode usar estes CPFs válidos:

- `111.444.777-35`
- `123.456.789-09`
- `987.654.321-00`
- `000.000.000-00` (inválido - todos os dígitos iguais)

## Integração com Formulários

Para integração com bibliotecas de formulário como React Hook Form:

```tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputCPF } from "lavex-design-system";

const FormWithCPF = () => {
  const { control, handleSubmit } = useForm();

  return (
    <Controller
      control={control}
      name="cpf"
      rules={{
        required: "CPF é obrigatório",
        validate: (value) => {
          // A validação já é feita pelo componente
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputCPF
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
        />
      )}
    />
  );
};
```
