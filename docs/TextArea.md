# Como utilizar - TextArea

O componente `TextArea` é uma caixa de texto editável multilinha baseada no Gluestack UI, ideal para textos longos como comentários, descrições ou mensagens. Utiliza o componente `TextBox` personalizado para labels e contador de caracteres.

## Importação

```typescript
import { TextArea } from "lavex-design-system";
```

## Props

| Prop          | Tipo                      | Obrigatório | Descrição                                                              |
| ------------- | ------------------------- | ----------- | ---------------------------------------------------------------------- |
| `label`       | `string`                  | Sim          | O texto do título que fica acima da caixa                              |
| `value`       | `string`                  | Não          | O valor atual do texto                                                 |
| `placeholder` | `string`                  | Não          | O texto que aparece quando a caixa está vazia                          |
| `onChange`    | `(value: string) => void` | Sim          | Função chamada quando o texto é alterado                               |
| `maxLength`   | `number`                  | Não          | Limite máximo de caracteres. Quando definido, exibe um contador visual |

## Implementação

- **Base**: Gluestack UI Textarea + TextareaInput
- **Layout**: Grid system com GridItem para estruturação
- **Label**: Componente TextBox personalizado
- **Contador**: TextBox personalizado alinhado à direita
- **Provider**: GluestackUIProvider para contexto de tema

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

## Exemplo com Limite de Caracteres

```tsx
import React, { useState } from "react";
import { TextArea } from "lavex-design-system";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  return (
    <TextArea
      label="Seu feedback"
      value={feedback}
      placeholder="Compartilhe sua opinião (máximo 200 caracteres)..."
      onChange={setFeedback}
      maxLength={200}
    />
  );
};
```

**Nota**: O componente utiliza TypeScript com type assertion (`as any`) para compatibilidade com as props do TextareaInput do Gluestack UI.
