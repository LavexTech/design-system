# Como utilizar - InputPassword

O componente `InputPassword` é uma caixa de texto especializada para entrada de senhas que oferece funcionalidade de toggle de visibilidade da senha. É uma versão simplificada e focada do componente `Input` genérico.

## Importação

```typescript
import { InputPassword } from "lavex-design-system";
```

## Props

| Prop                 | Tipo                      | Obrigatório | Descrição                                                       |
| -------------------- | ------------------------- | ----------- | --------------------------------------------------------------- |
| `label`              | `string`                  | ✅          | O texto que aparece acima do campo de entrada                   |
| `value`              | `string`                  | ✅          | O valor atual do input                                          |
| `placeholder`        | `string`                  | ❌          | Texto de placeholder quando o campo está vazio                  |
| `onChange`           | `(value: string) => void` | ✅          | Função chamada quando o valor do input muda                     |
| `showPasswordToggle` | `boolean`                 | ❌          | Mostra botão para alternar visibilidade da senha (padrão: true) |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputPassword } from "lavex-design-system";

const MyComponent = () => {
  const [password, setPassword] = useState("");

  return (
    <InputPassword
      label="Senha"
      value={password}
      placeholder="Digite sua senha"
      onChange={setPassword}
    />
  );
};
```

## Exemplos de Uso

### InputPassword Básico

```tsx
import React, { useState } from "react";
import { InputPassword } from "lavex-design-system";

const BasicPasswordInput = () => {
  const [password, setPassword] = useState("");

  return (
    <InputPassword
      label="Senha"
      value={password}
      placeholder="Digite sua senha"
      onChange={setPassword}
    />
  );
};
```

### InputPassword sem Toggle de Visibilidade

```tsx
import React, { useState } from "react";
import { InputPassword } from "lavex-design-system";

const HiddenTogglePasswordInput = () => {
  const [password, setPassword] = useState("");

  return (
    <InputPassword
      label="Senha Confidencial"
      value={password}
      placeholder="Digite sua senha"
      onChange={setPassword}
      showPasswordToggle={false}
    />
  );
};
```

### InputPassword com Placeholder Customizado

```tsx
import React, { useState } from "react";
import { InputPassword } from "lavex-design-system";

const CustomPlaceholderInput = () => {
  const [password, setPassword] = useState("");

  return (
    <InputPassword
      label="Nova Senha"
      value={password}
      placeholder="Digite uma nova senha"
      onChange={setPassword}
    />
  );
};
```

## Características

### Toggle de Visibilidade

O componente inclui um botão "Mostrar/Ocultar" que permite ao usuário alternar entre ver e ocultar o texto da senha:

- **Mostrar**: Exibe o texto da senha em texto simples
- **Ocultar**: Exibe a senha com caracteres mascarados (••••••)

### Configurações de Segurança

O componente automaticamente:

- Desabilita a capitalização automática (`autoCapitalize="none"`)
- Desabilita a correção automática (`autoCorrect={false}`)
- Usa entrada de texto segura (`secureTextEntry`)

## Boas Práticas

1. **Use labels descritivos**: Sempre forneça um label claro que explique o que o usuário deve inserir
2. **Placeholders úteis**: Use placeholders que mostrem o contexto esperado
3. **Toggle de visibilidade**: Mantenha `showPasswordToggle={true}` para melhor experiência do usuário
4. **Teste em dispositivos móveis**: Sempre teste a funcionalidade em dispositivos móveis
