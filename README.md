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

### 📝 Componentes de Texto

- **MainTitle** - Título principal da aplicação
  ```tsx
  <MainTitle text="Minha Aplicação" />
  ```

- **Title** - Títulos de seção - [Documentação](./docs/Title1.md)
  ```tsx
  <Title text="Seção Principal" />
  ```

- **Subtitle** - Subtítulos
  ```tsx
  <Subtitle text="Descrição da seção" />
  ```

- **Text** - Texto padrão para conteúdo
  ```tsx
  <Text text="Conteúdo do parágrafo" />
  ```

- **Info** - Texto informativo secundário - [Documentação](./docs/Info.md)
  ```tsx
  <Info text="Informação adicional" />
  ```

### 📱 Componentes de Input

- **Input** - Campo de texto genérico - [Documentação](./docs/Input.md)
  ```tsx
  <Input 
    label="Nome" 
    value={name} 
    onChange={setName} 
    placeholder="Digite seu nome" 
  />
  ```

- **InputNumber** - Campo numérico com máscara automática e validação - [Documentação](./docs/InputNumber.md)
  ```tsx
  // Exemplo para cartão de crédito (máscara automática)
  <InputNumber 
    label="Número do Cartão de Crédito" 
    value={cardNumber} 
    onChange={setCardNumber}
    placeholder="0000 0000 0000 0000"
    length={16} 
  />
  // Conforme digita: "1234" → "1234 5678" → "1234 5678 9012 3456"
  
  // Exemplo com validação de intervalo
  <InputNumber 
    label="Idade" 
    value={age} 
    onChange={setAge}
    min={0} 
    max={120} 
    length={3} 
  />
  
  // Exemplo para código de segurança (sem min/max)
  <InputNumber 
    label="CVV" 
    value={cvv} 
    onChange={setCvv}
    placeholder="000"
    length={3} 
  />
  ```

- **InputEmail** - Campo de email com validação - [Documentação](./docs/InputEmail.md)
  ```tsx
  <InputEmail 
    value={email} 
    onChange={setEmail} 
  />
  ```

- **InputPassword** - Campo de senha - [Documentação](./docs/InputPassword.md)
  ```tsx
  <InputPassword 
    value={password} 
    onChange={setPassword} 
  />
  ```

- **InputPhone** - Campo de telefone com máscara - [Documentação](./docs/InputPhone.md)
  ```tsx
  <InputPhone 
    value={phone} 
    onChange={setPhone} 
  />
  ```

- **InputName** - Campo de nome - [Documentação](./docs/InputName.md)
  ```tsx
  <InputName 
    value={fullName} 
    onChange={setFullName} 
  />
  ```

- **InputCPF** - Campo de CPF com máscara - [Documentação](./docs/InputCPF.md)
  ```tsx
  <InputCPF 
    value={cpf} 
    onChange={setCpf} 
  />
  ```

- **InputChat** - Campo de chat com envio
  ```tsx
  <InputChat 
    value={message} 
    onChange={setMessage}
    onSend={handleSend} 
  />
  ```

- **TextArea** - Campo de texto multilinha - [Documentação](./docs/TextArea.md)
  ```tsx
  <TextArea 
    label="Comentário" 
    value={comment} 
    onChange={setComment} 
  />
  ```

#### 🔢 Casos de Uso do InputNumber

```tsx
// 💳 Cartão de Crédito - Máscara automática sem validação de intervalo
<InputNumber 
  label="Número do Cartão"
  value={cardNumber}
  onChange={setCardNumber}
  placeholder="0000 0000 0000 0000"
  length={16}
/>

// 🔒 CVV - Código curto sem validação de intervalo  
<InputNumber 
  label="CVV"
  value={cvv}
  onChange={setCvv}
  placeholder="000"
  length={3}
/>

// 👤 Idade - Com validação de intervalo
<InputNumber 
  label="Idade"
  value={age}
  onChange={setAge}
  min={0}
  max={120}
  length={3}
/>

// 📱 Telefone - Números longos com máscara
<InputNumber 
  label="Número de Telefone"
  value={phone}
  onChange={setPhone}
  placeholder="0000 0000 0000"
  length={11}
/>
```

