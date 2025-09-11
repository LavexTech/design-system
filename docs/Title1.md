# Como utilizar - Title1

O componente `Title1` é usado para títulos principais (Heading 1). Ele oferece estilização consistente e responsiva para títulos de destaque.

## Importação

```typescript
import { Title1 } from "lavex-design-system";
```

## Props

| Prop   | Tipo     | Obrigatório | Descrição                            |
| ------ | -------- | ----------- | ------------------------------------ |
| `text` | `string` | ✅          | O texto que será exibido como título |

## Uso Básico

```tsx
import React from "react";
import { Title1 } from "lavex-design-system";

const MyComponent = () => {
  return <Title1 text="Bem-vindo ao nosso app" />;
};
```

## Exemplos de Uso

### Título Principal da Página

```tsx
<Title1 text="Dashboard" />
```

### Título de Seção

```tsx
<Title1 text="Configurações do Usuário" />
```

### Título com Texto Longo

```tsx
<Title1 text="Como configurar sua conta e personalizar suas preferências" />
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

1. **Use para títulos principais**: Reserve o Title1 apenas para o título mais importante da página ou seção
2. **Seja conciso**: Títulos devem ser claros e diretos
3. **Considere a hierarquia**: Use Title1 como o nível mais alto da hierarquia de títulos
4. **Teste a responsividade**: Verifique como o título se comporta em diferentes tamanhos de tela

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { Title1 } from "lavex-design-system";

const HomeScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title1 text="Bem-vindo ao Lavex Design System" />
      {/* Outros componentes da página */}
    </View>
  );
};

export default HomeScreen;
```
