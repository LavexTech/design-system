# Modal

O componente Modal é usado para exibir mensagens importantes que pausam o uso da tela, como avisos, confirmações ou informações adicionais.

## Props

| Prop         | Tipo         | Obrigatório | Descrição                                                                       |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------------- |
| `title`      | `string`     | ✅          | Título grande que aparece no topo da janela (ex: "Atenção!")                    |
| `text`       | `string`     | ✅          | Mensagem ou descrição que explica o motivo da janela (ex: "Deseja mesmo sair?") |
| `buttonText` | `string`     | ✅          | Texto que aparece no botão para fechar a janela (ex: "Entendi" ou "Fechar")     |
| `onClose`    | `() => void` | ✅          | Função executada quando o botão é clicado para esconder a janela                |
| `visible`    | `boolean`    | ❌          | Controla se o modal está visível (padrão: `true`)                               |

## Casos de Uso

- **Avisos de Sucesso**: Confirmar que uma operação foi realizada com sucesso
- **Confirmações**: Perguntar se o usuário deseja realizar uma ação irreversível
- **Informações**: Exibir detalhes adicionais ou instruções importantes
- **Alertas**: Notificar sobre problemas ou situações que requerem atenção

## Exemplo de Uso

```tsx
import React, { useState } from "react";
import { Modal } from "design-system";

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onPress={() => setShowModal(true)}>Mostrar Modal</Button>

      <Modal
        title="Atenção!"
        text="Deseja realmente excluir este item? Esta ação não pode ser desfeita."
        buttonText="Confirmar"
        onClose={() => setShowModal(false)}
        visible={showModal}
      />
    </>
  );
};
```

## Características

- **Overlay semi-transparente**: Bloqueia a interação com o conteúdo de fundo
- **Centralizado**: Modal aparece no centro da tela
- **Responsivo**: Adapta-se ao tamanho da tela (máximo 85% da largura)
- **Acessível**: Suporta fechamento via botão de voltar do Android
- **Animação**: Transição suave de fade in/out
- **Sombras**: Efeito visual de profundidade
- **Design consistente**: Segue o padrão visual do design system
