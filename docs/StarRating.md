# StarRating

Componente interativo de avaliação por estrelas que permite ao usuário selecionar uma classificação de 0 a 5 pontos com granularidade de 0.5. Cada estrela possui duas áreas clicáveis (metade esquerda e direita) para permitir avaliações precisas.

## Importação

```typescript
import { StarRating } from "lavex-design-system";
```

## Props

| Prop              | Tipo                              | Obrigatório | Padrão | Descrição                                                      |
| ----------------- | --------------------------------- | ----------- | ------ | -------------------------------------------------------------- |
| `size`            | `number`                          | Não         | `24`   | Tamanho das estrelas em pixels                                 |
| `initialRating`   | `number`                          | Não         | `0`    | Avaliação inicial (0 a 5)                                      |
| `onRatingChange`  | `(rating: number) => void`       | Não         | -      | Função chamada quando a avaliação muda                         |
| `disabled`        | `boolean`                         | Não         | `false`| Desabilita a interação com as estrelas                         |

## O que faz

- Exibe 5 estrelas vazias (cinza) inicialmente
- Permite ao usuário clicar para avaliar de 0 a 5 pontos
- Suporta granularidade de 0.5 pontos (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5)
- Cada estrela possui duas áreas clicáveis: metade esquerda (0.5) e metade direita (1.0)
- Mostra preview visual ao pressionar antes de soltar
- Usa Grid do design system para organizar as estrelas
- Renderiza estrelas cheias e meias estrelas baseado na avaliação
- Sistema de duas camadas: fundo cinza e frente dourada
- Normalização automática para valores entre 0 e 5

## Uso Básico

```tsx
import React, { useState } from "react";
import { StarRating } from "lavex-design-system";

const MyComponent = () => {
  const [rating, setRating] = useState(0);

  return (
    <StarRating 
      initialRating={rating}
      onRatingChange={setRating}
    />
  );
};
```

## Exemplos de Uso

### Com Callback de Mudança

```tsx
import React, { useState } from "react";
import { StarRating, Text } from "lavex-design-system";
import { View } from "react-native";

const RatingForm = () => {
  const [rating, setRating] = useState(0);

  return (
    <View>
      <Text>Como você avalia este produto?</Text>
      <StarRating 
        size={32}
        initialRating={rating}
        onRatingChange={(newRating) => {
          setRating(newRating);
          console.log(`Avaliação: ${newRating}`);
        }}
      />
      <Text>Avaliação atual: {rating}</Text>
    </View>
  );
};
```

### Tamanho Customizado

```tsx
<StarRating 
  size={40}
  initialRating={3.5}
  onRatingChange={(rating) => console.log(rating)}
/>
```

### Componente Desabilitado

```tsx
<StarRating 
  size={24}
  initialRating={4.5}
  disabled={true}
/>
```

### Formulário de Avaliação Completo

```tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { StarRating, Button, TextArea } from "lavex-design-system";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log({ rating, comment });
    // Enviar avaliação
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
        Avalie este produto
      </Text>
      
      <StarRating 
        size={32}
        initialRating={rating}
        onRatingChange={setRating}
      />
      
      <TextArea
        placeholder="Deixe seu comentário..."
        value={comment}
        onChangeText={setComment}
      />
      
      <Button 
        text="Enviar Avaliação"
        onClick={handleSubmit}
        disabled={rating === 0}
      />
    </View>
  );
};
```

## Como Funciona

1. **Inicialização**: Renderiza 5 estrelas vazias (cinza) baseado no `initialRating`
2. **Interação**: Cada estrela possui duas áreas clicáveis:
   - Metade esquerda: adiciona 0.5 pontos
   - Metade direita: adiciona 1.0 ponto
