# Como utilizar - TabBar

O componente `TabBar` é uma barra de navegação fixa posicionada no rodapé da tela. Permite que o usuário alterne entre diferentes seções ou telas do aplicativo através de abas clicáveis com ícones e textos.

## Importação

```typescript
import { TabBar } from "lavex-design-system";
```

## Props

| Prop         | Tipo                                             | Obrigatório | Descrição                                                      |
| ------------ | ------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `options`    | `string[]`                                       | ✅          | Array de textos que serão exibidos em cada aba                 |
| `icons`      | `((isSelected: boolean) => React.ReactNode)[]`   | ❌          | Array de funções que retornam ícones para cada aba             |
| `onSelected` | `(index: number) => void`                        | ✅          | Função callback chamada quando uma aba é selecionada           |

## Uso Básico

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { TabBar } from "lavex-design-system";

const MyApp = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo do app */}
      
      <TabBar 
        options={['Home', 'Perfil', 'Configurações']}
        onSelected={(index) => setSelectedTab(index)} 
      />
    </View>
  );
};
```

## Uso com Ícones

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { TabBar } from "lavex-design-system";
import { Ionicons } from "@expo/vector-icons";

const MyApp = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Home', 'Pesquisa', 'Perfil'];
  const icons = [
    (isSelected: boolean) => (
      <Ionicons 
        name="home" 
        size={24} 
        color={isSelected ? "#262627" : "#8F98AD"} 
      />
    ),
    (isSelected: boolean) => (
      <Ionicons 
        name="search" 
        size={24} 
        color={isSelected ? "#262627" : "#8F98AD"} 
      />
    ),
    (isSelected: boolean) => (
      <Ionicons 
        name="person" 
        size={24} 
        color={isSelected ? "#262627" : "#8F98AD"} 
      />
    ),
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo do app */}
      
      <TabBar 
        options={tabs}
        icons={icons}
        onSelected={(index) => setSelectedTab(index)} 
      />
    </View>
  );
};
```

## Exemplo com Navegação de Conteúdo

```tsx
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { TabBar } from "lavex-design-system";
import { Ionicons } from "@expo/vector-icons";

const AppWithNavigation = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Home', 'Buscar', 'Notificações', 'Perfil'];
  const icons = [
    (isSelected: boolean) => (
      <Ionicons name="home" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
    (isSelected: boolean) => (
      <Ionicons name="search" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
    (isSelected: boolean) => (
      <Ionicons name="notifications" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
    (isSelected: boolean) => (
      <Ionicons name="person" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <Text>Conteúdo da Home</Text>;
      case 1:
        return <Text>Conteúdo de Busca</Text>;
      case 2:
        return <Text>Notificações</Text>;
      case 3:
        return <Text>Perfil do Usuário</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          padding: 16, 
          paddingBottom: 100 // Espaço para o TabBar
        }}
      >
        {renderContent()}
      </ScrollView>

      <TabBar 
        options={tabs}
        icons={icons}
        onSelected={(index) => {
          setSelectedTab(index);
          console.log(`Navegou para: ${tabs[index]}`);
        }} 
      />
    </View>
  );
};

export default AppWithNavigation;
```

## Cores das Constantes

```typescript
import Constants from "lavex-design-system/constants";

// Cores para uso nos ícones:
// Constants.styles.textColor.DEFAULT   - #262627 (aba ativa)
// Constants.styles.textColor.INFO      - #8F98AD (aba inativa)
// Constants.styles.textColor.SUCCESS   - #059669
// Constants.styles.textColor.DANGER    - #DC2626
```

## Boas Práticas

1. **Use 3-5 abas**: O ideal é ter entre 3 e 5 abas para não sobrecarregar a interface
2. **Ícones claros**: Use ícones que representem claramente a seção
3. **Textos curtos**: Mantenha os textos das abas curtos (1-2 palavras)
4. **Reserve espaço**: Lembre-se de adicionar padding-bottom ao conteúdo para não ser coberto pelo TabBar
5. **Consistência**: Use o mesmo padrão de ícones em todo o aplicativo
6. **Feedback visual**: O componente já fornece feedback visual automático ao selecionar

## Casos de Uso Comuns

### App de Redes Sociais

```tsx
const tabs = ['Feed', 'Explorar', 'Postar', 'Notificações', 'Perfil'];
const icons = [
  (isSelected) => <Ionicons name="home" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="compass" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="add-circle" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="heart" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="person" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
];
```

### App de E-commerce

```tsx
const tabs = ['Início', 'Categorias', 'Carrinho', 'Favoritos', 'Conta'];
const icons = [
  (isSelected) => <Ionicons name="home" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="grid" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="cart" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="heart" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="person" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
];
```

### App de Produtividade

```tsx
const tabs = ['Tarefas', 'Calendário', 'Projetos'];
const icons = [
  (isSelected) => <Ionicons name="checkmark-circle" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="calendar" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
  (isSelected) => <Ionicons name="folder" size={24} color={isSelected ? "#262627" : "#8F98AD"} />,
];
```

## Características do Design

- **Posição**: Fixo no rodapé da tela (`position: "absolute"`, `bottom: 0`)
- **Layout**: Distribui as abas uniformemente (`flex: 1` em cada aba)
- **Visual**: Sombra sutil para elevação e separação do conteúdo
- **Texto ativo**: Negrito com cor escura (`#262627`)
- **Texto inativo**: Regular com cor clara (`#8F98AD`)
- **Ícones**: Tamanho recomendado de 24px
- **Altura**: Ajustável automaticamente com base no conteúdo

## Observações Importantes

- O TabBar é sempre renderizado no rodapé da tela, fixo
- Certifique-se de que o conteúdo principal tenha padding-bottom suficiente
- Os ícones devem ser funções que recebem `isSelected` para reagir ao estado
- A primeira aba (índice 0) é selecionada por padrão
- O componente gerencia internamente o estado de seleção


