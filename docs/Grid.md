# Grid Component

O componente Grid é usado para organizar componentes em uma estrutura de colunas e linhas, preenchendo o espaço disponível. Perfeito para qualquer layout onde múltiplos itens precisam ser exibidos de forma alinhada e visualmente agradável.

## Props

| Prop       | Tipo              | Obrigatório | Padrão | Descrição                                                                             |
| ---------- | ----------------- | ----------- | ------ | ------------------------------------------------------------------------------------- |
| `children` | `React.ReactNode` | ✅          | -      | Os componentes que serão organizados dentro da grade (ex: Cards, Images)              |
| `columns`  | `number`          | ✅          | -      | O número de colunas que a grade terá, definindo quantos itens aparecerão lado a lado  |
| `gap`      | `number`          | ❌          | `8`    | Define o espaçamento (a lacuna) entre cada item na grade, para que não fiquem colados |

## Como Funciona

O Grid utiliza `flexWrap` para criar uma estrutura responsiva que:

- Organiza os itens em linhas
- Distribui uniformemente o espaço disponível entre as colunas
- Quebra automaticamente para a próxima linha quando necessário
- Mantém espaçamento consistente entre os itens

## Exemplos de Uso

### Grid Básico com 2 Colunas

```tsx
import { Grid, Card } from "lavex-design-system";

<Grid columns={2}>
  <Card title="Item 1">Conteúdo do primeiro item</Card>
  <Card title="Item 2">Conteúdo do segundo item</Card>
  <Card title="Item 3">Conteúdo do terceiro item</Card>
  <Card title="Item 4">Conteúdo do quarto item</Card>
</Grid>;
```

### Grid com 3 Colunas e Espaçamento Personalizado

```tsx
import { Grid, Card } from "lavex-design-system";

<Grid columns={3} gap={16}>
  <Card title="Produto 1">Descrição do produto</Card>
  <Card title="Produto 2">Descrição do produto</Card>
  <Card title="Produto 3">Descrição do produto</Card>
  <Card title="Produto 4">Descrição do produto</Card>
  <Card title="Produto 5">Descrição do produto</Card>
  <Card title="Produto 6">Descrição do produto</Card>
</Grid>;
```

### Grid com 4 Colunas para Galeria de Imagens

```tsx
import { Grid, Card } from "lavex-design-system";

<Grid columns={4} gap={4}>
  <Card>Imagem 1</Card>
  <Card>Imagem 2</Card>
  <Card>Imagem 3</Card>
  <Card>Imagem 4</Card>
  <Card>Imagem 5</Card>
  <Card>Imagem 6</Card>
  <Card>Imagem 7</Card>
  <Card>Imagem 8</Card>
</Grid>;
```

### Grid com Componentes Mistos

```tsx
import { Grid, Card, Button } from "lavex-design-system";

<Grid columns={2} gap={12}>
  <Card title="Informações">
    <Text>Detalhes importantes</Text>
  </Card>
  <Button text="Ação" onClick={() => {}} />
  <Card title="Mais Informações">
    <Text>Outros detalhes</Text>
  </Card>
  <Button text="Outra Ação" onClick={() => {}} />
</Grid>;
```

## Valores de Espaçamento Recomendados

O componente utiliza as constantes do design system para espaçamento:

- **TINY (4px)**: Para layouts muito compactos
- **SMALL (8px)**: Padrão recomendado para a maioria dos casos
- **MEDIUM (16px)**: Para layouts com mais respiração
- **LARGE (24px)**: Para layouts espaçosos
- **EXTRA_LARGE (32px)**: Para layouts muito espaçosos

## Diretrizes de Uso

1. **Responsividade**: O Grid se adapta automaticamente ao tamanho da tela
2. **Consistência**: Use o mesmo número de colunas em seções relacionadas
3. **Espaçamento**: Mantenha espaçamento consistente entre diferentes grids na mesma tela
4. **Conteúdo**: Certifique-se de que os itens dentro do grid tenham tamanhos similares para melhor aparência
5. **Performance**: Para listas grandes, considere usar FlatList com numColumns ao invés do Grid

## Casos de Uso Comuns

- **Galeria de Produtos**: Exibir produtos em grade organizada
- **Galeria de Imagens**: Mostrar fotos em layout de colunas
- **Cards de Informação**: Organizar informações em cards alinhados
- **Botões de Ação**: Agrupar botões relacionados
- **Lista de Recursos**: Exibir características ou benefícios
- **Dashboard**: Organizar widgets e métricas
- **Menu de Opções**: Dispor opções de forma organizada

## Limitações

- O Grid não é otimizado para listas muito grandes (use FlatList para performance)
- Todos os itens têm a mesma largura baseada no número de colunas
- O espaçamento é aplicado uniformemente entre todos os itens
