# Como utilizar - Gallery

O componente `Gallery` é usado para exibir uma coleção de imagens em um carrossel horizontal. Ideal para mostrar múltiplas fotos relacionadas, álbuns de imagens ou galerias de produtos.

## Importação

```typescript
import { Gallery } from "lavex-design-system";
```

## Props

| Prop      | Tipo                                        | Obrigatório | Padrão | Descrição                                           |
| --------- | ------------------------------------------- | ----------- | ------ | --------------------------------------------------- |
| `images`  | `string[]`                                  | ✅          | -      | Array de URLs das imagens que serão exibidas        |
| `onClick` | `(imageUrl: string, index: number) => void` | Não         | -      | Função chamada quando uma imagem é clicada          |

## Uso Básico

```tsx
import React from "react";
import { Gallery } from "lavex-design-system";

const MyComponent = () => {
  const images = [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg",
  ];

  return <Gallery images={images} />;
};
```

## Exemplos de Uso

### Galeria Simples

```tsx
<Gallery
  images={[
    "https://picsum.photos/id/10/200",
    "https://picsum.photos/id/11/200",
    "https://picsum.photos/id/12/200",
    "https://picsum.photos/id/13/200",
  ]}
/>
```

### Galeria com Ação ao Clicar

```tsx
<Gallery
  images={[
    "https://picsum.photos/id/20/200",
    "https://picsum.photos/id/21/200",
    "https://picsum.photos/id/22/200",
  ]}
  onClick={(imageUrl, index) => {
    console.log(`Imagem ${index + 1} clicada:`, imageUrl);
    // Abrir modal ou visualização ampliada
  }}
/>
```

### Galeria de Produtos

```tsx
const productImages = [
  "https://example.com/product-front.jpg",
  "https://example.com/product-back.jpg",
  "https://example.com/product-detail.jpg",
  "https://example.com/product-use.jpg",
];

<Gallery
  images={productImages}
  onClick={(imageUrl) => openImageViewer(imageUrl)}
/>;
```

## Características

- Scroll horizontal suave e responsivo
- Thumbnails com border radius arredondado (16px)
- Tamanho fixo de 80x80px por imagem
- Espaçamento consistente entre imagens (12px)
- Suporte a interação por clique
- Acessibilidade integrada
- Sem indicador de scroll para UI mais limpa

## Boas Práticas

1. **Quantidade de imagens**: Recomendado entre 3-10 imagens para melhor experiência
2. **URLs válidas**: Certifique-se de que todas as URLs das imagens estão funcionando
3. **Performance**: Use imagens otimizadas e com tamanho adequado
4. **Feedback visual**: Implemente onClick para fornecer feedback ao usuário
5. **Carregamento**: Considere adicionar estados de loading para imagens

## Casos de Uso Comuns

- **Galeria de fotos**: Álbuns de fotos pessoais ou de eventos
- **Produtos**: Múltiplas visualizações de um produto
- **Portfólio**: Showcase de trabalhos ou projetos
- **Imóveis**: Fotos de propriedades em anúncios
- **Restaurantes**: Menu visual com fotos de pratos
- **Viagens**: Coleção de fotos de destinos turísticos

## Integração com Modal

```tsx
import { Gallery } from "lavex-design-system";
import { useState } from "react";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://picsum.photos/id/30/400",
    "https://picsum.photos/id/31/400",
    "https://picsum.photos/id/32/400",
  ];

  return (
    <>
      <Gallery
        images={images}
        onClick={(imageUrl) => setSelectedImage(imageUrl)}
      />
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};
```
