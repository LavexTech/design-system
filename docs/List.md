# List

Componente para exibir uma lista de itens com separadores automáticos.

## Importação

```typescript
import { List } from "lavex-design-system";
```

## Props

| Prop       | Tipo              | Obrigatório | Descrição                         |
| ---------- | ----------------- | ----------- | --------------------------------- |
| `title`    | `string`          | Não         | Título opcional acima da lista    |
| `children` | `React.ReactNode` | Sim         | Itens a serem exibidos na lista   |

## O que faz

- Renderiza múltiplos componentes em sequência vertical
- Adiciona separadores automáticos entre os itens
- Usa FlatList do React Native para performance
- Scroll interno desabilitado (deve ser usado dentro de ScrollView)

## Exemplo Básico

```tsx
import { List, Text } from "lavex-design-system";

<List title="Tarefas">
  <Text text="Item 1" />
  <Text text="Item 2" />
  <Text text="Item 3" />
</List>
```

## Exemplo com Cards

```tsx
import { List, Card } from "lavex-design-system";

<List title="Produtos">
  <Card title="Produto 1">
    <Text text="Descrição 1" />
  </Card>
  <Card title="Produto 2">
    <Text text="Descrição 2" />
  </Card>
</List>
```

## Exemplo sem Título

```tsx
import { List, Card } from "lavex-design-system";

<List>
  <Card title="Item 1" />
  <Card title="Item 2" />
</List>
```

## Como funciona

1. Converte os `children` em array usando `React.Children.toArray()`
2. Renderiza cada item dentro de um `View` container
3. Adiciona separadores entre os itens (linha cinza de 1px)
4. Usa Grid com 1 coluna para layout
5. Título renderizado com componente `Subtitle`

## Estilos

- **Separador**: 1px de altura, cor cinza claro, margem vertical pequena
- **Container**: Largura 100%
- **Layout**: Grid com 1 coluna e gap de 4

## Observações

- Não tem scroll próprio, deve ser usado dentro de `ScrollView`
- Separadores não são customizáveis
- Aceita qualquer componente React como children
