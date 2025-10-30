# Como utilizar - Modal

O componente `Modal` é usado para exibir mensagens importantes que pausam o uso da tela, como avisos, confirmações ou informações adicionais. Ele cria uma sobreposição que bloqueia a interação com o conteúdo de fundo até que seja fechado.

## Importação

```typescript
import { Modal } from "lavex-design-system";
```

## Props

| Prop         | Tipo         | Obrigatório | Padrão | Descrição                                                                       |
| ------------ | ------------ | ----------- | ------ | ------------------------------------------------------------------------------- |
| `title`      | `string`     | Sim         | -      | Título grande que aparece no topo da janela (ex: "Atenção!")                    |
| `text`       | `string`     | Sim         | -      | Mensagem ou descrição que explica o motivo da janela (ex: "Deseja mesmo sair?") |
| `buttonText` | `string`     | Sim         | -      | Texto que aparece no botão para fechar a janela (ex: "Entendi" ou "Fechar")     |
| `onClose`    | `() => void` | Sim         | -      | Função executada quando o botão é clicado para esconder a janela                |
| `visible`    | `boolean`    | Não         | `true` | Controla se o modal está visível                                                |

## O que faz

- Exibe uma janela modal centralizada na tela
- Bloqueia interação com o conteúdo de fundo através de overlay
- Fornece estrutura consistente com título, texto e botão de ação
- Gerencia estado de visibilidade através da prop `visible`
- Aplica animações suaves de entrada e saída
- Integra-se com o design system para estilos consistentes

## Uso Básico

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Button } from "lavex-design-system";

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button text="Mostrar Modal" onClick={() => setShowModal(true)} />
      
      <Modal
        title="Confirmação"
        text="Deseja realmente continuar com esta ação?"
        buttonText="Entendi"
        onClose={() => setShowModal(false)}
        visible={showModal}
      />
    </View>
  );
};
```

## Implementação

O Modal utiliza:

- **GluestackUIProvider**: Para contexto de tema e estilos
- **Gluestack Modal Components**: ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter
- **Grid System**: Para layout estruturado interno
- **Text Component**: Para título e conteúdo
- **Button Component**: Para ação de fechamento

## Posicionamento

Para garantir que o modal apareça sobre todo o conteúdo da tela:

```tsx
// ✅ Correto - Modal fora do ScrollView
<View style={{ flex: 1 }}>
  <ScrollView>
    {/* Conteúdo da tela */}
  </ScrollView>
  
  {showModal && (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}>
      <Modal {...props} />
    </View>
  )}
</View>

// ❌ Incorreto - Modal dentro do ScrollView
<ScrollView>
  <Modal {...props} />
  {/* Conteúdo */}
</ScrollView>
```

## Limitações

- Não suporta múltiplos botões (apenas um botão de ação)
- Não possui variantes de estilo (sempre usa o padrão do design system)
- Requer gerenciamento manual do estado de visibilidade
- Não inclui validação de conteúdo ou tamanho máximo
