# Como utilizar - OrderList

O componente `OrderList` é usado para exibir uma lista de pedidos em formato de accordion (expansível/colapsável). Cada pedido é renderizado como um item do accordion, mostrando o título no cabeçalho e os detalhes do pedido quando expandido.

## Importação

```typescript
import { OrderList } from "lavex-design-system";
```

## Props

| Prop     | Tipo      | Obrigatório | Descrição                          |
| -------- | --------- | ----------- | ---------------------------------- |
| `orders` | `Order[]` | Sim         | Array de objetos com dados dos pedidos |


## Uso Básico

```tsx
import React from "react";
import { OrderList } from "lavex-design-system";

const MyComponent = () => {
  const orders = [
    {
      id: 1,
      title: "Pedido #1234",
      createdAt: new Date("2024-03-15"),
      itemList: [
        { quantity: 2, name: "Lavagem de roupa" },
        { quantity: 1, name: "Passagem de roupa" }
      ],
      images: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg"
      ]
    },
    {
      id: 2,
      title: "Pedido #1235",
      createdAt: new Date("2024-03-16"),
      itemList: [
        { quantity: 3, name: "Camisa social" },
        { quantity: 1, name: "Edredom casal" }
      ]
    }
  ];

  return <OrderList orders={orders} />;
};
```

## Exemplo de Uso

```tsx
const ordersData = [
  {
    id: 1,
    title: "Pedido #5678 - Lavagem Completa",
    createdAt: new Date("2024-03-15"),
    itemList: [
      { quantity: 3, name: "Camisa social" },
      { quantity: 2, name: "Calça jeans" },
      { quantity: 1, name: "Edredom casal" }
    ],
    images: [
      "https://picsum.photos/id/10/400",
      "https://picsum.photos/id/20/400"
    ]
  },
  {
    id: 2,
    title: "Pedido #5679 - Serviço Express",
    createdAt: new Date("2024-03-16"),
    itemList: [
      { quantity: 5, name: "Camiseta" },
      { quantity: 2, name: "Toalha de banho" }
    ],
    images: ["https://picsum.photos/id/30/400"]
  },
  {
    id: 3,
    title: "Pedido #5680 - Lavagem Simples",
    createdAt: new Date("2024-03-17"),
    itemList: [
      { quantity: 1, name: "Jaqueta" }
    ]
  }
];

<OrderList orders={ordersData} />
```

## Características

- Lista de pedidos em formato accordion (expansível/colapsável)
- Cada pedido exibe o título no cabeçalho
- Ao expandir, mostra todos os detalhes do pedido (data, galeria, itens)
- Integração com componentes Accordion, AccordionItem e Order
- Permite múltiplos pedidos expandidos simultaneamente
- Ícones + / - indicam estado expandido/colapsado
- Layout compacto ideal para visualizar vários pedidos
- Data formatada automaticamente para pt-BR
- Suporte a galeria de imagens (quando fornecida)
- Scroll automático quando necessário

## Regras de Uso

1. O array `orders` deve conter pelo menos um pedido
2. Cada pedido deve ter um `id` numérico único
3. O `title` é obrigatório e será exibido no cabeçalho do accordion
4. O `createdAt` deve ser um objeto Date válido
5. O `itemList` deve conter ao menos um item com `quantity` e `name`
6. O array `images` é opcional e pode ser omitido ou vazio
7. A prop `showTitle` é definida internamente como `false` para evitar duplicação do título
8. Ideal para uso em telas de histórico de pedidos ou lista de pedidos do usuário
9. O componente herda todas as funcionalidades do componente Order
10. Cada item do accordion usa o `id` do pedido convertido para string como identificador


