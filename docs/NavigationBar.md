# Como utilizar - NavigationBar

O componente `NavigationBar` é uma barra de navegação fixa posicionada no rodapé da tela. Permite que o usuário alterne entre as páginas "Pedido", "Histórico" e "Conta" do aplicativo.

## Importação

```typescript
import { NavigationBar } from "lavex-design-system";
```

## Props

| Prop         | Tipo                                             | Obrigatório | Descrição                                                      |
| ------------ | ------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `pages`      | `string[]`                                       | Sim         | Array de textos que serão exibidos em cada aba                |
| `icons`      | `((isActive: boolean) => React.ReactNode)[]`    | Não         | Array de funções que retornam ícones para cada aba            |
| `activePage` | `string`                                         | Sim         | Controla qual é a rota ativa atual                            |
| `onNavigate` | `(page: string) => void`                         | Não         | Função executada quando houver navegação entre páginas        |

## Uso Básico

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { NavigationBar } from "lavex-design-system";

const MyApp = () => {
  const [currentPage, setCurrentPage] = useState("Pedido");
  const pages = ["Pedido", "Histórico", "Conta"];

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo do app */}
      
      <NavigationBar 
        pages={pages}
        activePage={currentPage}
        onNavigate={(page) => setCurrentPage(page)} 
      />
    </View>
  );
};
```

## Exemplo com Ícones

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { NavigationBar } from "lavex-design-system";
import { IconMessage, IconHistory, IconProfile } from "lavex-design-system";

const AppWithIcons = () => {
  const [currentPage, setCurrentPage] = useState("Pedido");
  
  const pages = ["Pedido", "Histórico", "Conta"];
  const icons = [
    (isActive: boolean) => (
      <IconMessage fill={isActive ? "#262627" : "#8F98AD"} width={24} height={24} />
    ),
    (isActive: boolean) => (
      <IconHistory fill={isActive ? "#262627" : "#8F98AD"} width={24} height={24} />
    ),
    (isActive: boolean) => (
      <IconProfile fill={isActive ? "#262627" : "#8F98AD"} width={24} height={24} />
    ),
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo do app */}
      
      <NavigationBar 
        pages={pages}
        icons={icons}
        activePage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          console.log(`Navegou para: ${page}`);
        }} 
      />
    </View>
  );
};

export default AppWithIcons;
```

## Páginas Disponíveis

O NavigationBar possui três páginas fixas:

- **"Pedido"**: Página de pedidos
- **"Histórico"**: Página de histórico
- **"Conta"**: Página de conta do usuário

## Características do Design

- **Posição**: Fixo no rodapé da tela (`position: "absolute"`, `bottom: 0`)
- **Layout**: Distribui as três abas uniformemente (`flex: 1` em cada aba)
- **Visual**: Sombra sutil para elevação e separação do conteúdo
- **Texto ativo**: Negrito com cor escura (`#262627`)
- **Texto inativo**: Regular com cor clara (`#8F98AD`)
- **Altura**: Ajustável automaticamente com base no conteúdo

## Boas Práticas

1. **Reserve espaço**: Lembre-se de adicionar padding-bottom ao conteúdo para não ser coberto pelo NavigationBar
2. **Estado consistente**: Mantenha o estado `activePage` sincronizado com o conteúdo exibido
3. **Feedback visual**: O componente fornece feedback visual automático ao selecionar uma página
4. **Navegação suave**: Use transições suaves ao alternar entre páginas

## Observações Importantes

- O NavigationBar é sempre renderizado no rodapé da tela, fixo
- Certifique-se de que o conteúdo principal tenha padding-bottom suficiente
- A primeira página ("Pedido") deve ser definida como padrão no estado inicial
- O componente gerencia internamente o visual de seleção baseado na prop `activePage`