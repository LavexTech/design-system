# Button Component

O componente Button é usado para ações interativas como "Salvar", "Cancelar" ou "Enviar".

## Props

| Prop      | Tipo                                                                                             | Obrigatório | Padrão      | Descrição                           |
| --------- | ------------------------------------------------------------------------------------------------ | ----------- | ----------- | ----------------------------------- |
| `text`    | `string`                                                                                         | ✅          | -           | Texto exibido no botão              |
| `variant` | `"default" \| "default-outline" \| "success" \| "success-outline" \| "danger" \| "danger-outline"` | ❌          | `"default"` | Define o estilo e a cor do botão    |
| `onClick` | `() => void`                                                                                     | ✅          | -           | Função executada ao clicar no botão |

## Variantes Disponíveis

### Default (Padrão)

- **Aparência**: Botão preenchido com cor primária
- **Texto**: Branco
- **Uso**: Ações primárias gerais

### Default Outline

- **Aparência**: Botão com borda primária
- **Texto**: Cor primária
- **Uso**: Ações secundárias gerais

### Success

- **Aparência**: Botão preenchido com cor verde
- **Texto**: Branco
- **Uso**: Ações positivas como "Salvar", "Confirmar", "Enviar"

### Success Outline

- **Aparência**: Botão com borda verde
- **Texto**: Verde
- **Uso**: Ações positivas secundárias

### Danger

- **Aparência**: Botão preenchido com cor vermelha
- **Texto**: Branco
- **Uso**: Ações destrutivas como "Excluir", "Remover"

### Danger Outline

- **Aparência**: Botão com borda vermelha
- **Texto**: Vermelho
- **Uso**: Ações destrutivas secundárias como "Cancelar"

## Exemplos de Uso

### Botão Default (Padrão)

```tsx
import { Button } from "lavex-design-system";

<Button text="Salvar" onClick={() => console.log("Salvando...")} />;
```

### Botão Success

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Confirmar"
  variant="success"
  onClick={() => console.log("Confirmando...")}
/>;
```

### Botão Success Outline

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Enviar"
  variant="success-outline"
  onClick={() => console.log("Enviando...")}
/>;
```

### Botão Danger

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Excluir"
  variant="danger"
  onClick={() => console.log("Excluindo...")}
/>;
```

### Botão Danger Outline

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Cancelar"
  variant="danger-outline"
  onClick={() => console.log("Cancelando...")}
/>;
```

### Botão Default Outline

```tsx
import { Button } from "lavex-design-system";

<Button
  text="Voltar"
  variant="default-outline"
  onClick={() => console.log("Voltando...")}
/>;
```

## Diretrizes de Uso

1. **Hierarquia Visual**: Use variantes sólidas (`default`, `success`, `danger`) para ações primárias e variantes outline (`default-outline`, `success-outline`, `danger-outline`) para ações secundárias
2. **Cores Semânticas**: Use `success` para ações positivas, `danger` para ações destrutivas e `default` para ações gerais
3. **Texto Descritivo**: Use textos claros e específicos (ex: "Salvar Alterações" em vez de apenas "Salvar")
4. **Agrupamento**: Agrupe botões relacionados e mantenha consistência visual
5. **Espaçamento**: Mantenha espaçamento adequado entre botões para facilitar o toque
6. **Variante Padrão**: O botão usa `variant="default"` quando nenhuma variante é especificada

## Casos de Uso Comuns

- **Formulários**: Botões de "Salvar" e "Cancelar"
- **Confirmações**: Botões de "Confirmar" e "Cancelar"
- **Navegação**: Botões de "Próximo" e "Voltar"
- **Ações Destrutivas**: Botões de "Excluir" e "Remover"
- **Upload/Download**: Botões de "Enviar" e "Baixar"
