# InputToolbar Component

O componente InputToolbar é uma barra de entrada de texto otimizada para aplicativos de mensagens e chat. Combina um campo de texto multilinha com um botão de envio, proporcionando uma experiência de usuário fluida e intuitiva.

## Importação

```typescript
import { InputToolbar } from "lavex-design-system";
```

## Props

| Prop          | Tipo                    | Obrigatório | Padrão                  | Descrição                                                    |
| ------------- | ----------------------- | ----------- | ----------------------- | ------------------------------------------------------------ |
| `value`       | `string`                | Sim          | -                       | O valor atual do campo de texto                              |
| `onChange`    | `(value: string) => void` | Sim          | -                       | Função chamada quando o texto é alterado                     |
| `onSend`      | `() => void`            | Sim          | -                       | Função chamada quando o botão de envio é pressionado         |
| `placeholder` | `string`                | Não          | `"Enviar mensagem..."` | Texto de placeholder exibido quando o campo está vazio       |

## Como Funciona

O InputToolbar oferece:

- Campo de texto multilinha que permite quebras de linha com Enter
- Botão de envio com ícone que só fica ativo quando há texto
- Validação automática que impede envio de mensagens vazias
- Estilo visual que indica quando o botão está habilitado/desabilitado
- Integração com teclado nativo do dispositivo

## Uso Básico

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import { InputToolbar } from "lavex-design-system";

const ChatScreen = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log('Mensagem enviada:', message);
    setMessage(''); // Limpa o campo após enviar
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo do chat */}
      <InputToolbar
        value={message}
        onChange={setMessage}
        onSend={handleSend}
      />
    </View>
  );
};
```

## Integração com KeyboardAvoidingView

Para garantir que o InputToolbar não seja coberto pelo teclado, sempre use com `KeyboardAvoidingView`:

```tsx
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
    >
      {/* Conteúdo */}
      <View style={{ paddingBottom: insets.bottom }}>
        <InputToolbar {...props} />
      </View>
    </KeyboardAvoidingView>
  );
};
```

## Boas Práticas

1. **Sempre limpe o campo após enviar**: Use `setMessage('')` no callback `onSend`
2. **Use com KeyboardAvoidingView**: Garante que o teclado não cubra o input
3. **Respeite safe areas**: Use `useSafeAreaInsets()` para evitar sobreposição com controles do sistema
4. **Valide antes de enviar**: O componente já valida texto vazio, mas adicione validações extras se necessário
5. **Feedback visual**: Considere adicionar loading ou confirmação após o envio
6. **Acessibilidade**: O componente já suporta multiline para mensagens longas

