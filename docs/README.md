# Documentação dos Componentes

Este diretório contém a documentação detalhada de todos os componentes do Lavex Design System.

## Índice de Componentes

### 📝 Componentes de Texto

- **[MainTitle](./MainTitle.md)** - Títulos principais (Heading 1)
  - Props: `text: string`, `position?: 'left' | 'center' | 'right'`
  - Uso: Títulos de páginas, seções principais

- **[Subtitle](./Subtitle.md)** - Títulos secundários (Heading 2)
  - Props: `text: string`, `position?: 'left' | 'center' | 'right'`
  - Uso: Subtítulos, cabeçalhos de seções

- **[Title](./Title.md)** - Títulos terciários (Heading 3)
  - Props: `text: string`, `position?: 'left' | 'center' | 'right'`
  - Uso: Títulos de subsções, cabeçalhos de cards

- **[Text](./Text.md)** - Texto padrão para conteúdo
  - Props: `text: string`, `size?: 'small' | 'medium' | 'large'`, `level?: 'success' | 'error' | 'warning' | 'default' | 'primary'`, `position?: 'left' | 'center' | 'right'`
  - Uso: Conteúdo principal, parágrafos

- **[Info](./Info.md)** - Texto informativo secundário
  - Props: `text: string`
  - Uso: Informações complementares, dicas, status

- **[TextList](./TextList.md)** - Lista de textos formatados
  - Props: Ver documentação
  - Uso: Exibir listas de textos formatados

- **[TextArea](./TextArea.md)** - Campo de texto multilinha
  - Props: Ver documentação
  - Uso: Entrada de texto longo, comentários

### 🏗️ Componentes Estruturais

- **[Card](../src/components/Card/Card.tsx)** - Container para agrupar conteúdo relacionado
  - Props: `title?: string`, `children: React.ReactNode`, `onClick?: () => void`
  - Uso: Agrupar informações, criar cards interativos

- **[List](./List.md)** - Lista organizada de itens com separadores
  - Props: `title?: string`, `children: React.ReactNode`
  - Uso: Listas de tarefas, feeds, menus, coleções de itens

- **[Grid](./Grid.md)** - Sistema de grid responsivo
  - Props: `children: React.ReactNode`, `columns?: number`, `gap?: number`, `gapX?: number`, `gapY?: number`
  - Uso: Layouts em grid, organização de conteúdo

- **[Divider](../src/components/Divider/Divider.tsx)** - Separador horizontal
  - Props: Nenhuma
  - Uso: Separar seções visualmente

- **[Accordion](./Accordion.md)** - Seções expansíveis/colapsáveis
  - Props: `children: React.ReactNode`
  - Uso: Organizar conteúdo em seções expansíveis

### 🎨 Componentes de Entrada (Inputs)

- **[Input](./Input.md)** - Campo de texto editável
  - Props: `label: string`, `value: string`, `onChange: (value: string) => void`, `placeholder?: string`, `validation?: (value: string) => boolean`, `errorMessage?: string`, `mask?: string`, `mobileKeyboard?: 'text' | 'email' | 'phone' | 'number'`
  - Uso: Entrada de dados genérica com validação e máscara

- **[InputCPF](./InputCPF.md)** - Campo para CPF
  - Props: Ver documentação
  - Uso: Entrada de CPF formatado

- **[InputEmail](./InputEmail.md)** - Campo para email
  - Props: Ver documentação
  - Uso: Entrada de email validado

- **[InputName](./InputName.md)** - Campo para nome
  - Props: Ver documentação
  - Uso: Entrada de nome de usuário

- **[InputPassword](./InputPassword.md)** - Campo para senha
  - Props: Ver documentação
  - Uso: Entrada de senha com ocultação

- **[InputPhone](./InputPhone.md)** - Campo para telefone
  - Props: Ver documentação
  - Uso: Entrada de telefone formatado

- **[InputChat](../src/components/InputChat/InputChat.tsx)** - Campo de entrada para chat
  - Props: Ver código fonte
  - Uso: Mensagens em chats

### 🔘 Componentes de Ação

- **[Button](./Button.md)** - Botão interativo
  - Props: `text: string`, `variant?: string`, `onClick: () => void`
  - Uso: Ações principais, confirmações, navegação

### 🖼️ Componentes de Mídia

- **[Image](./Image.md)** - Exibição de imagens
  - Props: Ver documentação
  - Uso: Exibir imagens com diferentes formatos

- **[Gallery](./Gallery.md)** - Galeria de imagens
  - Props: Ver documentação
  - Uso: Exibir múltiplas imagens em galeria

### 💬 Componentes de Mensagem

- **[Message](./Message.md)** - Mensagem de chat
  - Props: Ver documentação
  - Uso: Exibir mensagens em conversas

- **[Alert](./Alert.md)** - Alerta modal
  - Props: `text: string`
  - Uso: Exibir mensagens de notificação importantes

