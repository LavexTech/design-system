# Como utilizar - UserCardVertical

O componente `UserCardVertical` é usado para exibir informações de um usuário em formato de card vertical. Ideal para mostrar perfis de usuários com foto, quantidade de pedidos e avaliação em estrelas.

## Importação

```typescript
import { UserCardVertical } from "lavex-design-system";
```

## Props

| Prop      | Tipo         | Obrigatório | Descrição                                    |
| --------- | ------------ | ----------- | -------------------------------------------- |
| `user`    | `User`       | Sim         | Objeto com as informações do usuário         |
| `onClick` | `() => void` | Não         | Função chamada quando o card é clicado       |

## Uso Básico

```tsx
import React from "react";
import { UserCardVertical } from "lavex-design-system";

const MyComponent = () => {
  const user = {
    id: "1",
    name: "João Silva",
    profileImage: "https://example.com/avatar.jpg",
    ordersCount: 25,
    rating: 4.5,
  };

  return <UserCardVertical user={user} />;
};
```

## Exemplo de Uso

```tsx
<UserCardVertical
  user={{
    id: "1",
    name: "Maria Santos",
    profileImage: "https://picsum.photos/id/15/200",
    ordersCount: 32,
    rating: 4.5,
  }}
  onClick={() => console.log("Usuário clicado")}
/>
```

## Características

- Foto de perfil circular
- Exibição da quantidade de pedidos
- Sistema de avaliação com estrelas (1 a 5)
- Rating arredondado para estrelas inteiras
- Borda sutil na imagem de perfil
- Suporte a interação por clique
- Layout vertical centralizado

## Boas Práticas

1. **URLs válidas**: Certifique-se de que as URLs das imagens de perfil estão funcionando
2. **Feedback ao clicar**: Implemente onClick para fornecer interação ao usuário
3. **Grid layout**: Use em conjunto com o componente Grid para layouts organizados
4. **Dados consistentes**: Mantenha o formato do objeto User consistente em toda aplicação

