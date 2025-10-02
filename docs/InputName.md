# Como utilizar - InputName

O componente `InputName` é uma caixa de texto especializada para entrada de nomes que oferece capitalização automática das iniciais. É baseado no componente `Input` genérico, mas com funcionalidades específicas para nomes.

## Importação

```typescript
import { InputName } from "lavex-design-system";
```

## Props

| Prop          | Tipo                      | Obrigatório | Descrição                                      |
| ------------- | ------------------------- | ----------- | ---------------------------------------------- |
| `label`       | `string`                  | ✅          | O texto que aparece acima do campo de entrada  |
| `value`       | `string`                  | ✅          | O valor atual do input                         |
| `placeholder` | `string`                  | ❌          | Texto de placeholder quando o campo está vazio |
| `onChange`    | `(value: string) => void` | ✅          | Função chamada quando o valor do input muda    |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputName } from "lavex-design-system";

const MyComponent = () => {
  const [name, setName] = useState("");

  return (
    <InputName
      label="Nome Completo"
      value={name}
      placeholder="Nome Sobrenome"
      onChange={setName}
    />
  );
};
```

## Exemplos de Uso

### InputName Básico

```tsx
import React, { useState } from "react";
import { InputName } from "lavex-design-system";

const BasicNameInput = () => {
  const [name, setName] = useState("");

  return (
    <InputName
      label="Nome Completo"
      value={name}
      placeholder="Nome Sobrenome"
      onChange={setName}
    />
  );
};
```

### InputName com Validação Automática

O componente `InputName` possui validação interna automática que verifica se o usuário digitou pelo menos nome e sobrenome:

```tsx
import React, { useState } from "react";
import { InputName } from "lavex-design-system";

const ValidatedNameInput = () => {
  const [name, setName] = useState("");

  return (
    <InputName
      label="Nome Completo"
      value={name}
      placeholder="Nome Sobrenome"
      onChange={setName}
    />
  );
};
```

### InputName com Placeholder Customizado

```tsx
import React, { useState } from "react";
import { InputName } from "lavex-design-system";

const CustomPlaceholderInput = () => {
  const [name, setName] = useState("");

  return (
    <InputName
      label="Nome do Usuário"
      value={name}
      placeholder="Digite seu nome completo"
      onChange={setName}
    />
  );
};
```

## Características

### Capitalização Automática

O componente automaticamente:

- Capitaliza a primeira letra de cada palavra
- Converte o restante das letras para minúsculas
- Mantém espaços entre as palavras

**Exemplo:**

- Usuário digita: `joão silva santos`
- Componente exibe: `João Silva Santos`

### Configurações de Entrada

O componente automaticamente:

- Usa teclado padrão (`keyboardType="default"`)
- Habilita capitalização automática (`autoCapitalize="words"`)
- Desabilita correção automática (`autoCorrect={false}`)

## Validação Automática

O componente `InputName` possui validação interna que:

- **Verifica nome completo**: Exige pelo menos 2 palavras (nome e sobrenome)
- **Mensagem de erro**: "Digite pelo menos nome e sobrenome"
- **Validação inteligente**: Não mostra erro quando o campo está vazio
- **Feedback em tempo real**: Validação acontece durante a digitação

## Boas Práticas

1. **Use labels descritivos**: Sempre forneça um label claro que explique o que o usuário deve inserir
2. **Placeholders úteis**: Use placeholders que mostrem o formato esperado
3. **Validação automática**: O componente já possui validação interna para nomes completos
