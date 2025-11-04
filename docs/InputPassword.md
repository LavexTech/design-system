# InputPassword

Campo de texto especializado para entrada de senha com validação automática e botão para mostrar/ocultar.

## Importação

```typescript
import { InputPassword } from "lavex-design-system";
```

## Props

| Prop                 | Tipo                      | Obrigatório | Descrição                                                         |
| -------------------- | ------------------------- | ----------- | ----------------------------------------------------------------- |
| `label`              | `string`                  | Sim         | Texto que aparece acima do campo                                  |
| `value`              | `string`                  | Sim         | Valor atual do input                                              |
| `onChange`           | `(value: string) => void` | Sim         | Função chamada quando o valor muda                                |
| `placeholder`        | `string`                  | Não         | Texto placeholder (padrão: "Digite sua senha")                    |
| `showPasswordToggle` | `boolean`                 | Não         | Mostra botão para alternar visibilidade (padrão: true)            |
| `errorMessage`       | `string`                  | Não         | Mensagem de erro customizada quando validação falha               |

## O que faz

- Wrapper do componente Input configurado para senha
- Validação automática de senha forte
- Botão para mostrar/ocultar senha (ícone de olho)
- Campo com `secureTextEntry` (caracteres mascarados)
- Validação: mínimo 8 caracteres, com maiúscula, minúscula e número

## Exemplo Básico

```tsx
import { InputPassword } from "lavex-design-system";
import { useState } from "react";

const [password, setPassword] = useState("");

<InputPassword
  label="Senha"
  value={password}
  onChange={setPassword}
/>
```

## Exemplo sem Toggle

```tsx
<InputPassword
  label="Senha Confidencial"
  value={password}
  onChange={setPassword}
  showPasswordToggle={false}
/>
```

## Exemplo com Mensagem de Erro

```tsx
<InputPassword
  label="Nova Senha"
  value={password}
  placeholder="Digite uma senha forte"
  onChange={setPassword}
  errorMessage="Senha fraca"
/>
```

## Validação Automática

A senha deve atender aos seguintes critérios:

```tsx
// Válido
"Senha123"      // 8+ caracteres, maiúscula, minúscula, número

// Inválido
"senha"         // falta maiúscula e número
"SENHA123"      // falta minúscula
"SenhaForte"    // falta número
"Senha1"        // menos de 8 caracteres
```

**Regras:**
- Mínimo 8 caracteres
- Pelo menos 1 letra maiúscula
- Pelo menos 1 letra minúscula
- Pelo menos 1 número

## Como funciona

1. Renderiza o componente `Input` com configurações de senha
2. Adiciona estado interno para controlar visibilidade da senha
3. Aplica validação automática de senha forte
4. Renderiza botão de toggle com ícone de olho (Ionicons)
5. Alterna `secureTextEntry` entre true/false ao clicar no botão

## Observações

- É um wrapper do componente `Input`
- Usa `Ionicons` para ícone do olho (eye/eye-off)
- Toggle fica à direita do campo (como `rightElement`)
- Validação é obrigatória (sempre ativa)
