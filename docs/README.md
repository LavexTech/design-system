# Documentação dos Componentes

Este diretório contém a documentação detalhada de todos os componentes do Lavex Design System.

## Índice de Componentes

### 📝 Componentes de Texto

- **[Title1](./Title1.md)** - Títulos principais (Heading 1)
  - Props: `text: string`
  - Uso: Títulos de páginas, seções principais

- **[Title2](./Title2.md)** - Títulos secundários (Heading 2)
  - Props: `text: string`
  - Uso: Subtítulos, cabeçalhos de seções

- **[Title3](./Title3.md)** - Títulos terciários (Heading 3)
  - Props: `text: string`
  - Uso: Títulos de subsções, cabeçalhos de cards

- **[Text](../src/components/Text/Text.tsx)** - Texto padrão para conteúdo
  - Props: `text: string`
  - Uso: Conteúdo principal, parágrafos

- **[Info](./Info.md)** - Texto informativo secundário
  - Props: `text: string`
  - Uso: Informações complementares, dicas, status

### 🏗️ Componentes Estruturais

- **[Card](../src/components/Card/Card.tsx)** - Container para agrupar conteúdo relacionado
  - Props: `title?: string`, `children: React.ReactNode`, `onClick?: () => void`
  - Uso: Agrupar informações, criar cards interativos

- **[List](./List.md)** - Lista organizada de itens com separadores
  - Props: `title?: string`, `children: React.ReactNode`
  - Uso: Listas de tarefas, feeds, menus, coleções de itens

### 🧪 Componentes de Demonstração

- **[HelloWorld](../src/components/HelloWorld/HelloWorld.tsx)** - Componente simples para testes
  - Props: Nenhuma
  - Uso: Testes, demonstrações básicas

## Guias de Uso

### Hierarquia de Títulos
```tsx
<Title1 text="Página Principal" />
  <Title2 text="Seção Importante" />
    <Title3 text="Subseção" />
      <Text text="Conteúdo da subseção" />
      <Info text="Informação adicional" />
```

### Estrutura de Layout Comum
```tsx
<ScrollView>
  <Title1 text="Dashboard" />
  
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

### Cores
- `Constants.styles.textColor.DEFAULT` - #262627
- `Constants.styles.textColor.SUCCESS` - #059669
- `Constants.styles.textColor.DANGER` - #DC2626
- `Constants.styles.textColor.INFO` - #8F98AD

### Espaçamentos
- `Constants.styles.spacing.TINY` - 4px
- `Constants.styles.spacing.SMALL` - 8px
- `Constants.styles.spacing.MEDIUM` - 16px
- `Constants.styles.spacing.LARGE` - 24px
- `Constants.styles.spacing.EXTRA_LARGE` - 32px

### Tipografia
- `Constants.styles.fontSize.LARGE` - 36px
- `Constants.styles.fontSize.MEDIUM` - 24px
- `Constants.styles.fontSize.NORMAL` - 20px
- `Constants.styles.fontSize.SMALL` - 18px
- `Constants.styles.fontSize.TINY` - 14px

## Contribuindo

Para adicionar um novo componente:

1. Crie o componente em `src/components/NomeDoComponente/`
2. Exporte-o em `src/components/index.ts` e `src/index.ts`
3. Crie a documentação em `docs/NomeDoComponente.md`
4. Atualize este arquivo README com a referência ao novo componente
5. Atualize o README principal do projeto

## Exemplos Práticos

Para ver exemplos em funcionamento, consulte o diretório `/demo` que contém uma aplicação Expo com demonstrações de todos os componentes.
