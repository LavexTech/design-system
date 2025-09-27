# Como utilizar - TextArea

O componente `TextArea` é uma caixa de texto editável multilinha, ideal para textos longos como comentários, descrições ou mensagens. Quando vazio, exibe um placeholder para orientar o usuário sobre o que deve ser inserido.

## Importação

```typescript
import { TextArea } from "lavex-design-system";
```

## Props

| Prop          | Tipo                      | Obrigatório | Descrição                                     |
| ------------- | ------------------------- | ----------- | --------------------------------------------- |
| `label`       | `string`                  | ✅          | O texto do título que fica acima da caixa     |
| `value`       | `string`                  | ✅          | O valor atual do texto                        |
| `placeholder` | `string`                  | ✅          | O texto que aparece quando a caixa está vazia |
| `onChange`    | `(value: string) => void` | ✅          | Função chamada quando o texto é alterado      |

## Uso Básico

```tsx
import React, { useState } from "react";
import { TextArea } from "lavex-design-system";

const MyComponent = () => {
  const [message, setMessage] = useState("");

  return (
    <TextArea
      label="Sua mensagem"
      value={message}
      placeholder="Digite sua mensagem aqui..."
      onChange={setMessage}
    />
  );
};
```

## Exemplos de Uso

### Formulário de Contato

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title2, TextArea } from "lavex-design-system";

const ContactForm = () => {
  const [message, setMessage] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Entre em Contato" />
      <TextArea
        label="Mensagem"
        value={message}
        placeholder="Conte-nos como podemos ajudar..."
        onChange={setMessage}
      />
    </View>
  );
};
```

### Comentários em Posts

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Title3, TextArea } from "lavex-design-system";

const CommentSection = () => {
  const [comment, setComment] = useState("");

  return (
    <View style={{ padding: 16 }}>
      <Title3 text="Deixe seu comentário" />
      <TextArea
        label="Comentário"
        value={comment}
        placeholder="O que você achou deste post?"
        onChange={setComment}
      />
    </View>
  );
};
```
