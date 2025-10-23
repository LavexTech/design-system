# Icons - Componentes de Ícones

Os componentes de ícones do Lavex Design System são baseados em SVG do FontAwesome, oferecendo ícones vetoriais escaláveis e customizáveis. Cada ícone é um componente independente e totalmente funcional.

## Importação

```typescript
import { 
  IconStar, 
  IconHome, 
  IconSend 
} from "lavex-design-system";
```

## Props

Todos os componentes de ícones compartilham as mesmas props:

| Prop     | Tipo     | Obrigatório | Padrão      | Descrição                                    |
| -------- | -------- | ----------- | ----------- | -------------------------------------------- |
| `fill`   | `string` | ❌          | `'#262627'` | Cor de preenchimento do ícone                |
| `stroke` | `string` | ❌          | -           | Cor da borda do ícone (opcional)             |
| `width`  | `number` | ❌          | `24`        | Largura do ícone em pixels                   |
| `height` | `number` | ❌          | `24`        | Altura do ícone em pixels                    |

## Ícones Disponíveis

### ⭐ Avaliação e Favoritos
- `IconStar` - Estrela cheia
- `IconStarHalf` - Meia estrela

### 🏠 Navegação
- `IconHome` - Casa/Início
- `IconArrowLeft` - Seta para esquerda
- `IconArrowRight` - Seta para direita
- `IconChevronLeft` - Chevron para esquerda
- `IconChevronRight` - Chevron para direita

### ✉️ Ações
- `IconSend` - Enviar
- `IconPlus` - Adicionar/Mais
- `IconMinus` - Remover/Menos
- `IconClose` - Fechar/X
- `IconTrash` - Lixeira/Deletar

### 🔍 Pesquisa e Filtro
- `IconSearch` - Pesquisar/Lupa
- `IconFilter` - Filtro

### 👤 Usuário e Perfil
- `IconProfile` - Perfil/Usuário
- `IconEye` - Olho/Visualizar
- `IconEyeClosed` - Olho fechado/Ocultar

### 💬 Comunicação
- `IconMessage` - Mensagem/Chat
- `IconHistory` - Histórico/Relógio

### 🖼️ Mídia e Alertas
- `IconImage` - Imagem/Foto
- `IconExclamation` - Alerta/Aviso

## Uso Básico

```tsx
import React from "react";
import { IconStar } from "lavex-design-system";

const MyComponent = () => {
  return <IconStar fill="#FFD700" width={32} height={32} />;
};
```

## Exemplos de Uso

### Ícone com Cor Personalizada

```tsx
import { IconHome } from "lavex-design-system";

<IconHome fill="#4A90E2" width={24} height={24} />
```

### Ícone Grande para Destaque

```tsx
import { IconExclamation } from "lavex-design-system";

<IconExclamation fill="#FF9500" width={48} height={48} />
```

### Ícone Pequeno para Botões

```tsx
import { IconPlus } from "lavex-design-system";

<IconPlus fill="#34C759" width={16} height={16} />
```

### Mensagem de Alerta com Ícone

```tsx
import React from "react";
import { View, Text } from "react-native";
import { IconExclamation } from "lavex-design-system";

const AlertMessage = () => {
  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: '#FFF3CD',
      padding: 16,
      borderRadius: 8,
      gap: 12
    }}>
      <IconExclamation fill="#FF9500" width={24} height={24} />
      <Text style={{ flex: 1, color: '#856404' }}>
        Atenção: Verifique suas informações antes de continuar
      </Text>
    </View>
  );
};
```

## Cores Recomendadas

Use as cores do design system para manter consistência:

```typescript
import Constants from "lavex-design-system/constants";

// Cores de texto
Constants.styles.textColor.DEFAULT   // #262627 - Texto padrão
Constants.styles.textColor.SUCCESS   // #059669 - Sucesso/Positivo
Constants.styles.textColor.DANGER    // #DC2626 - Erro/Negativo
Constants.styles.textColor.INFO      // #8F98AD - Informação

// Ou use cores personalizadas:
fill="#FFD700"  // Ouro para estrelas
fill="#4A90E2"  // Azul para navegação
fill="#34C759"  // Verde para ações positivas
fill="#FF3B30"  // Vermelho para ações destrutivas
fill="#8E8E93"  // Cinza para ícones inativos
```

## Tamanhos Recomendados

| Contexto              | Tamanho    | Uso                                      |
| --------------------- | ---------- | ---------------------------------------- |
| Ícone pequeno         | 16x16      | Dentro de botões pequenos ou badges      |
| Ícone padrão          | 24x24      | Navegação, toolbars, actions             |
| Ícone médio           | 32x32      | Cards, destaque em listas                |
| Ícone grande          | 48x48      | Páginas vazias, onboarding, destaque     |
| Ícone extra grande    | 64x64+     | Splash screens, estados vazios principais|

## Boas Práticas

1. **Consistência de Tamanho**: Use o mesmo tamanho de ícone para elementos do mesmo nível hierárquico
2. **Contraste de Cor**: Certifique-se de que a cor do ícone tenha contraste adequado com o fundo
3. **Significado Claro**: Use ícones que sejam universalmente reconhecidos
4. **Acessibilidade**: Sempre acompanhe ícones importantes com texto ou labels
5. **Toque/Clique**: Para ícones interativos, use área de toque mínima de 44x44px
6. **Performance**: Os ícones SVG são leves, mas evite renderizar centenas simultaneamente
7. **Estados Visuais**: Indique estados (ativo, inativo, hover) através de mudanças de cor

## Diretrizes de Uso

### ✅ Faça

- Use ícones para reforçar ações e melhorar a compreensão
- Mantenha cores consistentes para ações similares
- Use tamanhos proporcionais ao contexto
- Combine ícones com texto em ações importantes
- Indique estados ativos/inativos com mudanças de cor

### ❌ Evite

- Usar ícones obscuros que confundam o usuário
- Misturar estilos de ícones diferentes
- Fazer ícones muito pequenos (< 16px) para ações importantes
- Usar muitas cores diferentes sem consistência
- Depender apenas de ícones sem contexto adicional

## Casos de Uso Comuns

- **Navegação**: Barras de navegação, menus, breadcrumbs
- **Ações**: Botões de adicionar, editar, deletar, enviar
- **Estados**: Indicadores de visibilidade, favoritos, status
- **Busca e Filtro**: Campos de pesquisa, opções de filtro
- **Feedback**: Alertas, notificações, mensagens de status
- **Perfil**: Ícones de usuário, configurações, logout
- **Mídia**: Upload de imagens, galeria, anexos
- **Comunicação**: Chat, mensagens, notificações

## Limitações

- Os ícones são baseados em SVG e podem não funcionar em ambientes muito antigos
- Cada ícone é um componente separado, então importações múltiplas aumentam o bundle size
- A cor `stroke` é opcional e nem sempre produz o efeito esperado em todos os ícones
- Ícones muito pequenos (< 12px) podem perder detalhes visuais