- **[Modal](./Modal.md)** - Modal de diálogo
  - Props: `title: string`, `children: React.ReactNode`, `onClose: () => void`, `visible?: boolean`, `buttonText?: string`, `buttonVariant?: string`, `buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
  - Uso: Diálogos, confirmações, informações importantes

### ⭐ Componentes de Avaliação

- **[Stars](./Stars.md)** - Sistema de estrelas
  - Props: Ver documentação
  - Uso: Exibir avaliações em estrelas

- **[StarRating](./StarRating.md)** - Avaliação com estrelas
  - Props: Ver documentação
  - Uso: Permitir avaliação por estrelas

### 👤 Componentes de Usuário

- **[UserCardBio](./UserCardBio.md)** - Card de usuário com biografia
  - Props: Ver documentação
  - Uso: Exibir informações de usuário com biografia

- **[UserCardHorizontal](./UserCardHorizontal.md)** - Card de usuário horizontal
  - Props: Ver documentação
  - Uso: Exibir usuário em layout horizontal

- **[UserCardVertical](./UserCardVertical.md)** - Card de usuário vertical
  - Props: Ver documentação
  - Uso: Exibir usuário em layout vertical

- **[UserInfo](./UserInfo.md)** - Informações do usuário
  - Props: Ver documentação
  - Uso: Exibir dados do usuário

- **[UserList](./UserList.md)** - Lista de usuários
  - Props: Ver documentação
  - Uso: Exibir lista de usuários

### 🛒 Componentes de Negócio

- **[Offer](./Offer.md)** - Card de oferta
  - Props: `amount: number`, `distance: number`, `user: User`, `onClick?: () => void`
  - Uso: Exibir ofertas de serviço

- **[OfferList](./OfferList.md)** - Lista de ofertas
  - Props: Ver documentação
  - Uso: Exibir múltiplas ofertas

- **[Order](./Order.md)** - Card de pedido
  - Props: `order: Order`
  - Uso: Exibir informações detalhadas de pedidos

### 🧭 Componentes de Navegação

- **[NavigationBar](./NavigationBar.md)** - Barra de navegação inferior
  - Props: `pages: string[]`, `activePage: string`, `icons: ((isActive: boolean) => ReactNode)[]`, `onNavigate: (page: string) => void`
  - Uso: Navegação principal da aplicação

- **[Stepper](./Stepper.md)** - Indicador de etapas
  - Props: Ver documentação
  - Uso: Mostrar progresso em processos multi-etapas

### 🎯 Componentes de Ícones

- **[Icons](./Icons.md)** - Biblioteca de ícones
  - Ícones disponíveis: ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Close, Edit, Exclamation, Eye, EyeClosed, Filter, History, Home, Image, Message, Minus, Plus, Profile, Search, Send, Star, StarHalf, Trash
  - Uso: Ícones visuais para ações e estados

### 🧪 Componentes de Demonstração

- **[HelloWorld](../src/components/HelloWorld/HelloWorld.tsx)** - Componente simples para testes
  - Props: Nenhuma
  - Uso: Testes, demonstrações básicas

## Guias de Uso

### Hierarquia de Títulos
```tsx
<MainTitle text="Página Principal" />
  <Subtitle text="Seção Importante" />
    <Title text="Subseção" />
      <Text text="Conteúdo da subseção" />
      <Info text="Informação adicional" />
```

### Estrutura de Layout Comum
```tsx
<ScrollView>
  <MainTitle text="Dashboard" />
  
  <List title="Seção 1">
    <Card title="Item 1">
      <Text text="Conteúdo do item" />
      <Info text="Informação adicional" />
    </Card>
    <Card title="Item 2">
      <Text text="Outro conteúdo" />
    </Card>
  </List>
  
  <List title="Seção 2">
    <Card title="Configurações">
      <Text text="Gerencie suas preferências" />
    </Card>
  </List>
</ScrollView>
```

### Padrões de Composição

#### Lista de Tarefas
```tsx
<List title="Minhas Tarefas">
  {tasks.map(task => (
    <Card key={task.id} title={task.title} onClick={() => toggleTask(task.id)}>
      <Text text={task.description} />
      <Info text={`Prazo: ${task.deadline}`} />
    </Card>
  ))}
</List>
```

#### Feed de Notícias
```tsx
<List title="Últimas Notícias">
  {articles.map(article => (
    <Card key={article.id} title={article.headline} onClick={() => openArticle(article.id)}>
      <Text text={article.summary} />
      <Info text={`Publicado em ${article.publishDate}`} />
    </Card>
  ))}
</List>
```

#### Menu de Navegação
```tsx
<List title="Menu">
  <Card title="Dashboard" onClick={() => navigate('dashboard')}>
    <Text text="Visão geral do sistema" />
  </Card>
  <Card title="Relatórios" onClick={() => navigate('reports')}>
    <Text text="Visualize relatórios detalhados" />
  </Card>
