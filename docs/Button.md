# Button Component

O componente Button é usado para ações interativas como "Salvar", "Cancelar" ou "Enviar".

## Props

| Prop      | Tipo                       | Obrigatório | Padrão        | Descrição                           |
| --------- | -------------------------- | ----------- | ------------- | ----------------------------------- |
| `text`    | `string`                   | ✅          | -             | Texto exibido no botão              |
| `type`    | `"danger" \| "success"`    | ❌          | `"success"`   | Define a cor do botão               |
| `style`   | `"fullfiled" \| "outline"` | ❌          | `"fullfiled"` | Define o estilo visual do botão     |
| `onClick` | `() => void`               | ✅          | -             | Função executada ao clicar no botão |

## Tipos de Botão

### Success (Padrão)

- **Cor**: Verde (`#059669`)
- **Uso**: Ações positivas como "Salvar", "Confirmar", "Enviar"

### Danger

- **Cor**: Vermelho (`#DC2626`)
- **Uso**: Ações destrutivas como "Cancelar", "Excluir", "Remover"

## Estilos de Botão

### Fullfiled (Padrão)

- **Aparência**: Botão preenchido com cor de fundo
- **Texto**: Branco
- **Uso**: Ações primárias importantes

### Outline

- **Aparência**: Botão com apenas borda colorida
- **Texto**: Cor correspondente ao tipo
- **Uso**: Ações secundárias ou menos importantes

## Exemplos de Uso

### Botão Success Fullfiled (Padrão)

```tsx
import { Button } from "lavex-design-system";

<Button text="Salvar" onClick={() => console.log("Salvando...")} />;
```

### Botão Danger Outline

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Cancelar"
  type="danger"
  style="outline"
  onClick={() => console.log("Cancelando...")}
/>;
```

### Botão Success Outline

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Enviar"
  type="success"
  style="outline"
  onClick={() => console.log("Enviando...")}
/>;
```

### Botão Danger Fullfiled

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Excluir"
  type="danger"
  style="fullfiled"
  onClick={() => console.log("Excluindo...")}
/>;
```

## Diretrizes de Uso

1. **Hierarquia Visual**: Use botões `fullfiled` para ações primárias e `outline` para ações secundárias
2. **Cores Semânticas**: Use `success` para ações positivas e `danger` para ações destrutivas
3. **Texto Descritivo**: Use textos claros e específicos (ex: "Salvar Alterações" em vez de apenas "Salvar")
4. **Agrupamento**: Agrupe botões relacionados e mantenha consistência visual
5. **Espaçamento**: Mantenha espaçamento adequado entre botões para facilitar o toque

## Casos de Uso Comuns

- **Formulários**: Botões de "Salvar" e "Cancelar"
- **Confirmações**: Botões de "Confirmar" e "Cancelar"
- **Navegação**: Botões de "Próximo" e "Voltar"
- **Ações Destrutivas**: Botões de "Excluir" e "Remover"
- **Upload/Download**: Botões de "Enviar" e "Baixar"
