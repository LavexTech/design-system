# Stepper Component

Componente que permite ajustar um valor numérico em passos fixos.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `text` | `string` | Rótulo ou descrição que acompanha o contador (ex: "Camiseta") |
| `max` | `number` | Valor máximo que o número pode alcançar |
| `min` | `number` | Valor mínimo que o número pode ter |
| `value` | `number` | Número atual que o stepper está mostrando e controlando |
| `onChange` | `(value: number) => void` | Função chamada sempre que o valor é alterado (aumentado ou diminuído) |

## Uso

```tsx
import { useState } from "react";
import { Stepper } from "lavex-design-system";

export default function MyComponent() {
  const [quantity, setQuantity] = useState(0);

  return (
    <Stepper
      text="Camiseta"
      min={0}
      max={10}
      value={quantity}
      onChange={setQuantity}
    />
  );
}
```

## Características

- **Layout responsivo**: Utiliza Grid para organização visual
- **Estados dos botões**: Os botões de incremento/decremento são desabilitados automaticamente quando atingem os limites (min/max)
- **Visual consistente**: Utiliza valores de `constants.ts` para espaçamento, cores, fontes e bordas
- **Feedback visual**: Estados desabilitados têm opacidade reduzida e cor diferente

## Exemplo com múltiplos steppers

```tsx
import { useState } from "react";
import { Stepper } from "lavex-design-system";

export default function MyComponent() {
  const [shirts, setShirts] = useState(0);
  const [pants, setPants] = useState(1);
  const [shoes, setShoes] = useState(0);

  return (
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
      <Stepper
        text="Sapatos"
        min={0}
        max={3}
        value={shoes}
        onChange={setShoes}
      />
    </>
  );
}
```

## Design

O componente é dividido em duas colunas usando Grid:
- **Coluna 1**: Label/texto descritivo
- **Coluna 2**: Controles (botão -, valor, botão +)

Os botões de incremento e decremento têm bordas arredondadas nas extremidades e compartilham uma borda comum com o display do valor central.

