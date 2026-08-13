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
| `children`   | `ReactNode`  | Sim         | -      | Conteúdo do modal (pode ser texto, componentes, etc.)                            |
| `onClose`    | `() => void` | Sim         | -      | Função executada quando o botão é clicado para esconder a janela                |
| `visible`    | `boolean`    | Não         | `true` | Controla se o modal está visível                                                |
| `buttonText` | `string`     | Não         | `'OK'` | Texto do botão                                                                  |
| `buttonVariant` | `string`   | Não         | `'default'` | Variante do botão (veja variantes do Button)                                    |
| `buttonSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Não | `'md'` | Tamanho do botão                                                                |

## O que faz

- Exibe uma janela modal centralizada na tela
- Limita a altura máxima a `altura da tela - altura do menu inferior - safe area`, com scroll no corpo quando o conteúdo for maior
- Bloqueia interação com o conteúdo de fundo através de overlay
- Fornece estrutura consistente com título, texto e botão de ação
- Gerencia estado de visibilidade através da prop `visible`
- Aplica animações suaves de entrada e saída
- Integra-se com o design system para estilos consistentes

## Uso Básico

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Button, Text } from "lavex-design-system";

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Button text="Mostrar Modal" onClick={() => setShowModal(true)} />
      
      <Modal
        title="Confirmação"
        onClose={() => setShowModal(false)}
        visible={showModal}
        buttonText="Confirmar"
        buttonVariant="success"
      >
        <Text text="Deseja realmente continuar com esta ação?" />
      </Modal>
    </View>
  );
};
```

## Exemplos com Diferentes Tamanhos de Botão

```tsx
// Botão pequeno
<Modal
  title="Atenção"
  onClose={() => setShowModal(false)}
  visible={showModal}
  buttonText="OK"
  buttonSize="sm"
>
  <Text text="Esta é uma mensagem importante." />
</Modal>

// Botão grande
<Modal
  title="Confirmação"
  onClose={() => setShowModal(false)}
  visible={showModal}
  buttonText="Confirmar"
  buttonVariant="success"
  buttonSize="lg"
>
  <Text text="Deseja realmente continuar?" />
</Modal>
```

## Implementação

O Modal utiliza:

- **GluestackUIProvider**: Para contexto de tema e estilos
- **Gluestack Modal Components**: ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter
- **Grid System**: Para layout estruturado interno
- **Text Component**: Para título e conteúdo
- **Button Component**: Para ações de clique

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

- Não possui variantes de estilo (sempre usa o padrão do design system)
- Requer gerenciamento manual do estado de visibilidade
- Não inclui validação de conteúdo ou tamanho máximo
