# Lavex Design System

Um sistema de design reutilizável para aplicações React Native.

## Instalação

### Para desenvolvimento local (npm link)

1. No diretório do design system:
```bash
npm link
```

2. No seu projeto que vai consumir o design system:
```bash
npm link lavex-design-system
```

### Para instalação via npm (quando publicado)

```bash
npm install lavex-design-system
```

## Uso

```tsx
import React from 'react';
import { View } from 'react-native';
import { HelloWorld } from 'lavex-design-system';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HelloWorld />
    </View>
  );
}
```

## Componentes Disponíveis

### HelloWorld

Um componente simples para exibir texto.

## Desenvolvimento

### Scripts disponíveis

- `npm run build` - Compila o projeto
- `npm run dev` - Compila em modo watch
- `npm run clean` - Remove a pasta dist

### Estrutura do projeto

```
src/
├── components/
│   ├── HelloWorld/
│   │   ├── HelloWorld.tsx
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

## Objetivos

Concentrar todos os componentes a serem utilizados nos aplicativos app-client e app-provider.

