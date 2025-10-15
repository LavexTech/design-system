# List Component

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

## Características do Componente

- **Separadores automáticos**: Adiciona dividers entre os itens automaticamente
- **FlatList otimizada**: Usa FlatList do React Native para renderização eficiente
- **Título opcional**: Permite adicionar um título descritivo acima da lista
- **Flexibilidade de conteúdo**: Aceita qualquer tipo de componente como children
- **Scroll desabilitado**: Por padrão, o scroll interno está desabilitado para uso em ScrollViews
- **Performance otimizada**: Renderização eficiente com FlatList nativa

## Exemplos de Uso

### Lista Básica com Textos

```tsx
import React from "react";
import { List, Text } from "lavex-design-system";

const MyComponent = () => {
  return (
    <List title="Lista de Tarefas">
      <Text text="Comprar leite" />
      <Text text="Fazer exercícios" />
      <Text text="Ler livro" />
    </List>
  );
};
```

### Lista com Cards

```tsx
import React from "react";
import { List, Card, Text } from "lavex-design-system";

const MyComponent = () => {
  return (
    <List title="Produtos">
      <Card title="Produto 1">
        <Text text="Descrição do primeiro produto" />
      </Card>
      <Card title="Produto 2">
        <Text text="Descrição do segundo produto" />
      </Card>
      <Card title="Produto 3">
        <Text text="Descrição do terceiro produto" />
      </Card>
    </List>
  );
};
```

### Lista Sem Título

```tsx
import React from "react";
import { List, Card } from "lavex-design-system";

const MyComponent = () => {
  return (
    <List>
      <Card title="Item 1" />
      <Card title="Item 2" />
      <Card title="Item 3" />
    </List>
  );
};
```

### Lista com Componentes Mistos

```tsx
import React from "react";
import { List, Card, Text, Info } from "lavex-design-system";

const MyComponent = () => {
  return (
    <List title="Dashboard">
      <Card title="Estatísticas">
        <Text text="Dados importantes" />
      </Card>
      <Info text="Informação adicional" />
      <Card title="Ações">
        <Text text="Botões de ação" />
      </Card>
    </List>
  );
};
```

## Estrutura Interna

O componente `List` utiliza uma estrutura baseada em Grid com as seguintes características:

- **Grid Container**: Usa `Grid` com 1 coluna para organizar o título e a lista
- **FlatList**: Renderiza os itens usando `FlatList` do React Native
- **Separadores**: Adiciona automaticamente separadores visuais entre os itens
- **Estilização**: Aplica estilos consistentes usando as constantes do design system

### Estilos Aplicados

- **Título**: Fonte média (18px), peso bold, cor padrão, margem inferior de 16px
- **Container do item**: Largura 100% para ocupar todo o espaço disponível
- **Separador**: Altura 1px, cor cinza claro, margem vertical de 8px


## Considerações de Performance

- O componente usa `FlatList` para renderização eficiente
- O scroll interno está desabilitado por padrão (`scrollEnabled={false}`)
- Ideal para uso dentro de `ScrollView` para controle de scroll unificado
- Renderização otimizada para listas com muitos itens

## Limitações

- Não suporta scroll interno (use dentro de ScrollView se necessário)
- Separadores são fixos e não podem ser customizados via props
- Não suporta lazy loading ou paginação (use FlatList diretamente se necessário)
