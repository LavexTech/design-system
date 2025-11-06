# Como utilizar - UserCardHorizontal

O componente `UserCardHorizontal` é usado para exibir informações de um usuário em formato de card horizontal. Ideal para listas de usuários com foto, nome, quantidade de pedidos e avaliação em estrelas, otimizado para preencher a largura disponível.

## Importação

```typescript
import { UserCardHorizontal } from "lavex-design-system";
```

## Props

| Prop      | Tipo         | Obrigatório | Descrição                                    |
| --------- | ------------ | ----------- | -------------------------------------------- |
| `user`    | `User`       | Sim         | Objeto com as informações do usuário         |
| `onClick` | `() => void` | Não         | Função chamada quando o card é clicado       |

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
import { UserCardHorizontal } from "lavex-design-system";

const MyComponent = () => {
  const user = {
    id: "1",
    name: "João Silva",
    profileImage: "https://example.com/avatar.jpg",
    ordersCount: 25,
    rating: 4.5,
  };

  return <UserCardHorizontal user={user} />;
};
```

## Exemplo de Uso

```tsx
<UserCardHorizontal
  user={{
    id: "1",
    name: "Fulano",
    profileImage: "https://picsum.photos/id/15/200",
    ordersCount: 32,
    rating: 4,
  }}
  onClick={() => console.log("Usuário clicado")}
/>
```

## Características

- Layout horizontal compacto
- Foto de perfil circular (60x60px)
- Nome do usuário em destaque
- Exibição da quantidade de pedidos
- Sistema de avaliação com estrelas (1 a 5)
- Rating arredondado para estrelas inteiras
- Borda sutil na imagem de perfil
- Suporte a interação por clique
- Otimizado para preencher a largura disponível

