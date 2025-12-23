# Como utilizar - Title

O componente `Title` é usado para títulos terciários (Heading 3). Ele oferece estilização consistente e responsiva para títulos de nível menor na hierarquia, ideal para subseções e cabeçalhos de cards.

## Importação

```typescript
import { Title } from "lavex-design-system";
```

## Props

| Prop       | Tipo                                    | Obrigatório | Padrão   | Descrição                                    |
| ---------- | --------------------------------------- | ----------- | -------- | -------------------------------------------- |
| `text`     | `string`                                | Sim         | -        | O texto que será exibido como título        |
| `position` | `'left' \| 'center' \| 'right'`         | Não         | `'left'` | Alinhamento horizontal do texto              |

## Uso Básico

```tsx
import React from "react";
import { Title } from "lavex-design-system";

const MyComponent = () => {
  return <Title text="Subseção" />;
};
```

## Exemplos de Uso

### Título de Subseção

```tsx
<Title text="Detalhes" />
```

### Título de Card

```tsx
<Title text="Informações Pessoais" />
```

### Título Centralizado

```tsx
<Title text="Configurações" position="center" />
```

### Título com Texto Longo

```tsx
<Title text="Como configurar notificações push no seu dispositivo" />
```

## Características

- Tamanho de fonte maior que o texto padrão (LARGER - 24px)
- Peso da fonte em negrito (BOLD)
- Suporte a alinhamento horizontal (left, center, right)
- Quebra de linha automática para textos longos
- Cor de texto padrão do design system
- Fonte Roboto Regular
- Line height igual ao tamanho da fonte
- Flex wrap e shrink habilitados para responsividade

## Boas Práticas

1. **Use para títulos terciários**: Reserve o Title para subseções e títulos de menor importância
2. **Hierarquia clara**: Use Title após Subtitle na hierarquia de títulos
3. **Seja específico**: Títulos devem ser claros sobre o conteúdo específico da subseção
4. **Consistência**: Mantenha o mesmo padrão de nomenclatura em toda a aplicação
5. **Uso em cards**: Ideal para títulos de cards e componentes menores
6. **Evite uso excessivo**: Não use Title para cada parágrafo ou seção muito pequena

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
        
        <View style={{ marginTop: 16 }}>
          <Title text="Receitas do Mês" />
          <Text text="R$ 5.000,00" />
        </View>
        
        <View style={{ marginTop: 16 }}>
          <Title text="Despesas do Mês" />
          <Text text="R$ 3.200,00" />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
```

