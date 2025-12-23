# Como utilizar - Text

O componente `Text` é usado para exibir texto padrão em diferentes tamanhos e níveis de importância. É o componente base para conteúdo textual, oferecendo flexibilidade em tamanho, cor e alinhamento.

## Importação

```typescript
import { Text } from "lavex-design-system";
```

## Props

| Prop       | Tipo                                                                    | Obrigatório | Padrão      | Descrição                                    |
| ---------- | ----------------------------------------------------------------------- | ----------- | ----------- | -------------------------------------------- |
| `text`     | `string`                                                                | Sim         | -           | O texto que será exibido                     |
| `size`     | `'small' \| 'medium' \| 'large'`                                        | Não         | `'medium'`  | Tamanho da fonte                              |
| `level`    | `'success' \| 'error' \| 'warning' \| 'default' \| 'primary'`          | Não         | `'default'` | Nível de importância/cor do texto            |
| `position` | `'left' \| 'center' \| 'right'`                                         | Não         | `'left'`    | Alinhamento horizontal do texto               |

## Uso Básico

```tsx
import React from "react";
import { Text } from "lavex-design-system";

const MyComponent = () => {
  return <Text text="Este é um texto padrão" />;
};
```

## Exemplos de Uso

### Texto Padrão

```tsx
<Text text="Conteúdo principal da página" />
```

### Texto Pequeno

```tsx
<Text text="Informação adicional" size="small" />
```

### Texto Grande

```tsx
<Text text="Destaque importante" size="large" />
```

### Texto de Sucesso

```tsx
<Text text="Operação realizada com sucesso!" level="success" />
```

### Texto de Erro

```tsx
<Text text="Erro ao processar solicitação" level="error" />
```

### Texto de Aviso

```tsx
<Text text="Atenção: Esta ação não pode ser desfeita" level="warning" />
```

### Texto Primário

```tsx
<Text text="Informação importante" level="primary" />
```

### Texto Centralizado

```tsx
<Text text="Texto centralizado" position="center" />
```

### Combinação de Props

```tsx
<Text 
  text="Mensagem de sucesso grande e centralizada" 
  size="large" 
  level="success" 
  position="center" 
/>
```

## Características

- Suporte a três tamanhos: small (15px), medium (18px), large (20px)
- Cinco níveis de cor: default, success, error, warning, primary
- Suporte a alinhamento horizontal (left, center, right)
- Quebra de linha automática para textos longos
- Peso da fonte normal (NORMAL)
- Line height grande para melhor legibilidade
- Fonte Roboto Regular
- Flex wrap e shrink habilitados para responsividade

## Tamanhos Disponíveis

| Tamanho  | Valor | Quando usar                                    |
| -------- | ----- | ---------------------------------------------- |
| `small`  | 15px  | Textos auxiliares, informações secundárias     |
| `medium` | 18px  | Texto padrão para conteúdo principal          |
| `large`  | 20px  | Destaques, informações importantes            |

## Níveis de Cor

| Nível     | Cor    | Quando usar                                    |
| --------- | ------ | ---------------------------------------------- |
| `default` | Cinza  | Texto padrão, conteúdo normal                  |
| `success` | Verde  | Mensagens de sucesso, confirmações             |
| `error`   | Vermelho | Mensagens de erro, alertas críticos          |
| `warning` | Amarelo | Avisos, alertas de atenção                    |
| `primary` | Azul   | Informações importantes, links                 |

## Boas Práticas

1. **Use para conteúdo textual**: Reserve o Text para parágrafos, descrições e conteúdo principal
2. **Hierarquia visual**: Use diferentes tamanhos para criar hierarquia visual no conteúdo
3. **Cores semânticas**: Use os níveis de cor de forma consistente (success para sucesso, error para erros)
4. **Não abuse das cores**: Use cores apenas quando necessário para destacar informações importantes
5. **Consistência**: Mantenha o mesmo tamanho para textos do mesmo tipo em toda a aplicação
6. **Legibilidade**: Prefira `size="medium"` para textos longos e `size="small"` apenas para informações auxiliares
7. **Alinhamento**: Use `position="center"` para mensagens de destaque ou confirmação

## Exemplo Completo

```tsx
import React from "react";
import { View } from "react-native";
import { MainTitle, Subtitle, Title, Text } from "lavex-design-system";

const ProfileScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <MainTitle text="Meu Perfil" />
      
      <View style={{ marginTop: 24 }}>
        <Subtitle text="Informações Pessoais" />
        <Text text="Mantenha suas informações sempre atualizadas" size="small" />
        
        <View style={{ marginTop: 16 }}>
          <Title text="Nome Completo" />
          <Text text="João Silva" />
        </View>
        
        <View style={{ marginTop: 16 }}>
          <Title text="Email" />
          <Text text="joao.silva@example.com" level="primary" />
        </View>
      </View>
      
      <View style={{ marginTop: 24 }}>
        <Subtitle text="Status da Conta" />
        <Text 
          text="Conta verificada e ativa" 
          level="success" 
          size="large"
          position="center"
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
```

