# Stepper

Componente para ajustar valores numéricos em passos fixos com controles de incremento/decremento.

## Importação

```typescript
import { Stepper } from "lavex-design-system";
```

## Props

| Prop      | Tipo                      | Obrigatório | Descrição                                    |
| --------- | ------------------------- | ----------- | -------------------------------------------- |
| `text`    | `string`                  | Sim          | Rótulo que acompanha o contador              |
| `min`     | `number`                  | Sim          | Valor mínimo permitido                       |
| `max`     | `number`                  | Sim          | Valor máximo permitido                       |
| `value`   | `number`                  | Sim          | Valor atual do stepper                       |
| `onChange`| `(value: number) => void` | Sim          | Função chamada quando o valor muda           |

## Uso Básico

```tsx
import { useState } from "react";
import { Stepper } from "lavex-design-system";

const [quantity, setQuantity] = useState(0);

<Stepper
  text="Camiseta"
  min={0}
  max={10}
  value={quantity}
  onChange={setQuantity}
/>
```

## Exemplo com Múltiplos Steppers

```tsx
const [shirts, setShirts] = useState(0);
const [pants, setPants] = useState(1);

<>
  <Stepper
    text="Camisetas"
    min={0}
    max={10}
    value={shirts}
    onChange={setShirts}
  />
  <Stepper
    text="Calças"
    min={0}
    max={5}
    value={pants}
    onChange={setPants}
  />
</>
```

## Como funciona

1. Renderiza label e controles em Grid de 2 colunas
2. Botões +/- são desabilitados automaticamente nos limites (min/max)
3. Valor central exibe o número atual
4. Estados desabilitados têm opacidade reduzida
5. Usa constantes do design system para estilos

## Estilos

- **Layout**: Grid responsivo com 2 colunas
- **Botões**: Bordas arredondadas nas extremidades, compartilham borda com valor central
- **Estados**: Desabilitados com opacidade reduzida e cor diferente
- **Valor**: Centralizado em container com fundo cinza claro

