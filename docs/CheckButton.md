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
- Travado: ícone some, padding reduz, borda e fonte usam `lockedColor`.
- Destravado: padding maior (left extra para o ícone), borda e fonte pretas.

A troca entre travado e destravado anima em 300 ms. Com `isLocked` false, `lockedColor` não pinta o botão.
