# Como utilizar - Subtitle

O componente `Subtitle` é usado para títulos secundários (Heading 2). Ele oferece estilização consistente e responsiva para títulos de nível médio na hierarquia, ideal para seções importantes dentro de uma página.

## Importação

```typescript
import { Subtitle } from "lavex-design-system";
```

## Props

| Prop       | Tipo                                    | Obrigatório | Padrão   | Descrição                                    |
| ---------- | --------------------------------------- | ----------- | -------- | -------------------------------------------- |
| `text`     | `string`                                | Sim         | -        | O texto que será exibido como subtítulo     |
| `position` | `'left' \| 'center' \| 'right'`         | Não         | `'left'` | Alinhamento horizontal do texto              |

## Uso Básico

```tsx
import React from "react";
import { Subtitle } from "lavex-design-system";

const MyComponent = () => {
  return <Subtitle text="Seção Principal" />;
};
```

## Exemplos de Uso

### Título de Seção

```tsx
<Subtitle text="Configurações" />
```

### Subtítulo Centralizado

```tsx
<Subtitle text="Perfil do Usuário" position="center" />
```

### Subtítulo Alinhado à Direita

```tsx
<Subtitle text="Informações" position="right" />
```

### Subtítulo com Texto Longo

```tsx
<Subtitle text="Como personalizar suas preferências de notificação" />
```

## Características

- Tamanho de fonte grande (LARGE - 20px)
- Peso da fonte em negrito (BOLD)
- Suporte a alinhamento horizontal (left, center, right)
- Quebra de linha automática para textos longos
- Cor de texto padrão do design system
- Fonte Roboto Regular
- Line height igual ao tamanho da fonte
- Flex wrap e shrink habilitados para responsividade

## Boas Práticas

1. **Use para títulos secundários**: Reserve o Subtitle para seções importantes, mas não o título principal
2. **Hierarquia clara**: Use Subtitle após MainTitle na hierarquia de títulos
3. **Seja descritivo**: Títulos devem indicar claramente o conteúdo da seção
4. **Consistência**: Mantenha o mesmo padrão de nomenclatura em toda a aplicação
5. **Alinhamento**: Use o mesmo alinhamento do MainTitle da página para consistência visual
6. **Evite aninhamento excessivo**: Não use múltiplos níveis de Subtitle sem necessidade

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { MainTitle, Subtitle, Title, Text } from "lavex-design-system";

const HomeScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <MainTitle text="Dashboard" />
      
      <View style={{ marginTop: 24 }}>
        <Subtitle text="Resumo Financeiro" />
        <Text text="Aqui estão suas informações financeiras" />
      </View>
      
      <View style={{ marginTop: 24 }}>
        <Subtitle text="Atividades Recentes" />
        <Text text="Suas últimas atividades aparecem aqui" />
      </View>
    </View>
  );
};

export default HomeScreen;
```

