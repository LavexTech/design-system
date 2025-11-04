# Como utilizar - UserList

O componente `UserList` é usado para exibir uma lista de usuários em formato vertical com separadores. Utiliza o componente `UserCardHorizontal` internamente para mostrar foto, nome, quantidade de pedidos e avaliação de cada usuário.

## Importação

```typescript
import { UserList } from "lavex-design-system";
```

## Props

| Prop          | Tipo                  | Obrigatório | Descrição                                      |
| ------------- | --------------------- | ----------- | ---------------------------------------------- |
| `users`       | `User[]`              | Sim         | Array de objetos com informações dos usuários  |
| `onUserClick` | `(user: User) => void`| Não         | Função chamada quando um usuário é clicado     |

### Interface User

```typescript
interface User {
  id: string;           // Identificador único do usuário
  name: string;         // Nome do usuário
  profileImage: string; // URL da foto de perfil
  ordersCount: number;  // Quantidade de pedidos feitos
  rating: number;       // Avaliação de 1 a 5 (será arredondada)
}
```

## Uso Básico

```tsx
import React from "react";
import { UserList } from "lavex-design-system";

const MyComponent = () => {
  const users = [
    {
      id: "1",
      name: "Fulano",
      profileImage: "https://picsum.photos/id/10/200",
      ordersCount: 32,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Sicrano",
      profileImage: "https://picsum.photos/id/11/200",
      ordersCount: 12,
      rating: 3.5,
    },
  ];

  return <UserList users={users} />;
};
```

## Exemplo de Uso

```tsx
<UserList
  users={[
    {
      id: "1",
      name: "Fulano",
      profileImage: "https://picsum.photos/id/10/200",
      ordersCount: 32,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Sicrano",
      profileImage: "https://picsum.photos/id/11/200",
      ordersCount: 12,
      rating: 3.5,
    },
    {
      id: "3",
      name: "Beltrano",
      profileImage: "https://picsum.photos/id/12/200",
      ordersCount: 1,
      rating: 1.5,
    },
  ]}
  onUserClick={(user) => console.log("Usuário clicado:", user.name)}
/>
```

## Características

- Lista vertical de usuários
- Separadores entre os itens
- Usa `UserCardHorizontal` para cada usuário
- Callback opcional para clique em usuários
