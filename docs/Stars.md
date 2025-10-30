# Stars

Componente de avaliação por estrelas com efeito visual de camadas. Exibe uma classificação de 0 a 5 estrelas com suporte a meias estrelas.

## Importação

```typescript
import { Stars } from "lavex-design-system";
```

## Props

| Prop     | Tipo     | Obrigatório | Padrão | Descrição                                       |
| -------- | -------- | ----------- | ------ | ----------------------------------------------- |
| `rating` | `number` | Sim         | -      | Valor da avaliação de 0 a 5                     |
| `size`   | `number` | Não         | `24`   | Tamanho das estrelas em pixels                  |

## O que faz

- Exibe classificação por estrelas de forma visual
- Renderiza estrelas cheias e meias estrelas baseado no rating
- Sistema de duas camadas: fundo cinza e frente dourada
- Normalização automática para valores entre 0 e 5
- Responsivo e customizável

## Uso Básico

```tsx
import React from "react";
import { Stars } from "lavex-design-system";

const MyComponent = () => {
  return <Stars rating={3.5} />;
};
```

## Exemplos de Uso

### Avaliação Completa (5 estrelas)

```tsx
<Stars rating={5} size={32} />
```

### Avaliação com Meia Estrela

```tsx
<Stars rating={3.5} size={28} />
```

### Avaliação Baixa

```tsx
<Stars rating={1.5} size={24} />
```

### Lista de Avaliações

```tsx
import React from "react";
import { View, Text } from "react-native";
import { Stars } from "lavex-design-system";

const ReviewsList = () => {
  const reviews = [
    { user: "João", rating: 5, comment: "Excelente!" },
    { user: "Maria", rating: 4.5, comment: "Muito bom" },
    { user: "Pedro", rating: 3, comment: "Regular" },
  ];

  return (
    <View>
      {reviews.map((review, index) => (
        <View key={index} style={{ padding: 12, borderBottomWidth: 1, borderColor: "#E0E0E0" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <Text style={{ fontWeight: "bold", marginRight: 8 }}>{review.user}</Text>
            <Stars rating={review.rating} size={16} />
          </View>
          <Text>{review.comment}</Text>
        </View>
      ))}
    </View>
  );
};
```

## Como Funciona

1. **Normalização**: O componente garante que o rating esteja sempre entre 0 e 5
2. **Cálculo**: Determina quantas estrelas cheias e se há meia estrela (≥ 0.5)
3. **Camada de Fundo**: Renderiza 5 estrelas cinzas (#E0E0E0) como base
4. **Camada de Rating**: Sobrepõe estrelas douradas (#FFD700) conforme o rating
5. **Meia Estrela**: Usa IconStarHalf quando há decimal ≥ 0.5

## Regras de Arredondamento

O componente segue estas regras para exibição:

```tsx
// Sem arredondamento - meia estrela aparece com 0.5 ou mais
rating = 0.0  → 0 estrelas
rating = 0.4  → 0 estrelas
rating = 0.5  → 0 estrelas cheias + 1 meia estrela
rating = 1.0  → 1 estrela
rating = 3.3  → 3 estrelas
rating = 3.5  → 3 estrelas cheias + 1 meia estrela
rating = 4.7  → 4 estrelas cheias + 1 meia estrela
rating = 5.0  → 5 estrelas
```

## Tamanhos Recomendados

| Contexto              | Tamanho | Uso                                      |
| --------------------- | ------- | ---------------------------------------- |
| Ícone pequeno         | 16      | Dentro de badges, listas compactas       |
| Ícone padrão          | 24      | Cards, detalhes de produto               |
| Ícone médio           | 32      | Destaque em páginas de produto           |
| Ícone grande          | 40-48   | Páginas de avaliação, destaque principal |

## Características

- Sistema de duas camadas para efeito visual aprimorado
- Cores consistentes: cinza (#E0E0E0) no fundo, dourado (#FFD700) na frente
- Suporte a valores decimais com meia estrela
- Proteção contra valores fora do intervalo 0-5
- Totalmente customizável via prop `size`
- Baseado em ícones SVG escaláveis

## Boas Práticas

1. **Mostre o número**: Sempre acompanhe com o valor numérico para clareza
2. **Consistência**: Use o mesmo tamanho em contextos similares
3. **Contraste**: Certifique-se de que as estrelas se destacam no fundo
4. **Contexto**: Indique de quantas avaliações é a média
5. **Acessibilidade**: Considere adicionar texto alternativo para leitores de tela

## Diretrizes de Uso

### ✅ Faça

- Use em cards de produtos, serviços ou conteúdo avaliável
- Exiba junto com o número de avaliações
- Combine com texto descritivo (ex: "4.5 de 5")
- Use tamanho proporcional ao contexto
- Mantenha consistência de tamanho em listas

### ❌ Evite

- Usar para outros propósitos além de avaliação
- Omitir o valor numérico do rating
- Fazer estrelas muito pequenas (< 14px)
- Usar cores diferentes do padrão sem necessidade
- Sobrecarregar a interface com muitas avaliações

## Casos de Uso Comuns

- **E-commerce**: Avaliação de produtos
- **Aplicativos de Serviços**: Rating de profissionais, estabelecimentos
- **Reviews**: Comentários e avaliações de usuários
- **Recomendações**: Qualidade de conteúdo recomendado
- **Feedback**: Satisfação geral com serviços
- **Perfis**: Reputação de usuários ou empresas

## Limitações

- Não é um componente interativo (apenas exibição)
- A meia estrela só aparece quando decimal é ≥ 0.5
- Valores fora de 0-5 são normalizados automaticamente
- Não há suporte nativo para quartos de estrela (apenas cheias e meias)

