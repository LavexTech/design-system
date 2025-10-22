# Como utilizar - Grid

O componente `Grid` é usado para organizar componentes em uma estrutura de colunas responsiva. Utiliza o sistema de grid do gluestack-ui internamente, oferecendo controle total sobre o layout e espaçamento.

## Importação

```typescript
import { Grid, GridItem } from "lavex-design-system";
```

## Props

| Prop   | Tipo              | Obrigatório | Padrão | Descrição                                                                             |
| ------ | ----------------- | ----------- | ------ | ------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode` | ✅          | -      | Os componentes que serão organizados dentro da grade                                   |
| `columns`  | `number`          | ❌          | `12`   | O número de colunas que a grade terá                                                  |
| `gap`      | `number`          | ❌          | -      | Espaçamento uniforme entre todos os itens                                             |
| `gapX`     | `number`          | ❌          | -      | Espaçamento horizontal entre os itens                                                 |
| `gapY`     | `number`          | ❌          | -      | Espaçamento vertical entre os itens                                                   |

## GridItem Props

| Prop      | Tipo              | Obrigatório | Padrão | Descrição                                    |
| --------- | ----------------- | ----------- | ------ | -------------------------------------------- |
| `children`| `React.ReactNode` | ✅          | -      | O conteúdo do item                           |
| `colSpan` | `number`          | ❌          | `1`    | Número de colunas que o item deve ocupar    |

## Uso Básico

```tsx
import React from "react";
import { Grid } from "lavex-design-system";

const MyComponent = () => {
  return (
    <Grid columns={3} gap={4}>
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
    </Grid>
  );
};
```

## Exemplos de Uso

### Grid com Colunas Customizadas

```tsx
<Grid columns={10} gap={4}>
  <GridItem colSpan={3}>
    <Card>Item 1 (3/10)</Card>
  </GridItem>
  <GridItem colSpan={5}>
    <Card>Item 2 (5/10)</Card>
  </GridItem>
  <GridItem colSpan={2}>
    <Card>Item 3 (2/10)</Card>
  </GridItem>
</Grid>
```

### Grid com Espaçamentos Diferentes

```tsx
<Grid columns={3} gapY={2} gapX={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
  <Card>Item 5</Card>
  <Card>Item 6</Card>
</Grid>
```

## Boas Práticas

1. **Use GridItem para controle preciso**: Quando precisar de larguras customizadas, use GridItem com colSpan
2. **Mantenha consistência**: Use o mesmo número de colunas em seções relacionadas
3. **Considere responsividade**: O grid se adapta automaticamente ao tamanho da tela
4. **Use gaps apropriados**: Diferentes gaps para horizontal e vertical quando necessário

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { Grid, GridItem, Card } from "lavex-design-system";

const ProductGrid = () => {
  return (
    <View style={{ padding: 20 }}>
      <Grid columns={12} gap={4}>
        <GridItem colSpan={4}>
          <Card>Produto em Destaque</Card>
        </GridItem>
        <GridItem colSpan={8}>
          <Card>Descrição do Produto</Card>
        </GridItem>
        <GridItem colSpan={6}>
          <Card>Produto 1</Card>
        </GridItem>
        <GridItem colSpan={6}>
          <Card>Produto 2</Card>
        </GridItem>
      </Grid>
    </View>
  );
};

export default ProductGrid;
```
