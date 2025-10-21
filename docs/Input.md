# Input

Campo de texto editável com suporte a máscara, validação e teclado específico para mobile.

## Importação

```typescript
import { Input } from "lavex-design-system";
```

## Props

| Prop             | Tipo                                       | Obrigatório | Descrição                                       |
| ---------------- | ------------------------------------------ | ----------- | ----------------------------------------------- |
| `label`          | `string`                                   | Sim         | Texto que aparece acima do campo                |
| `value`          | `string`                                   | Sim         | Valor atual do input                            |
| `onChange`       | `(value: string) => void`                  | Sim         | Função chamada quando o valor muda              |
| `placeholder`    | `string`                                   | Não         | Texto placeholder quando vazio                  |
| `validation`     | `(value: string) => boolean`               | Não         | Função de validação (retorna true se válido)    |
| `errorMessage`   | `string`                                   | Não         | Mensagem exibida quando validação falha         |
| `mask`           | `string`                                   | Não         | Padrão de máscara (use X ou x para caracteres)  |
| `mobileKeyboard` | `"text" \| "email" \| "phone" \| "number"` | Não         | Tipo de teclado mobile (padrão: "text")         |

## O que faz

- Campo de texto controlado para entrada de dados
- Validação em tempo real com feedback visual
- Máscara automática para formatação de dados
- Teclado mobile específico por tipo de dado
- Mensagens de erro customizáveis
- Estilos consistentes com o design system

## Exemplo Básico

```tsx
import { Input } from "lavex-design-system";
import { useState } from "react";

  const [value, setValue] = useState("");

    <Input
      label="Nome"
      value={value}
      placeholder="Digite seu nome"
      onChange={setValue}
    />
```

## Exemplo com Validação

```tsx
  const [value, setValue] = useState("");

const validateMinLength = (text: string) => text.length >= 3;

    <Input
  label="Nome Completo"
      value={value}
      placeholder="Mínimo 3 caracteres"
      onChange={setValue}
      validation={validateMinLength}
      errorMessage="Deve ter pelo menos 3 caracteres"
    />
```

## Exemplo com Máscara

```tsx
const [phone, setPhone] = useState("");

    <Input
  label="Telefone"
  value={phone}
  placeholder="(00) 00000-0000"
  onChange={setPhone}
  mask="(xx) xxxxx-xxxx"
  mobileKeyboard="phone"
/>
```

## Exemplo de Email

```tsx
const [email, setEmail] = useState("");

const validateEmail = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

    <Input
  label="Email"
  value={email}
  placeholder="seu@email.com"
  onChange={setEmail}
  validation={validateEmail}
  errorMessage="Email inválido"
      mobileKeyboard="email"
    />
```

## Padrões de Máscara

Use `X` ou `x` para representar qualquer caractere alfanumérico:

```tsx
// Telefone
mask="(xx) xxxxx-xxxx"  // (11) 99999-9999

// CPF
mask="xxx.xxx.xxx-xx"   // 123.456.789-01

// CEP
mask="xxxxx-xxx"        // 12345-678

// Data
mask="xx/xx/xxxx"       // 31/12/2023
```

## Tipos de Teclado Mobile

```tsx
mobileKeyboard="text"   // Teclado padrão com letras
mobileKeyboard="email"  // Teclado com @ e .com
mobileKeyboard="phone"  // Teclado numérico com +*
mobileKeyboard="number" // Teclado apenas números
```

## Como funciona

1. Renderiza um campo de texto controlado dentro de Grid
2. Aplica máscara automaticamente enquanto usuário digita
3. Executa validação em tempo real quando fornecida
4. Exibe mensagem de erro abaixo do campo se inválido
5. Aplica borda vermelha quando há erro de validação
6. Usa GluestackUI como base de estilização

## Estilos

- **Background**: Branco
- **Border radius**: Médio
- **Border error**: Vermelho quando validação falha
- **Label**: Texto pequeno acima do campo
- **Error message**: Texto pequeno vermelho abaixo do campo

## Observações

- Máscara remove automaticamente caracteres não alfanuméricos
- Validação ocorre no `onChange` e no `useEffect` quando valor muda
- Campo é sempre controlado (precisa de `value` e `onChange`)
- Placeholder usa cor de texto INFO do design system
