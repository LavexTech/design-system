# Como utilizar - Title2

O componente `Title2` é usado para títulos secundários (Heading 2). Ele oferece estilização consistente e responsiva para títulos de nível médio na hierarquia.

## Importação

```typescript
import { Title2 } from "lavex-design-system";
// ou
import { Title2, type Title2Props } from "lavex-design-system";
```

## Props

| Prop   | Tipo     | Obrigatório | Descrição                            |
| ------ | -------- | ----------- | ------------------------------------ |
| `text` | `string` | ✅          | O texto que será exibido como título |

## Uso Básico

```tsx
import React from "react";
import { Title2 } from "lavex-design-system";

const MyComponent = () => {
  return <Title2 text="Seção Principal" />;
};
```

## Exemplos de Uso

### Título de Seção

```tsx
<Title2 text="Configurações" />
```

### Título de Subseção

```tsx
<Title2 text="Perfil do Usuário" />
```

### Título com Texto Longo

```tsx
<Title2 text="Como personalizar suas preferências de notificação" />
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

1. **Use para títulos secundários**: Reserve o Title2 para seções importantes, mas não o título principal
2. **Hierarquia clara**: Use Title2 após Title1 na hierarquia de títulos
3. **Seja descritivo**: Títulos devem indicar claramente o conteúdo da seção
4. **Consistência**: Mantenha o mesmo padrão de nomenclatura em toda a aplicação

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { Title1, Title2 } from "lavex-design-system";

const HomeScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title1 text="Dashboard" />
      <Title2 text="Resumo Financeiro" />
      {/* Outros componentes da página */}
    </View>
  );
};

export default HomeScreen;
```
