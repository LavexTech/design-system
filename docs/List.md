# Como utilizar - List

O componente `List` é usado para exibir uma coleção de itens de forma organizada, geralmente um abaixo do outro. É um componente estrutural, ideal para criar listas de tarefas, resultados de busca ou qualquer seção que precise apresentar múltiplos elementos (como Cards ou UserCards) em sequência.

## Importação

```typescript
import { List } from "lavex-design-system";
```

## Props

| Prop       | Tipo              | Obrigatório | Descrição                                            |
| ---------- | ----------------- | ----------- | ---------------------------------------------------- |
| `title`    | `string`          | ❌          | Título que aparece acima da lista para identificá-la |
| `children` | `React.ReactNode` | ✅          | Componentes que serão exibidos como itens da lista   |

## Uso Básico

```tsx
import React from "react";
import { List, Card, Text } from "lavex-design-system";

const MyComponent = () => {
  return (
    <List title="Minha Lista">
      <Card title="Item 1">
        <Text text="Conteúdo do primeiro item" />
      </Card>
      <Card title="Item 2">
        <Text text="Conteúdo do segundo item" />
      </Card>
    </List>
  );
};
```

## Características do Componente

- **Separadores automáticos**: Adiciona dividers entre os itens automaticamente
- **FlatList otimizada**: Usa FlatList do React Native para renderização eficiente
- **Título opcional**: Permite adicionar um título descritivo acima da lista
- **Flexibilidade de conteúdo**: Aceita qualquer tipo de componente como children

## Estilização Customizada

Se precisar customizar a aparência dos separadores ou outros elementos, você pode usar as constantes do design system:

```typescript
import Constants from "lavex-design-system/constants";

// Cores disponíveis para separadores:
// Constants.styles.borderColor.LIGHT   - #DEE2E6
// Constants.styles.borderColor.MEDIUM  - #CED4DA

// Espaçamentos disponíveis:
// Constants.styles.spacing.TINY        - 4px
// Constants.styles.spacing.SMALL       - 8px
// Constants.styles.spacing.MEDIUM      - 16px
// Constants.styles.spacing.LARGE       - 24px
```