### 👤 Componentes de Usuário

- **UserCardVertical** - Card de usuário vertical - [Documentação](./docs/UserCardVertical.md)
  ```tsx
  <UserCardVertical 
    name="João Silva" 
    avatar="https://..." 
    rating={4.5} 
  />
  ```

- **UserCardHorizontal** - Card de usuário horizontal - [Documentação](./docs/UserCardHorizontal.md)
  ```tsx
  <UserCardHorizontal 
    user={{ name: "Maria", avatar: "https://..." }} 
  />
  ```

- **UserCardBio** - Card de usuário com biografia - [Documentação](./docs/UserCardBio.md)
  ```tsx
  <UserCardBio 
    name="Ana Costa" 
    bio="Desenvolvedora Frontend" 
    avatar="https://..." 
  />
  ```

- **UserInfo** - Informações do usuário - [Documentação](./docs/UserInfo.md)
  ```tsx
  <UserInfo 
    name="Carlos" 
    email="carlos@email.com" 
  />
  ```

### 📋 Componentes de Lista

- **List** - Lista organizada com separadores - [Documentação](./docs/List.md)
  ```tsx
  <List title="Itens">
    <Text text="Item 1" />
    <Text text="Item 2" />
  </List>
  ```

- **TextList** - Lista de textos - [Documentação](./docs/TextList.md)
  ```tsx
  <TextList items={["Item 1", "Item 2", "Item 3"]} />
  ```

- **UserList** - Lista de usuários - [Documentação](./docs/UserList.md)
  ```tsx
  <UserList users={userArray} />
  ```

- **OfferList** - Lista de ofertas - [Documentação](./docs/OfferList.md)
  ```tsx
  <OfferList offers={offerArray} />
  ```

### 🎛️ Componentes de Interface

- **Button** - Botão com variantes - [Documentação](./docs/Button.md)
  ```tsx
  <Button 
    text="Salvar" 
    variant="success" 
    onClick={handleSave} 
  />
  ```

- **Alert** - Alerta de notificação - [Documentação](./docs/Alert.md)
  ```tsx
  <Alert text="Operação realizada com sucesso!" />
  ```

- **Modal** - Modal/Dialog - [Documentação](./docs/Modal.md)
  ```tsx
  <Modal 
    isVisible={showModal} 
    onClose={() => setShowModal(false)}
    title="Confirmação" 
  />
  ```

- **Accordion** - Painel expansível - [Documentação](./docs/Accordion.md)
  ```tsx
  <Accordion>
    <AccordionItem title="Seção 1">
      <Text text="Conteúdo da seção" />
    </AccordionItem>
  </Accordion>
  ```

- **Stepper** - Indicador de passos - [Documentação](./docs/Stepper.md)
  ```tsx
  <Stepper 
    currentStep={2} 
    totalSteps={4} 
  />
  ```

- **NavigationBar** - Barra de navegação - [Documentação](./docs/NavigationBar.md)
  ```tsx
  <NavigationBar 
    activePage="Home" 
    onPageChange={setActivePage} 
  />
  ```

### 🏗️ Componentes Estruturais

- **Card** - Container para agrupar conteúdo
  ```tsx
  <Card title="Título do Card">
    <Text text="Conteúdo do card" />
  </Card>
  ```

- **Grid** - Sistema de grid responsivo - [Documentação](./docs/Grid.md)
  ```tsx
  <Grid columns={2} gap={4}>
    <GridItem><Text text="Item 1" /></GridItem>
    <GridItem><Text text="Item 2" /></GridItem>
  </Grid>
  ```

- **Divider** - Separador visual
  ```tsx
  <Divider />
  ```

### 🖼️ Componentes de Mídia

- **Image** - Componente de imagem - [Documentação](./docs/Image.md)
  ```tsx
  <Image 
    source="https://..." 
    alt="Descrição da imagem" 
  />
  ```

- **Gallery** - Galeria de imagens - [Documentação](./docs/Gallery.md)
  ```tsx
  <Gallery images={imageArray} />
  ```

### 💬 Componentes de Mensagem

