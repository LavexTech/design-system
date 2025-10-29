# Como utilizar - InputCPF

O componente `InputCPF` é uma caixa de texto especializada para captura de números de CPF. Ele oferece validação automática dos dígitos verificadores, máscara de formatação e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputCPF } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                |
| -------------- | ---------- | ----------- | -------------------------------------------------------- |
| `value`        | `string`   | Sim         | O valor atual do campo de CPF                            |
| `onChange`     | `function` | Sim         | Função chamada quando o valor muda                       |
| `label`        | `string`   | Não         | Texto do rótulo (padrão: "CPF")                          |
| `placeholder`  | `string`   | Não         | Texto de placeholder (padrão: "000.000.000-00")          |
| `errorMessage` | `string`   | Não         | Mensagem de erro (padrão: "CPF deve ter formato válido") |

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

### Configuração Completa

```tsx
<InputCPF
  value={cpf}
  onChange={setCpf}
  label="CPF do Titular"
  placeholder="000.000.000-00"
  errorMessage="Por favor, insira um CPF válido"
/>
```

## Validação

O componente inclui validação completa de CPF que verifica:

- **Formato**: Aplica máscara automática (000.000.000-00)
- **Dígitos**: Deve ter exatamente 11 dígitos numéricos
- **Dígitos verificadores**: Valida os dois últimos dígitos usando o algoritmo oficial
- **Sequências inválidas**: Rejeita CPFs com todos os dígitos iguais (111.111.111-11, etc.)

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

## CPFs de Teste

Para desenvolvimento e testes, você pode usar estes CPFs válidos:

- `111.444.777-35`
- `123.456.789-09`
- `987.654.321-00`
- `000.000.000-00` (inválido - todos os dígitos iguais)

## Boas Práticas

1. **Use para captura de CPF**: Reserve este componente especificamente para campos de CPF
2. **Validação robusta**: O componente já valida dígitos verificadores automaticamente
3. **Feedback visual**: Fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste com CPFs válidos**: Use CPFs de teste para desenvolvimento