# Como utilizar - MainTitle

O componente `MainTitle` é usado para títulos principais (Heading 1). Ele oferece estilização consistente e responsiva para títulos de destaque, sendo o nível mais alto na hierarquia de títulos do design system.

## Importação

```typescript
import { MainTitle } from "lavex-design-system";
```

## Props

| Prop       | Tipo                                    | Obrigatório | Padrão   | Descrição                                    |
| ---------- | --------------------------------------- | ----------- | -------- | -------------------------------------------- |
| `text`     | `string`                                | Sim         | -        | O texto que será exibido como título        |
| `position` | `'left' \| 'center' \| 'right'`         | Não         | `'left'` | Alinhamento horizontal do texto              |

## Uso Básico

```tsx
import React from "react";
import { MainTitle } from "lavex-design-system";

const MyComponent = () => {
  return <MainTitle text="Bem-vindo ao nosso app" />;
};
```

## Exemplos de Uso

### Título Principal da Página

```tsx
<MainTitle text="Dashboard" />
```

### Título Centralizado

```tsx
<MainTitle text="Configurações do Usuário" position="center" />
```

### Título Alinhado à Direita

```tsx
<MainTitle text="Perfil" position="right" />
```

### Título com Texto Longo

```tsx
<MainTitle text="Como configurar sua conta e personalizar suas preferências" />
```

## Características

- Tamanho de fonte maior (LARGEST - 36px)
- Peso da fonte em negrito (BOLD)
- Suporte a alinhamento horizontal (left, center, right)
- Quebra de linha automática para textos longos
- Cor de texto padrão do design system
- Fonte Roboto Regular
- Line height igual ao tamanho da fonte
- Flex wrap e shrink habilitados para responsividade

## Boas Práticas

1. **Use para títulos principais**: Reserve o MainTitle apenas para o título mais importante da página ou seção
2. **Seja conciso**: Títulos devem ser claros e diretos
3. **Considere a hierarquia**: Use MainTitle como o nível mais alto da hierarquia de títulos
4. **Alinhamento**: Use `position="center"` para títulos de destaque em telas de boas-vindas ou confirmação
5. **Teste a responsividade**: Verifique como o título se comporta em diferentes tamanhos de tela
6. **Evite múltiplos MainTitle**: Use apenas um MainTitle por tela para manter a hierarquia visual clara

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { MainTitle, Subtitle, Title, Text } from "lavex-design-system";

const HomeScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <MainTitle text="Bem-vindo ao Lavex Design System" />
      
      <View style={{ marginTop: 24 }}>
        <Subtitle text="Seção Principal" />
        <Title text="Subseção" />
        <Text text="Conteúdo da subseção com informações detalhadas" />
      </View>
    </View>
  );
};

export default HomeScreen;
```

