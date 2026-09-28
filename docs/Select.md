# Select

Campo de seleção com label, placeholder e lista de opções. Visual alinhado ao Input.

## Importação

```typescript
import { Select } from "lavex-design-system";
```

## Props

| Prop           | Tipo                          | Obrigatório | Descrição                                              |
| -------------- | ----------------------------- | ----------- | ------------------------------------------------------ |
| `label`        | `string`                      | Sim         | Texto acima do campo                                   |
| `value`        | `string`                      | Não         | Valor selecionado (`option.value`)                     |
| `onChange`     | `(value: string) => void`     | Sim         | Chamada ao escolher uma opção                          |
| `options`      | `{ label: string; value: string }[]` | Sim  | Lista de opções                                        |
| `placeholder`  | `string`                      | Não         | Texto quando nenhuma opção está selecionada (padrão: "Selecione") |
| `errorMessage` | `string`                      | Não         | Mensagem de erro abaixo do campo                       |
| `darkMode`     | `boolean`                     | Não         | Tema escuro                                            |
| `fontScale`    | `number`                      | Não         | Escala de fonte do campo, da label e da modal          |
| `triggerFontScale` | `number`                  | Não         | Escala extra só do texto do campo que abre a modal. Não altera label nem opções |

## Exemplo

```tsx
import { Select } from "lavex-design-system";
import { useState } from "react";

const [deliveryForm, setDeliveryForm] = useState("");

<Select
  label="Forma da entrega"
  value={deliveryForm}
  placeholder="Selecione a forma da entrega"
  onChange={setDeliveryForm}
  options={[
    { label: "Preciso que o lavexer busque/traga as peças", value: "LAVEXER" },
    { label: "Eu posso levar/buscar as peças ao lavexer", value: "FLEX" },
    { label: "Eu prefiro levar/buscar as peças ao lavexer", value: "CLIENT" },
  ]}
/>
```

## Como funciona

1. O campo fechado mostra o label da opção selecionada ou o placeholder
2. Ao tocar, abre um modal em tela cheia (sem título), com as opções como `CheckButton`. O vão entre os botões é fixo, e a altura de cada um acompanha as linhas do texto
3. Tocar numa opção chama `onChange` e fecha o modal
4. A opção selecionada usa `success-outline`; as demais usam `default-outline`
5. O texto das opções fica centralizado no botão, sem padding extra (o botão já tem)
6. A opção já selecionada mostra um ícone de check à esquerda
7. O espaço entre as bordas dos botões não muda quando um rótulo quebra em mais linhas
