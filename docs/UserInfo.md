# Como utilizar - UserInfo

O componente `UserInfo` exibe informações específicas de um usuário com label formatada e valor, com suporte a clique opcional.

## Importação

```typescript
import { UserInfo } from "lavex-design-system";
```

## Props

| Prop      | Tipo       | Obrigatório | Descrição                                                                 |
| --------- | ---------- | ----------- | ------------------------------------------------------------------------- |
| `user`    | `object`   | Sim          | Objeto contendo todas as informações do usuário                           |
| `type`    | `string`   | Sim          | Especifica qual informação do user deve ser exibida (ex: "name", "email") |
| `label`   | `string`   | Não          | Label personalizada para exibição (sobrescreve a label padrão)            |
| `onClick` | `function` | Não          | Função chamada quando o texto é clicado (opcional)                        |

## Uso Básico

```tsx
const user = {
  name: "João Silva",
  email: "joao@email.com",
  phone: "(11) 99999-9999"
};

<UserInfo user={user} type="name" />
<UserInfo user={user} type="email" label="E-mail de Contato" />
<UserInfo user={user} type="phone" onClick={() => alert("Editar telefone")} />
```

## Tipos Suportados

| Tipo       | Label Exibida |
| ---------- | ------------- |
| `name`     | NOME          |
| `email`    | E-MAIL        |
| `phone`    | TELEFONE      |
| `bio`      | BIO           |
| `company`  | EMPRESA       |
| `position` | CARGO         |
| `address`    | ENDEREÇO      |
| `age`        | IDADE         |

Para outros tipos, a label será capitalizada automaticamente. Use a prop `label` para personalizar a exibição.