3. **Preview Visual**: Ao pressionar, mostra preview da avaliação antes de soltar
4. **Cálculo**: Determina quantas estrelas cheias e se há meia estrela baseado no rating
5. **Camada de Fundo**: Renderiza 5 estrelas cinzas (#E0E0E0) como base
6. **Camada de Rating**: Sobrepõe estrelas douradas (#FFD700) conforme o rating
7. **Meia Estrela**: Usa IconStarHalf quando há decimal ≥ 0.5
8. **Grid**: Usa Grid do design system com 5 colunas para organizar as estrelas

## Regras de Avaliação

O componente permite as seguintes avaliações:

```tsx
// Clicando na metade esquerda da primeira estrela
rating = 0.5  → 0 estrelas cheias + 1 meia estrela

// Clicando na metade direita da primeira estrela
rating = 1.0  → 1 estrela cheia

// Clicando na metade esquerda da segunda estrela
rating = 1.5  → 1 estrela cheia + 1 meia estrela

// Clicando na metade direita da segunda estrela
rating = 2.0  → 2 estrelas cheias

// E assim por diante até 5.0
rating = 5.0  → 5 estrelas cheias
```

## Tamanhos Recomendados

| Contexto              | Tamanho | Uso                                      |
| --------------------- | ------- | ---------------------------------------- |
| Ícone pequeno         | 16-20   | Dentro de cards compactos, listas        |
| Ícone padrão          | 24      | Formulários, avaliações padrão          |
| Ícone médio           | 32      | Páginas de avaliação, destaque          |
| Ícone grande          | 40-48   | Páginas de avaliação principal, destaque |

## Características

- Sistema de duas camadas para efeito visual aprimorado
- Cores consistentes: cinza (#E0E0E0) no fundo, dourado (#FFD700) na frente
- Suporte a valores decimais com meia estrela (granularidade de 0.5)
- Proteção contra valores fora do intervalo 0-5
- Totalmente customizável via prop `size`
- Baseado em ícones SVG escaláveis
- Preview visual ao interagir
- Usa Grid do design system para layout responsivo
- Estado desabilitado para uso em modo somente leitura

## Boas Práticas

1. **Feedback Visual**: Sempre mostre o valor numérico da avaliação junto com as estrelas
2. **Consistência**: Use o mesmo tamanho em contextos similares
3. **Contraste**: Certifique-se de que as estrelas se destacam no fundo
4. **Acessibilidade**: Considere adicionar texto alternativo para leitores de tela
5. **Validação**: Valide se o usuário forneceu uma avaliação antes de submeter formulários
6. **Estado Inicial**: Use `initialRating` para pré-preencher avaliações existentes

## Diretrizes de Uso

### ✅ Faça

- Use em formulários de avaliação e feedback
- Exiba junto com o valor numérico da avaliação
- Combine com campos de comentário para avaliações completas
- Use tamanho proporcional ao contexto
- Mantenha consistência de tamanho em listas
- Use `disabled={true}` para exibir avaliações já submetidas

### ❌ Evite

- Usar para outros propósitos além de avaliação interativa
- Omitir o valor numérico do rating
- Fazer estrelas muito pequenas (< 16px) que dificultam a interação
- Usar cores diferentes do padrão sem necessidade
- Permitir múltiplas avaliações sem validação

## Casos de Uso Comuns

- **E-commerce**: Avaliação interativa de produtos
- **Aplicativos de Serviços**: Rating de profissionais, estabelecimentos
- **Reviews**: Formulários de comentários e avaliações de usuários
- **Feedback**: Coleta de satisfação geral com serviços
- **Perfis**: Permissão para usuários avaliarem outros usuários
- **Formulários**: Coleta de feedback em pesquisas e questionários

## Diferenças entre StarRating e Stars

| Característica | StarRating | Stars |
| -------------- | ---------- | ----- |
| Interatividade | ✅ Interativo | ❌ Somente leitura |
| Props          | `onRatingChange`, `initialRating`, `disabled` | `rating` |
| Uso            | Formulários, coleta de avaliação | Exibição de avaliação existente |
| Estado         | Controla seu próprio estado | Recebe rating como prop |

## Limitações

- A granularidade é fixa em 0.5 (não suporta quartos de estrela)
- Valores fora de 0-5 são normalizados automaticamente
- Requer estado gerenciado externamente se precisar de controle total
- Preview visual funciona apenas em dispositivos touch (não há hover em desktop)

## Exemplo Completo

```tsx
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StarRating, Button, TextArea, Card } from "lavex-design-system";

const ProductReviewScreen = () => {
  const [productRating, setProductRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const review = {
      productRating,
      deliveryRating,
      comment,
    };
    console.log("Avaliação enviada:", review);
    // Enviar para API
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
          Avalie sua experiência
        </Text>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ marginBottom: 8 }}>Qualidade do Produto</Text>
          <StarRating 
            size={32}
            initialRating={productRating}
            onRatingChange={setProductRating}
          />
          <Text style={{ marginTop: 4, color: "#666" }}>
            {productRating > 0 ? `${productRating} de 5` : "Não avaliado"}
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ marginBottom: 8 }}>Entrega</Text>
          <StarRating 
            size={32}
            initialRating={deliveryRating}
            onRatingChange={setDeliveryRating}
          />
          <Text style={{ marginTop: 4, color: "#666" }}>
            {deliveryRating > 0 ? `${deliveryRating} de 5` : "Não avaliado"}
          </Text>
        </View>

        <TextArea
          placeholder="Deixe um comentário adicional..."
          value={comment}
          onChangeText={setComment}
        />

        <Button
          text="Enviar Avaliação"
          onClick={handleSubmit}
          disabled={productRating === 0 || deliveryRating === 0}
        />
      </Card>
    </ScrollView>
  );
};

export default ProductReviewScreen;
```

