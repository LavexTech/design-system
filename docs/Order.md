# Como utilizar - Order

O componente `Order` é usado para exibir informações detalhadas de um pedido. Apresenta o título do pedido, data de criação, galeria de imagens e lista de itens com suas quantidades, ideal para visualização de pedidos realizados.

## Importação

```typescript
import { Order } from "lavex-design-system";
```

## Props

| Prop        | Tipo          | Obrigatório | Descrição                                    |
| ----------- | ------------- | ----------- | -------------------------------------------- |
| `title`     | `string`      | Sim         | Título do pedido                             |
| `createdAt` | `Date`        | Sim         | Data de criação do pedido                    |
| `itemList`  | `OrderItem[]` | Sim         | Lista de itens do pedido                     |
| `images`    | `string[]`    | Não         | Array de URLs das imagens do pedido          |

### Interface OrderItem

```typescript
interface OrderItem {
  quantity: number; // Quantidade do item
  name: string;     // Nome/descrição do item
}
```

## Uso Básico

```tsx
import React from "react";
import { Order } from "lavex-design-system";

const MyComponent = () => {
  const items = [
    { quantity: 2, name: "Lavagem de roupa" },
    { quantity: 1, name: "Passagem de roupa" }
  ];

  const images = [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg"
  ];

  return (
    <Order 
      title="Serviço de Lavanderia"
      createdAt={new Date("2024-03-15")}
      itemList={items}
      images={images}
    />
  );
};
```

## Exemplo de Uso

```tsx
<Order
  title="Lavagem e Passagem"
  createdAt={new Date()}
  itemList={[
    { quantity: 3, name: "Camisa social" },
    { quantity: 2, name: "Calça jeans" },
    { quantity: 1, name: "Edredom casal" }
  ]}
  images={[
    "https://picsum.photos/id/10/400",
    "https://picsum.photos/id/20/400",
    "https://picsum.photos/id/30/400"
  ]}
/>
```

## Características

- Layout em card com estrutura vertical organizada
- Título em destaque usando componente Subtitle
- Data de criação formatada automaticamente para pt-BR
- Galeria de imagens integrada (scrollável horizontalmente)
- Lista de itens formatada com quantidade e nome (ex: "2x Camisa social")
- Informações claramente separadas em seções
- Espaçamento consistente entre elementos
- Integração com componentes Card, Grid, Subtitle, Info, Gallery e TextList
- Responsivo e adaptável a diferentes tamanhos de tela

## Regras de Uso

1. O `title` deve ser uma string descritiva do pedido
2. O `createdAt` deve ser um objeto Date válido (será formatado automaticamente)
3. O `itemList` deve conter ao menos um item com `quantity` e `name`
4. O array `images` pode estar vazio, mas deve ser fornecido
5. A quantidade de cada item deve ser um número positivo
6. As URLs das imagens devem ser válidas e acessíveis
7. A data é automaticamente formatada para o padrão brasileiro (dd/MM/yyyy)
8. Ideal para uso em telas de histórico de pedidos ou detalhes de pedido


