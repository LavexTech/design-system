# InputEmail

Campo de texto especializado para captura de email com validação automática e teclado otimizado.

## Importação

```typescript
import { InputEmail } from "lavex-design-system";
```

## Props

| Prop           | Tipo                          | Obrigatório | Descrição                                                  |
| -------------- | ----------------------------- | ----------- | ---------------------------------------------------------- |
| `value`        | `string`                      | Sim         | Valor atual do campo de email                              |
| `onChange`     | `(value: string) => void`     | Sim         | Função chamada quando o valor muda                         |
| `label`        | `string`                      | Não         | Texto do rótulo (padrão: "Email")                          |
| `placeholder`  | `string`                      | Não         | Texto placeholder (padrão: "example@email.com")            |
| `errorMessage` | `string`                      | Não         | Mensagem de erro (padrão: "Email deve ter formato válido") |

## O que faz

- Wrapper do componente Input configurado para email
- Validação automática de formato de email
- Teclado mobile otimizado para email (com @ fácil)
- Sem capitalização automática (`autoCapitalize="none"`) e sem autocorreção
- Valor sempre normalizado para minúsculas no `onChange` (digitação e colagem)
- Label, placeholder e mensagem de erro pré-definidos
- Campo vazio é considerado válido (não obrigatório)

## Exemplo Básico

```tsx
import { InputEmail } from "lavex-design-system";
import { useState } from "react";

const [email, setEmail] = useState("");

<InputEmail value={email} onChange={setEmail} />
```

## Exemplo com Customização

```tsx
<InputEmail
  value={email}
  onChange={setEmail}
  label="Email Corporativo"
  placeholder="usuario@empresa.com"
  errorMessage="Email inválido"
/>
```

## Exemplo em Formulário

```tsx
import { InputEmail } from "lavex-design-system";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <InputEmail
        value={email}
        onChange={setEmail}
        label="Email"
      />
    </View>
  );
};
```

## Validação

A validação verifica se o email tem formato válido:

```tsx
// Válido
"usuario@email.com"

// Inválido
"@email.com"     // @ não pode ser o primeiro caractere
"usuario@email"  // falta o . depois do @
"usuario@email." // . não pode ser o último caractere
""               // campo vazio é válido (não obrigatório)
```

## Como funciona

1. Renderiza o componente `Input` com configurações de email
2. Aplica validação automática:
   - `@` deve existir e não ser o primeiro caractere
   - `.` deve existir após o `@`
   - `.` não pode ser o último caractere
3. Define `mobileKeyboard="email"` automaticamente
4. Campo vazio retorna `true` na validação

## Observações

- É um wrapper simples do componente `Input`
- Não é obrigatório por padrão (campo vazio é válido)
- Teclado email facilita acesso ao @ em dispositivos móveis
- Usa validação básica de formato (não verifica se email existe)