- **Message** - Mensagem de chat - [Documentação](./docs/Message.md)
  ```tsx
  <Message 
    text="Olá, como vai?" 
    sender="user" 
    timestamp="10:30" 
  />
  ```

### ⭐ Componentes de Avaliação

- **StarRating** - Avaliação com estrelas interativa - [Documentação](./docs/StarRating.md)
  ```tsx
  <StarRating 
    rating={4.5} 
    onRatingChange={setRating} 
  />
  ```

- **Stars** - Exibição de estrelas (somente leitura) - [Documentação](./docs/Stars.md)
  ```tsx
  <Stars 
    rating={4.5} 
    size={20} 
  />
  ```

### 🛒 Componentes de E-commerce

- **Order** - Componente de pedido - [Documentação](./docs/Order.md)
  ```tsx
  <Order 
    orderNumber="12345" 
    status="delivered" 
    items={orderItems} 
  />
  ```

- **Offer** - Componente de oferta - [Documentação](./docs/Offer.md)
  ```tsx
  <Offer 
    title="Produto em Oferta" 
    price="R$ 99,90" 
    discount="20%" 
  />
  ```

### 🎨 Ícones

Todos os ícones disponíveis - [Documentação](./docs/Icons.md):

```tsx
import { 
  IconStar, IconHome, IconProfile, IconSearch, 
  IconPlus, IconMinus, IconClose, IconArrowLeft,
  IconEdit, IconTrash, IconEye, IconMessage
} from "lavex-design-system";

<IconStar size={24} color="#FFD700" />
<IconHome size={20} />
<IconEdit size={16} />
```

### 🔧 Utilitários

- **useFonts** - Hook para carregamento de fontes
  ```tsx
  const fontsLoaded = useFonts();
  
  if (!fontsLoaded) {
    return <Loading />; // Aguarda carregamento das fontes
  }
  ```

## Exemplo Completo de Uso

```tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  MainTitle, Title, Text, Card, Grid, GridItem,
  Input, InputEmail, InputNumber, Button, Alert,
  UserCardVertical, StarRating, Modal
} from 'lavex-design-system';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    if (name && email && age) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <MainTitle text="Lavex Design System" />
      
      <Card title="Formulário de Usuário">
        <Grid columns={1} gap={4}>
          <GridItem>
            <Input 
              label="Nome Completo"
              value={name}
              onChange={setName}
              placeholder="Digite seu nome"
            />
          </GridItem>
          
          <GridItem>
            <InputEmail 
              value={email}
              onChange={setEmail}
            />
          </GridItem>
          
          <GridItem>
            <InputNumber 
              label="Idade"
              value={age}
              onChange={setAge}
              min={0}
              max={120}
              length={3}
            />
          </GridItem>
          
          <GridItem>
            <InputNumber 
              label="Número do Cartão de Crédito"
              value={cardNumber}
              onChange={setCardNumber}
              placeholder="0000 0000 0000 0000"
              length={16}
            />
          </GridItem>
          
          <GridItem>
            <Title text="Avalie nossa experiência:" />
            <StarRating 
              rating={rating}
              onRatingChange={setRating}
            />
          </GridItem>
          
          <GridItem>
            <Button 
              text="Salvar Dados"
              variant="success"
              onClick={handleSubmit}
            />
          </GridItem>
        </Grid>
      </Card>

      <Card title="Preview do Usuário">
        <UserCardVertical 
          name={name || "Nome do Usuário"}
          avatar="https://via.placeholder.com/100"
          rating={rating}
        />
      </Card>

      {showAlert && (
        <Alert text="Dados salvos com sucesso!" />
      )}

      <Modal 
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title="Confirmação"
      >
        <Text text="Deseja realmente salvar os dados?" />
      </Modal>
    </ScrollView>
  );
}
```

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

### Regras de atualização
- Sempre que for adicionar um novo componente, criar o arquivo de documentação no diretório `/docs`
- Sempre que qualquer alteração for feita, deve ser atualizada a versão no arquivo `package.json`
- Sempre que qualquer componente for criado deve ter um exemplo na raiz do projeto `/demo/app/index.tsx`