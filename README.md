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

### Exemplo Básico

```tsx
import React from 'react';
import { View } from 'react-native';
import { Title1, Card, Text } from 'lavex-design-system';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Title1 text="Meu App" />
      <Card title="Bem-vindo">
        <Text text="Este é um exemplo usando o Lavex Design System" />
      </Card>
    </View>
  );
}
```

### Exemplo com Lista

```tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { Title1, List, Card, Text, Info } from 'lavex-design-system';

export default function App() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Title1 text="Dashboard" />
      
      <List title="Tarefas Pendentes">
        <Card title="Revisar código">
          <Text text="Fazer code review do PR #123" />
          <Info text="Prazo: hoje" />
        </Card>
        <Card title="Atualizar documentação">
          <Text text="Documentar novos componentes" />
          <Info text="Prazo: amanhã" />
        </Card>
      </List>
    </ScrollView>
  );
}
```

## Componentes Disponíveis

Para documentação detalhada de cada componente, consulte a pasta `/docs`.

### Componentes de Texto
- **Title1** - Títulos principais (Heading 1) - [Documentação](./docs/Title1.md)
- **Title2** - Títulos secundários (Heading 2) - [Documentação](./docs/Title2.md)
- **Title3** - Títulos terciários (Heading 3) - [Documentação](./docs/Title3.md)
- **Text** - Texto padrão para conteúdo
- **Info** - Texto informativo secundário - [Documentação](./docs/Info.md)

### Componentes Estruturais
- **Card** - Container para agrupar conteúdo relacionado
- **List** - Lista organizada de itens com separadores - [Documentação](./docs/List.md)

### Componentes de Demonstração
- **HelloWorld** - Componente simples para testes

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

