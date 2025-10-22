# TextList Component

O componente TextList é usado para exibir uma lista simples de strings de forma organizada e consistente. Ideal para listas de itens, instruções, ingredientes, ou qualquer conjunto de textos que precisam ser apresentados sequencialmente.

## Props

| Prop    | Tipo       | Obrigatório | Padrão | Descrição                                    |
| ------- | ---------- | ----------- | ------ | -------------------------------------------- |
| `texts` | `string[]` | Sim         | -      | Array de strings que serão exibidas na lista |

## Como Funciona

O TextList renderiza cada string do array como um componente `Text` individual, usando internamente uma `FlatList` otimizada para:
- Performance otimizada com FlatList do React Native
- Separadores automáticos entre os itens (linha cinza de 1px)
- Layout limpo sem fundo branco
- Scroll interno desabilitado (deve ser usado dentro de ScrollView)

## Exemplos de Uso

### Lista de Itens

```tsx
import { TextList, Card } from "lavex-design-system";

<Card>
  <TextList
    texts={[
      "1x Calça Tiroliro",
      "2x Blusa xpto etc",
      "5x Camiseta de banda",
      "3x Pares de meia",
      "1x Edredom",
    ]}
  />
</Card>;
```

## Diretrizes de Uso

1. **Clareza**: Use textos curtos e objetivos para melhor legibilidade
2. **Consistência**: Mantenha um padrão de formatação entre os itens (ex: todos começam com número ou todos sem)
3. **Agrupamento**: Combine com `Card` para destacar a lista visualmente
4. **Contexto**: Use títulos acima da lista para dar contexto ao usuário
5. **Tamanho**: Para listas muito longas (>20 itens), considere usar FlatList para melhor performance
