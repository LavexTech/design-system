# CheckButton

Botão outlined com comportamento de checkbox. O toque alterna um booleano e entrega o novo valor nos callbacks.

## Importação

```tsx
import { CheckButton } from "lavex-design-system";
```

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
| --- | --- | --- | --- | --- |
| `text` | `string` | Sim | - | Rótulo do botão |
| `checked` | `boolean` | Sim | - | Estado marcado |
| `onClick` | `(next: boolean) => void` | Não | - | Chamado com o novo valor |
| `onTap` | `(next: boolean) => void` | Não | - | Mesmo contrato de `onClick` |
| `isLocked` | `boolean` | Não | `false` | Visual travado, sem ícone e com padding menor |
| `lockedColor` | `string` | Sim | - | Cor da borda e da fonte quando `isLocked` é true |
| `disabled` | `boolean` | Não | `false` | Impede o toque |
| `style` | `ViewStyle` | Não | - | Estilo extra no container |

## Estados

- Marcado: ícone `circle-check-big`, fundo verde redondo, traço branco.
- Desmarcado: ícone `circle`, fundo cinza, traço preto.
- A fonte da label é 20% menor que o nome do item (`MEDIUM`). Com `isLocked`, a fonte fica mais 20% menor. Todos os paddings valem metade do original. No estado travado, o padding vale o dobro do valor anterior.
- Travado: ícone some, padding reduz, borda e fonte usam `lockedColor`.
- Destravado: padding maior, com padding-left que cobre o ícone e um respiro para o texto não sobrepor o ícone. Borda e fonte pretas.

A troca entre travado e destravado anima em 300 ms, com easing cúbico, em padding, fonte, cor, ícone e altura. Com `isLocked` false, `lockedColor` não pinta o botão.
