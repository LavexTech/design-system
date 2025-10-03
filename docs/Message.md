# Como utilizar - Message

O componente `Message` é usado para exibir mensagens em interfaces de chat, simulando conversas como no WhatsApp. Ele oferece estilização diferenciada para mensagens próprias e de outros usuários.

## Importação

```typescript
import { Message } from "lavex-design-system";
```

## Props

| Prop      | Tipo         | Obrigatório | Descrição                                                 |
| --------- | ------------ | ----------- | --------------------------------------------------------- |
| `text`    | `string`     | ✅          | O conteúdo da mensagem que será exibida                   |
| `onClick` | `() => void` | ❌          | Função chamada quando a mensagem for clicada              |
| `isOwn`   | `boolean`    | ❌          | Define se a mensagem é do usuário atual (padrão: `false`) |

## Uso Básico

```tsx
import React from "react";
import { Message } from "lavex-design-system";

const MyComponent = () => {
  return <Message text="Olá! Como você está?" />;
};
```

## Exemplos de Uso

### Conversa Simples

```tsx
import React from "react";
import { View } from "react-native";
import { Message } from "lavex-design-system";

const ChatScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Message
        text="Olá! Como você está?"
        onClick={() => console.log("Mensagem clicada!")}
        isOwn={false}
      />
      <Message
        text="Oi! Estou bem, obrigado!"
        onClick={() => console.log("Mensagem clicada!")}
        isOwn={true}
      />
    </View>
  );
};
```

### Chat de Suporte

```tsx
import React from "react";
import { View } from "react-native";
import { Message } from "lavex-design-system";

const SupportChat = () => {
  return (
    <View style={{ padding: 20 }}>
      <Message text="Olá! Como posso ajudá-lo hoje?" isOwn={false} />
      <Message
        text="Estou com problemas para fazer login"
        isOwn={true}
        onClick={() => console.log("Detalhes da mensagem")}
      />
      <Message
        text="Vou verificar sua conta. Pode me enviar seu e-mail?"
        isOwn={false}
      />
    </View>
  );
};
```

## Estilização

- **Mensagens de outros** (`isOwn={false}`): Fundo cinza claro, alinhadas à esquerda
- **Mensagens próprias** (`isOwn={true}`): Fundo azul, alinhadas à direita, texto branco

## Boas Práticas

1. **Use para conversas**: Reserve o Message para interfaces de chat e mensagens
2. **Defina corretamente o `isOwn`**: Use `true` para mensagens do usuário atual e `false` para outras
3. **Implemente `onClick` quando necessário**: Útil para mostrar detalhes, responder ou navegar
4. **Mantenha consistência**: Use o mesmo padrão de cores e alinhamento em toda a conversa
