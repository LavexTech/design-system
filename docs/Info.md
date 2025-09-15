# Como utilizar - Info

O componente `Info` é usado para textos informativos menores e mais leves que o texto principal. É ideal para explicar pequenas coisas, fornecer dicas ou informações complementares.

## Importação

```typescript
import { Info } from "lavex-design-system";
```

## Props

| Prop   | Tipo     | Obrigatório | Descrição                            |
| ------ | -------- | ----------- | ------------------------------------ |
| `text` | `string` | ✅          | O texto informativo que será exibido |

## Uso Básico

```tsx
import React from "react";
import { Info } from "lavex-design-system";

const MyComponent = () => {
  return <Info text="Este campo é obrigatório" />;
};
```

## Exemplos de Uso

### Texto de Ajuda em Formulários

```tsx
<Info text="Digite seu e-mail para receber notificações" />
```

### Informações Complementares

```tsx
<Info text="Os dados são criptografados e seguros" />
```

### Dicas de Uso

```tsx
<Info text="Toque e segure para ver mais opções" />
```

### Texto de Status

```tsx
<Info text="Última atualização: há 2 minutos" />
```

## Estilização

O componente já vem com estilos pré-definidos que seguem o design system:

- **Tamanho**: Pequeno (12px)
- **Peso**: Normal (400)
- **Cor**: Padrão do design system com opacidade reduzida
- **Altura da linha**: 1.4x o tamanho da fonte para melhor legibilidade

### Cores de Texto Disponíveis

Se precisar de cores diferentes, você pode usar as constantes do design system:

```typescript
import Constants from "lavex-design-system/constants";

// Cores disponíveis:
// Constants.styles.textColor.DEFAULT   - #262627
// Constants.styles.textColor.SUCCESS   - #059669
// Constants.styles.textColor.DANGER    - #DC2626
// Constants.styles.textColor.INFO      - #2563EB
```

## Boas Práticas

1. **Use para informações secundárias**: Reserve o Info para textos que complementam o conteúdo principal
2. **Seja conciso**: Textos informativos devem ser claros e diretos
3. **Não abuse**: Use com moderação para não poluir a interface
4. **Considere o contexto**: Coloque próximo ao elemento que está explicando
5. **Teste a legibilidade**: Verifique se o texto é legível em diferentes tamanhos de tela

## Casos de Uso Comuns

### Formulários

```tsx
import React from "react";
import { View } from "react-native";
import { Title2, Info } from "lavex-design-system";

const LoginForm = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Fazer Login" />
      <Info text="Digite suas credenciais para acessar sua conta" />
      {/* Campos do formulário */}
    </View>
  );
};
```

### Cards de Informação

```tsx
import React from "react";
import { View } from "react-native";
import { Title3, Info } from "lavex-design-system";

const UserCard = () => {
  return (
    <View style={{ padding: 16 }}>
      <Title3 text="João Silva" />
      <Info text="Membro desde janeiro de 2023" />
    </View>
  );
};
```

### Estados de Loading

```tsx
import React from "react";
import { View } from "react-native";
import { Title2, Info } from "lavex-design-system";

const LoadingState = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title2 text="Carregando..." />
      <Info text="Por favor, aguarde enquanto processamos sua solicitação" />
    </View>
  );
};
```

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { Title1, Title2, Info } from "lavex-design-system";

const ProfileScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Title1 text="Meu Perfil" />

      <View style={{ marginTop: 20 }}>
        <Title2 text="Informações Pessoais" />
        <Info text="Mantenha suas informações sempre atualizadas" />
      </View>

      <View style={{ marginTop: 16 }}>
        <Title2 text="Configurações de Privacidade" />
        <Info text="Controle quem pode ver suas informações" />
      </View>
    </View>
  );
};

export default ProfileScreen;
```
