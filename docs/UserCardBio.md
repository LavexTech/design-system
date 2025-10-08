# Como utilizar - UserCardBio

O componente `UserCardBio` é usado para exibir informações de um usuário com uma seção dedicada à biografia. Ideal para mostrar perfis de usuários com foto, descrição detalhada, quantidade de pedidos e avaliação em estrelas.

## Importação

```typescript
import { UserCardBio } from "lavex-design-system";
```

## Props

| Prop      | Tipo         | Obrigatório | Descrição                                    |
| --------- | ------------ | ----------- | -------------------------------------------- |
| `user`    | `User`       | ✅          | Objeto com as informações do usuário         |
| `onClick` | `() => void` | ❌          | Função chamada quando o card é clicado       |

### Interface User

```typescript
interface User {
  id: string;           // Identificador único do usuário
  name: string;         // Nome do usuário
  profileImage: string; // URL da foto de perfil
  ordersCount: number;  // Quantidade de pedidos feitos
  rating: number;       // Avaliação de 1 a 5 (será arredondada)
  bio: string;          // Biografia ou descrição do usuário
}
```

## Uso Básico

```tsx
import React from "react";
import { UserCardBio } from "lavex-design-system";

const MyComponent = () => {
  const user = {
    id: "1",
    name: "João Silva",
    profileImage: "https://example.com/avatar.jpg",
    ordersCount: 25,
    rating: 4.5,
    bio: "Profissional experiente com foco em qualidade e excelência.",
  };

  return <UserCardBio user={user} />;
};
```

## Exemplo de Uso

```tsx
<UserCardBio
  user={{
    id: "1",
    name: "Fulano",
    profileImage: "https://picsum.photos/id/15/200",
    ordersCount: 32,
    rating: 4,
    bio: "Olá, eu sou o Fulano e uso produtos de primeira qualidade Padrão LAVEX",
  }}
  onClick={() => console.log("Usuário clicado")}
/>
```

## Características

- Foto de perfil circular (80x80px) à esquerda
- Seção de biografia ao lado da foto
- Informações centralizadas na parte inferior
- Exibição da quantidade de pedidos
- Sistema de avaliação com estrelas (1 a 5)
- Rating arredondado para estrelas inteiras
- Borda sutil na imagem de perfil
- Suporte a interação por clique
- Layout otimizado para textos descritivos
