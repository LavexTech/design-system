# Como utilizar - OfferList

O componente `OfferList` é usado para exibir uma lista de ofertas de serviço em formato vertical com separadores. Utiliza os componentes `List` e `Offer` internamente para mostrar valor, distância, informações do prestador e avaliação de cada oferta.

## Importação

```typescript
import { OfferList } from "lavex-design-system";
```

## Props

| Prop      | Tipo           | Obrigatório | Descrição                                    |
| --------- | -------------- | ----------- | -------------------------------------------- |
| `offers`  | `OfferProps[]` | Sim         | Array de objetos com informações das ofertas |

## Uso Básico

```tsx
import React from "react";
import { OfferList } from "lavex-design-system";

const MyComponent = () => {
  const offers = [
    {
      id: 1,
      amount: 150.00,
      distance: 3.5,
      user: {
        id: "1",
        name: "Maria Santos",
        profileImage: "https://picsum.photos/id/15/200",
        ordersCount: 48,
        rating: 4.8,
      },
    },
    {
      id: 2,
      amount: 180.00,
      distance: 2.1,
      user: {
        id: "2",
        name: "João Silva",
        profileImage: "https://picsum.photos/id/16/200",
        ordersCount: 32,
        rating: 4.5,
      },
    },
  ];

  return <OfferList offers={offers} />;
};
```

## Exemplo de Uso

```tsx
<OfferList
  offers={[
    {
      id: 1,
      amount: 200.50,
      distance: 2.3,
      user: {
        id: "1",
        name: "João Silva",
        profileImage: "https://picsum.photos/id/15/200",
        ordersCount: 32,
        rating: 4.5,
      },
      onClick: () => console.log("Oferta 1 selecionada"),
    },
    {
      id: 2,
      amount: 175.00,
      distance: 4.7,
      user: {
        id: "2",
        name: "Maria Santos",
        profileImage: "https://picsum.photos/id/16/200",
        ordersCount: 48,
        rating: 4.8,
      },
      onClick: () => console.log("Oferta 2 selecionada"),
    },
    {
      id: 3,
      amount: 150.00,
      distance: 5.2,
      user: {
        id: "3",
        name: "Carlos Oliveira",
        profileImage: "https://picsum.photos/id/17/200",
        ordersCount: 21,
        rating: 4.2,
      },
      onClick: () => console.log("Oferta 3 selecionada"),
    },
  ]}
/>
```

## Características

- Lista vertical de ofertas com título "Ofertas"
- Separadores automáticos entre os itens
- Cada oferta exibe valor, distância, prestador e avaliação
- Cards clicáveis quando `onClick` é fornecido
- Layout consistente usando componentes Card e Grid
- Integração com componentes List, Offer, Text, Info e Stars
- Performance otimizada para listas longas
- Organização hierárquica de informações

## Regras de Uso

1. O array `offers` deve conter pelo menos um item para exibir a lista
2. Cada oferta deve ter um `id` único para o `key` do React
3. O `amount` deve ser um número (será formatado com "R$" automaticamente)
4. A `distance` deve ser um número em quilômetros (será formatado com "km")
5. Sempre forneça um objeto `user` completo com todos os campos obrigatórios
6. O rating do usuário deve estar entre 0 e 5
7. O componente `onClick` é opcional para cada oferta
8. Ideal para telas de ofertas recebidas, disponíveis ou histórico de ofertas
9. Use dentro de um ScrollView quando houver muitas ofertas

