# Como utilizar - Image

O componente `Image` é usado para exibir imagens com border radius redondo. Ideal para avatares, ícones, logotipos ou qualquer elemento visual estático.

## Importação

```typescript
import { Image } from "lavex-design-system";
```

## Props

| Prop      | Tipo         | Obrigatório | Padrão | Descrição                                |
| --------- | ------------ | ----------- | ------ | ---------------------------------------- |
| `src`     | `string`     | Sim         | -      | URL da imagem que será exibida           |
| `alt`     | `string`     | Sim         | -      | Descrição para acessibilidade            |
| `onClick` | `function`   | Não         | -      | Função chamada quando a imagem é clicada |
| `size`    | `number`     | Não         | `100`  | Tamanho da imagem em pixels              |
| `style`   | `ImageStyle` | Não         | -      | Estilos adicionais para personalização   |

## Uso Básico

```tsx
import React from "react";
import { Image } from "lavex-design-system";

const MyComponent = () => {
  return (
    <Image src="https://example.com/image.jpg" alt="Descrição da imagem" />
  );
};
```

## Exemplos de Uso

### Avatar de Usuário

```tsx
<Image src="https://picsum.photos/id/1/100" alt="Foto do usuário" size={80} />
```

### Logo Clicável

```tsx
<Image
  src="https://picsum.photos/id/10/100"
  alt="Logo da empresa"
  size={60}
  onClick={() => navigation.navigate("Home")}
/>
```

### Ícone de Ação

```tsx
<Image
  src="https://picsum.photos/id/11/100"
  alt="Ícone de configurações"
  size={40}
  onClick={() => openSettings()}
/>
```

## Características

- Border radius circular automático
- Suporte a interação por clique
- Acessibilidade integrada
- Background cinza quando a imagem não carrega
- Borda sutil para melhor definição

## Boas Práticas

1. **Use alt descritivo**: Sempre forneça uma descrição clara para acessibilidade
2. **Tamanhos consistentes**: Mantenha tamanhos padronizados em seu app
3. **URLs válidas**: Certifique-se de que as URLs das imagens estão funcionando
4. **Performance**: Use imagens otimizadas para melhor performance
5. **Fallback**: O componente já possui background cinza como fallback

## Casos de Uso Comuns

- **Avatares de usuário**: Fotos de perfil em listas e cards
- **Logotipos**: Marcas e logos de empresas
- **Ícones de ação**: Botões visuais para ações específicas
- **Galeria de imagens**: Thumbnails em galerias
- **Cards de produto**: Imagens de produtos em e-commerce
