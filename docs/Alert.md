# Como utilizar - Alert

O componente `Alert` é um popup modal que aparece na tela para exibir mensagens de notificação importantes. É usado para avisos de sucesso, erro, informações ou alertas que podem ser temporárias ou precisar de fechamento manual.

## Importação

```typescript
import { Alert } from "lavex-design-system";
```

## Props

| Prop      | Tipo                              | Obrigatório | Descrição                                                                   |
| --------- | --------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `text`    | `string`                          | ✅          | A mensagem principal que será exibida no alerta                             |
| `icon`    | `string`                          | ❌          | Ícone opcional que pode acompanhar a mensagem para dar mais contexto visual |
| `type`    | `"danger" \| "success" \| "info"` | ✅          | Define o estilo visual e a cor do alerta                                    |
| `onClose` | `() => void`                      | ✅          | Função chamada quando o usuário fecha o alerta                              |

## Uso Básico

```tsx
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Alert } from "lavex-design-system";

const MyComponent = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowAlert(true)}>
        <Text>Mostrar Alerta</Text>
      </TouchableOpacity>

      {showAlert && (
        <Alert
          text="Operação realizada com sucesso!"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  );
};
```

## Exemplos de Uso

### Alerta de Sucesso

```tsx
<Alert
  text="Dados salvos com sucesso!"
  icon="✅"
  type="success"
  onClose={() => setShowAlert(false)}
/>
```

### Alerta de Erro

```tsx
<Alert
  text="Erro ao processar solicitação. Tente novamente."
  icon="⚠️"
  type="danger"
  onClose={() => setShowAlert(false)}
/>
```

## Tipos de Alert

### Danger (Perigo/Erro)

- **Cor**: Vermelho (#DC2626)
- **Fundo**: Vermelho claro (#FEF2F2)
- **Uso**: Erros, falhas, avisos críticos

### Success (Sucesso)

- **Cor**: Verde (#059669)
- **Fundo**: Verde claro (#F0FDF4)
- **Uso**: Confirmações, sucessos, operações concluídas

### Info (Informação)

- **Cor**: Cinza (#8F98AD)
- **Fundo**: Cinza claro (#F8FAFC)
- **Uso**: Informações gerais, dicas, avisos

## Boas Práticas

1. **Use com moderação**: Alertas devem ser usados apenas para informações importantes
2. **Seja claro**: Mensagens devem ser diretas e fáceis de entender
3. **Considere o contexto**: Use o tipo apropriado para cada situação
4. **Forneça ação**: Sempre permita que o usuário feche o alerta
