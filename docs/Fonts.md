# Guia de Configuração de Fontes

Este guia explica como configurar e carregar fontes do design system em seu projeto React Native.

## Visão Geral

O design system inclui a família de fontes Roboto completa com todas as variantes (Regular, Bold, Medium, Light, etc.). As fontes são configuradas automaticamente e podem ser facilmente carregadas em qualquer projeto usando o hook `useGlobalFonts` fornecido.

## Fontes Disponíveis

O design system inclui as seguintes variantes da fonte Roboto:

- **Roboto-Regular** - Peso padrão da fonte (400)
- **Roboto-Italic** - Peso padrão da fonte em itálico (400)
- **Roboto-ExtraLight** - Peso extra leve da fonte (100)
- **Roboto-ExtraLightItalic** - Peso extra leve da fonte em itálico (100)
- **Roboto-Bold** - Peso negrito da fonte (700)
- **Roboto-BoldItalic** - Peso negrito da fonte em itálico (700)

## Configuração Rápida

### 1. Instalar o Design System

```bash
npm install lavex-design-system
```

### 2. Configurar Assets das Fontes

Adicione o seguinte ao seu arquivo `react-native.config.js`:

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./node_modules/lavex-design-system/assets/fonts"],
};
```

### 3. Vincular Assets das Fontes

Execute o seguinte comando para vincular os assets das fontes:

```bash
npx react-native-asset
```

Para projetos Expo, as fontes serão vinculadas automaticamente quando você configurar o caminho dos assets.

### 4. Configurar Carregamento de Fontes no Seu Layout

Importe e use o hook `useGlobalFonts` no seu layout raiz:

```tsx
import { useGlobalFonts } from "lavex-design-system";

export default function RootLayout() {
  const ready = useGlobalFonts();

  if (!ready) {
    return null; // ou uma tela de carregamento
  }

  return (
    // Conteúdo do seu app
  );
}
```

## Exemplo Completo

Aqui está um exemplo completo de como configurar fontes em um projeto Expo Router:

### `app/_layout.tsx`

```tsx
import { Stack } from "expo-router";
import { useGlobalFonts } from "lavex-design-system";

export default function RootLayout() {
  const ready = useGlobalFonts();

  if (!ready) {
    return null;
  }

  return <Stack />;
}
```

### `react-native.config.js`

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./node_modules/lavex-design-system/assets/fonts"],
};
```

## Usando Fontes em Componentes

Uma vez configuradas, você pode usar as fontes em seus componentes usando as constantes de fonte do design system:

```tsx
import { StyleSheet } from "react-native";
import Constants from "lavex-design-system/constants";

const styles = StyleSheet.create({
  title: {
    fontFamily: Constants.styles.fontFamily.REGULAR, // Roboto-Regular
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.BOLD,
  },
  body: {
    fontFamily: Constants.styles.fontFamily.REGULAR, // Roboto-Regular
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.NORMAL,
  },
});
```

## Constantes de Fonte Disponíveis

O design system fornece as seguintes constantes de fonte:

```typescript
Constants.styles.fontFamily = {
  REGULAR: "Roboto-Regular",
  REGULAR_ITALIC: "Roboto-Italic",
  EXTRA_LIGHT: "Roboto-ExtraLight",
  EXTRA_LIGHT_ITALIC: "Roboto-ExtraLightItalic",
  BOLD: "Roboto-Bold",
  BOLD_ITALIC: "Roboto-BoldItalic",
};

Constants.styles.fontSize = {
  LARGEST: 36,
  LARGER: 24,
  LARGE: 20,
  MEDIUM: 18,
  SMALL: 14,
};

Constants.styles.fontWeight = {
  BOLD: "700",
  NORMAL: "400",
  THIN: "100",
};
```

## Configuração Personalizada de Fonte

Você também pode especificar uma fonte padrão personalizada ao usar `useGlobalFonts`:

```tsx
import { useGlobalFonts } from "lavex-design-system";

export default function RootLayout() {
  // Usar Roboto-Medium como fonte padrão ao invés de Roboto-Regular
  const ready = useGlobalFonts("Roboto-Medium");

  if (!ready) {
    return null;
  }

  return <Stack />;
}
```

## Solução de Problemas

### Fontes Não Carregando

1. **Verificar vinculação de assets**: Certifique-se de executar `npx react-native-asset` após configurar o `react-native.config.js`
2. **Verificar caminho**: Certifique-se de que o caminho dos assets no `react-native.config.js` aponta para o local correto
3. **Limpar cache**: Tente limpar o cache do projeto e reconstruir

### Projetos Expo

Para projetos Expo, certifique-se de que seu `app.json` inclui a configuração de fontes:

```json
{
  "expo": {
    "fonts": [
      "./node_modules/lavex-design-system/assets/fonts/Roboto/static/*.ttf"
    ]
  }
}
```

### Configuração do Metro

Se você estiver usando uma configuração personalizada do Metro, certifique-se de que ela inclui os assets das fontes:

```javascript
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("ttf", "otf");

module.exports = config;
```

## Notas de Performance

- O hook `useGlobalFonts` carrega todas as fontes de forma assíncrona
- Seu app não será renderizado até que as fontes sejam carregadas (controlado pelo estado `ready`)
- Considere mostrar uma tela de carregamento enquanto as fontes estão sendo carregadas
- As fontes são armazenadas em cache após o primeiro carregamento para melhor performance
