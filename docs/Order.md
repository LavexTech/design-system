# Como utilizar - Order

O componente `Order` é usado para exibir informações detalhadas de um pedido. Apresenta o título do pedido, data de criação, galeria de imagens e lista de itens com suas quantidades, ideal para visualização de pedidos realizados.

## Importação

```typescript
import { Order } from "lavex-design-system";
```

## Props

| Prop         | Tipo         | Obrigatório | Descrição                                                                 |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------- |
| `order`      | `Order`      | Sim         | Objeto contendo dados do pedido                                           |
| `backTarget` | `() => void` | Não         | Destino/ação ao voltar. Se informado, exibe chevron-left e habilita swipe da borda esquerda (e back do Android). |

### Interface Order

```typescript
interface Order {
  id: number;           // Identificador único do pedido
  title: string;        // Título do pedido
  createdAt: Date;      // Data de criação do pedido
  itemList: OrderItem[]; // Lista de itens do pedido
  images?: string[];    // Array de URLs das imagens do pedido (opcional)
}
```

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
  const orderSample = {
    id: "xpto1234",
    title: "Serviço de Lavanderia",
    createdAt: new Date("2024-03-15"),
    itemList: [
      { quantity: 2, name: "Lavagem de roupa" },
      { quantity: 1, name: "Passagem de roupa" }
    ],
    images: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg"
    ]
  };

  return (
    <Order
      order={orderSample}
      backTarget={() => {
        // mesmo comportamento do botão voltar do Android
      }}
    />
  );
};
```

## Exemplo de Uso

```tsx
const orderData = {
  id: "order-5678",
  title: "Lavagem e Passagem",
  createdAt: new Date(),
  itemList: [
    { quantity: 3, name: "Camisa social" },
    { quantity: 2, name: "Calça jeans" },
    { quantity: 1, name: "Edredom casal" }
  ],
  images: [
    "https://picsum.photos/id/10/400",
    "https://picsum.photos/id/20/400",
    "https://picsum.photos/id/30/400"
  ]
};

<Order order={orderData} />
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

1. O objeto `order` deve conter todas as propriedades obrigatórias
2. O `id` deve ser uma string única que identifica o pedido
3. O `title` deve ser uma string descritiva do pedido
4. O `createdAt` deve ser um objeto Date válido (será formatado automaticamente)
5. O `itemList` deve conter ao menos um item com `quantity` e `name`
6. O array `images` é opcional e pode ser omitido ou vazio
7. A quantidade de cada item deve ser um número positivo
8. As URLs das imagens devem ser válidas e acessíveis
9. A data é automaticamente formatada para o padrão brasileiro (dd/MM/yyyy)
10. Ideal para uso em telas de histórico de pedidos ou detalhes de pedido