</List>
```

## Design System Tokens

### Cores de Texto
- `Constants.styles.textColor.DEFAULT` - #262627
- `Constants.styles.textColor.PRIMARY` - #007AFF
- `Constants.styles.textColor.SUCCESS` - #059669
- `Constants.styles.textColor.DANGER` - #DC2626
- `Constants.styles.textColor.INFO` - #8F98AD
- `Constants.styles.textColor.WARNING` - #F59E0B

### Cores de Fundo
- `Constants.styles.backgroundColor.WHITE` - #FFFFFF
- `Constants.styles.backgroundColor.LIGHT_GRAY` - #F8F9FA
- `Constants.styles.backgroundColor.GRAY` - #E9ECEF

### Cores de Borda
- `Constants.styles.borderColor.LIGHT` - #DEE2E6
- `Constants.styles.borderColor.MEDIUM` - #CED4DA

### Cores Gerais
- `Constants.styles.color.WHITE` - #FFFFFF
- `Constants.styles.color.BLACK` - #000000
- `Constants.styles.color.GOLD` - #FFD700
- `Constants.styles.color.GRAY` - #E0E0E0
- `Constants.styles.color.BLUE` - #007AFF
- `Constants.styles.color.MEDIUM_GRAY` - #6C757D
- `Constants.styles.color.SOFT_BLUE` - #D7E7FA
- `Constants.styles.color.PRIMARY_LIGHT` - #3CDBC0
- `Constants.styles.color.PRIMARY_DARK` - #2D3B42
- `Constants.styles.color.BACKGROUND_LIGHT` - #E5E1E6

### Tipografia - Tamanhos de Fonte
- `Constants.styles.fontSize.LARGEST` - 36px
- `Constants.styles.fontSize.LARGER` - 24px
- `Constants.styles.fontSize.LARGE` - 20px
- `Constants.styles.fontSize.MEDIUM` - 18px
- `Constants.styles.fontSize.SMALL` - 14px

### Tipografia - Line Height
- `Constants.styles.lineHeight.LARGEST` - 30px
- `Constants.styles.lineHeight.LARGER` - 26px
- `Constants.styles.lineHeight.LARGE` - 22px
- `Constants.styles.lineHeight.MEDIUM` - 18px
- `Constants.styles.lineHeight.SMALL` - 14px

### Tipografia - Peso da Fonte
- `Constants.styles.fontWeight.BOLD` - 700
- `Constants.styles.fontWeight.NORMAL` - 400
- `Constants.styles.fontWeight.THIN` - 100

### Tipografia - Família de Fontes
- `Constants.styles.fontFamily.REGULAR` - Roboto-Regular
- `Constants.styles.fontFamily.REGULAR_ITALIC` - Roboto-Italic
- `Constants.styles.fontFamily.EXTRA_LIGHT` - Roboto-ExtraLight
- `Constants.styles.fontFamily.EXTRA_LIGHT_ITALIC` - Roboto-ExtraLightItalic
- `Constants.styles.fontFamily.BOLD` - Roboto-Bold
- `Constants.styles.fontFamily.BOLD_ITALIC` - Roboto-BoldItalic

### Espaçamentos
- `Constants.styles.spacing.TINY` - 4px
- `Constants.styles.spacing.SMALL` - 8px
- `Constants.styles.spacing.MEDIUM` - 16px
- `Constants.styles.spacing.LARGE` - 24px
- `Constants.styles.spacing.EXTRA_LARGE` - 32px

### Bordas
- `Constants.styles.borderRadius.SMALL` - 4px
- `Constants.styles.borderRadius.MEDIUM` - 8px
- `Constants.styles.borderRadius.LARGE` - 12px
- `Constants.styles.borderWidth.THIN` - 0.4px
- `Constants.styles.borderWidth.REGULAR` - 0.8px
- `Constants.styles.borderWidth.THICK` - 1.2px

### Tamanhos de Componentes
- `Constants.styles.componentSize.BUTTON_HEIGHT` - 40px
- `Constants.styles.componentSize.BUTTON_WIDTH` - 40px
- `Constants.styles.componentSize.INPUT_MIN_WIDTH` - 50px

### Opacidade
- `Constants.styles.opacity.LOW` - 0.5
- `Constants.styles.opacity.MEDIUM` - 0.7
- `Constants.styles.opacity.HIGH` - 0.9

### Ícones
- `Constants.styles.icon.SMALL` - 16px
- `Constants.styles.icon.MEDIUM` - 20px

### Largura Máxima
- `Constants.styles.maxWidth.messageBubble` - 70%

### Sombra
- `Constants.styles.shadowColor.DEFAULT` - #000

### Stepper
- `Constants.styles.stepper.ICON_SIZE` - 16px

### Gallery
- `Constants.styles.gallery.CONTAINER_GAP` - 12px

## Contribuindo

Para adicionar um novo componente:

1. Crie o componente em `src/components/NomeDoComponente/`
2. Exporte-o em `src/components/index.ts` e `src/index.ts`
3. Crie a documentação em `docs/NomeDoComponente.md`
4. Atualize este arquivo README com a referência ao novo componente
5. Atualize o README principal do projeto

## Exemplos Práticos

Para ver exemplos em funcionamento, consulte o diretório `/demo` que contém uma aplicação Expo com demonstrações de todos os componentes.
