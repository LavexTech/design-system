# Como utilizar - Offer

O componente `Offer` é usado para exibir ofertas de serviço com informações do prestador. Apresenta o valor da oferta, distância, nome do usuário e sua avaliação em estrelas, ideal para listagens de ofertas recebidas.

## Importação

```typescript
import { Offer } from "lavex-design-system";
```

## Props

| Prop       | Tipo         | Obrigatório | Descrição                                       |
| ---------- | ------------ | ----------- | ----------------------------------------------- |
| `amount`   | `number`     | Sim         | Valor da oferta em reais                        |
| `distance` | `number`     | Sim         | Distância em quilômetros                        |
| `user`     | `User`       | Sim         | Objeto com as informações do prestador          |
| `onClick`  | `() => void` | Não         | Função chamada quando o card da oferta é clicado|

### Interface User

```typescript
interface User {
  id: string;           // Identificador único do usuário
  name: string;         // Nome do prestador
  profileImage: string; // URL da foto de perfil
  ordersCount: number;  // Quantidade de pedidos realizados
  rating: number;       // Avaliação de 1 a 5
}
```

## Uso Básico

```tsx
import React from "react";
import { Offer } from "lavex-design-system";

const MyComponent = () => {
  const user = {
    id: "1",
    name: "Maria Santos",
    profileImage: "https://example.com/avatar.jpg",
    ordersCount: 48,
    rating: 4.8,
  };

  return (
    <Offer 
      amount={150.00}
      distance={3.5}
      user={user}
    />
  );
};
```

## Exemplo de Uso

```tsx
<Offer
  amount={200.50}
  distance={2.3}
  user={{
    id: "1",
    name: "João Silva",
    profileImage: "https://picsum.photos/id/15/200",
    ordersCount: 32,
    rating: 4.5,
  }}
  onClick={() => console.log("Oferta selecionada")}
/>
```

## Características

- Layout em card com bordas arredondadas
- Valor em destaque com cor verde (success)
- Distância exibida no formato "Xkm"
- Nome do prestador de serviço
- Sistema de avaliação com estrelas visuais
- Exibição numérica da avaliação no formato "X/5"
- Organização hierárquica de informações (valor/distância no topo, usuário/avaliação abaixo)
- Suporte a interação por clique
- Espaçamento consistente entre elementos
- Integração com componentes Card, Grid, Text, Info e Stars

## Regras de Uso

1. O `amount` deve ser um número (será formatado automaticamente com "R$")
2. A `distance` deve ser um número em quilômetros (será formatado com "km")
3. Sempre forneça um objeto `user` completo com todos os campos obrigatórios
4. O componente é clicável apenas se `onClick` for fornecido
5. Ideal para uso em listas de ofertas recebidas ou disponíveis
6. O rating do usuário deve estar entre 0 e 5

