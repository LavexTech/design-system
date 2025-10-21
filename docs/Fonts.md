# Configuração de Fontes

Este guia explica como configurar fontes individualmente por componente no design system.

## Fontes Disponíveis

- **Roboto-Regular** - Peso padrão (400)
- **Roboto-Italic** - Peso padrão itálico (400)
- **Roboto-ExtraLight** - Peso extra leve (100)
- **Roboto-ExtraLightItalic** - Peso extra leve itálico (100)
- **Roboto-Bold** - Peso negrito (700)
- **Roboto-BoldItalic** - Peso negrito itálico (700)

## Configuração do Projeto

### 1. Instalar e Configurar Assets

```bash
npm install lavex-design-system
```

Adicione ao `react-native.config.js`:

```javascript
module.exports = {
  project: { ios: {}, android: {} },
  assets: ["./node_modules/lavex-design-system/assets/fonts"],
};
```

Execute:

```bash
npx react-native-asset
```

## Configuração Individual por Componente

### Hook useFonts

Use o hook `useFonts` para carregar fontes específicas:

```tsx
import { useFonts } from "lavex-design-system";
import Constants from "lavex-design-system/constants";

export const MeuComponente = () => {
  const fontLoaded = useFonts([Constants.styles.fontFamily.REGULAR]);

  if (!fontLoaded) return null;

  return <Text style={styles.text}>Meu texto</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Constants.styles.fontFamily.REGULAR,
    fontSize: Constants.styles.fontSize.MEDIUM,
  },
});
```

### Múltiplas Fontes

```tsx
const fontLoaded = useFonts([
  Constants.styles.fontFamily.REGULAR,
  Constants.styles.fontFamily.BOLD,
]);
```

## Constantes Disponíveis

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
```

## Vantagens

- **Performance**: Carrega apenas fontes necessárias
- **Cache**: Sistema automático de cache
- **Flexibilidade**: Controle individual por componente

## Solução de Problemas

- Verificar `react-native.config.js`
- Executar `npx react-native-asset`
- Limpar cache do projeto
