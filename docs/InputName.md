# InputName Component

O componente `InputName` é uma caixa de texto especializada para entrada de nomes que oferece capitalização automática das iniciais e validação para nome completo.

## Importação

```typescript
import { InputName } from "lavex-design-system";
```

## Props

| Prop          | Tipo                      | Obrigatório | Padrão              | Descrição                                      |
| ------------- | ------------------------- | ----------- | ------------------- | ---------------------------------------------- |
| `label`       | `string`                  | ✅          | -                   | O texto que aparece acima do campo de entrada  |
| `value`       | `string`                  | ✅          | -                   | O valor atual do input                         |
| `placeholder` | `string`                  | ❌          | "Nome Sobrenome"    | Texto de placeholder quando o campo está vazio |
| `onChange`    | `(value: string) => void` | ✅          | -                   | Função chamada quando o valor do input muda    |

## Características

- **Capitalização automática**: Primeira letra de cada palavra em maiúscula
- **Validação automática**: Exige pelo menos nome e sobrenome
- **Formatação inteligente**: Aplica formatação ao perder o foco ou finalizar edição

## Exemplo

```tsx
import React, { useState } from "react";
import { InputName } from "lavex-design-system";

const MyComponent = () => {
  const [name, setName] = useState("");

  return (
    <InputName
      label="Nome Completo"
      value={name}
      placeholder="Digite seu nome completo"
      onChange={setName}
    />
  );
};
```

## Validação Automática

O componente `InputName` possui validação interna que:

- **Verifica nome completo**: Exige pelo menos 2 palavras (nome e sobrenome)
- **Mensagem de erro**: "Digite pelo menos nome e sobrenome"
- **Validação inteligente**: Não mostra erro quando o campo está vazio
- **Feedback em tempo real**: Validação acontece durante a digitação
