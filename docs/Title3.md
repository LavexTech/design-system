# Como utilizar - Title3

O componente `Title3` é usado para títulos terciários (Heading 3). Ele oferece estilização consistente e responsiva para títulos de nível menor na hierarquia.

## Importação

```typescript
import { Title3 } from "lavex-design-system";
// ou
import { Title3, type Title3Props } from "lavex-design-system";
```

## Props

| Prop   | Tipo     | Obrigatório | Descrição                            |
| ------ | -------- | ----------- | ------------------------------------ |
| `text` | `string` | ✅          | O texto que será exibido como título |

## Uso Básico

```tsx
import React from "react";
import { Title3 } from "lavex-design-system";

const MyComponent = () => {
  return <Title3 text="Subseção" />;
};
```

## Exemplos de Uso

### Título de Subseção

```tsx
<Title3 text="Detalhes" />
```

### Título de Card

```tsx
<Title3 text="Informações Pessoais" />
```

### Título com Texto Longo

```tsx
<Title3 text="Como configurar notificações push no seu dispositivo" />
```

## Estilização

O componente já vem com estilos pré-definidos que seguem o design system. Não é necessário aplicar estilos adicionais na maioria dos casos.

### Cores de Texto Disponíveis

Se precisar de cores diferentes, você pode usar as constantes do design system:

```typescript
import Constants from "lavex-design-system/constants";

// Cores disponíveis:
// Constants.styles.textColor.DEFAULT   - #262627
// Constants.styles.textColor.SUCCESS   - #059669
// Constants.styles.textColor.DANGER    - #DC2626
// Constants.styles.textColor.INFO      - #2563EB
```

## Boas Práticas

1. **Use para títulos terciários**: Reserve o Title3 para subseções e títulos de menor importância
2. **Hierarquia clara**: Use Title3 após Title2 na hierarquia de títulos
3. **Seja específico**: Títulos devem ser claros sobre o conteúdo específico da subseção
4. **Consistência**: Mantenha o mesmo padrão de nomenclatura em toda a aplicação

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { Title1, Title2, Title3 } from "lavex-design-system";

const HomeScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title1 text="Dashboard" />
      <Title2 text="Resumo Financeiro" />
      <Title3 text="Receitas do Mês" />
      {/* Outros componentes da página */}
    </View>
  );
};

export default HomeScreen;
```
