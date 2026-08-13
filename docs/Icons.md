# Icons - Componentes de Ícones

Os componentes de ícones do Lavex Design System são wrappers outline baseados em [Lucide](https://lucide.dev/icons/) (`lucide-react-native`). Cada ícone é um componente independente; o app deve importar apenas estes wrappers — nunca `lucide-react-native` diretamente.

## Importação

```typescript
import { 
  IconStar, 
  IconHome, 
  IconSend,
  IconReceipt,
} from "lavex-design-system";
```

## Props

Todos os componentes de ícones compartilham as mesmas props:

| Prop          | Tipo     | Obrigatório | Padrão      | Descrição                                              |
| ------------- | -------- | ----------- | ----------- | ------------------------------------------------------ |
| `color`       | `string` | Não         | -           | Cor do stroke (preferida)                              |
| `fill`        | `string` | Não         | `'#262627'` | Alias de compatibilidade para `color`                  |
| `size`        | `number` | Não         | -           | Tamanho preferido (px); tem prioridade sobre width/height |
| `width`       | `number` | Não         | `24`        | Usado como size se `size` omitido                      |
| `height`      | `number` | Não         | `24`        | Usado como size se `size` e `width` omitidos           |
| `strokeWidth` | `number` | Não         | `2`         | Espessura do outline                                   |

Estilo padrão: **outline** (stroke). Não há fill sólido por padrão.

## Ícones Disponíveis

### Avaliação e Favoritos
- `IconStar` - Estrela
- `IconStarHalf` - Meia estrela

### Navegação
- `IconHome` - Casa/Início
- `IconHistory` - Histórico
- `IconReceipt` - Recibo/Pedidos
- `IconArrowLeft` - Seta para esquerda
- `IconArrowRight` - Seta para direita
- `IconChevronLeft` - Chevron para esquerda
- `IconChevronRight` - Chevron para direita

### Ações
- `IconSend` - Enviar
- `IconPlus` - Adicionar/Mais
- `IconMinus` - Remover/Menos
- `IconClose` - Fechar/X
- `IconTrash` - Lixeira/Deletar
- `IconEdit` - Editar

### Pesquisa e Filtro
- `IconSearch` - Pesquisar/Lupa
- `IconFilter` - Filtro

### Usuário e Perfil
- `IconProfile` - Perfil/Usuário
- `IconEye` - Olho/Visualizar
- `IconEyeClosed` - Olho fechado/Ocultar

### Comunicação
- `IconMessage` - Mensagem/Chat

### Mídia e Alertas
- `IconImage` - Imagem/Foto
- `IconExclamation` - Alerta/Aviso

## Uso Básico

```tsx
import React from "react";
import { IconStar } from "lavex-design-system";

const MyComponent = () => {
  return <IconStar color="#FFD700" size={32} />;
};
```

## Exemplos de Uso

### Ícone com Cor Personalizada

```tsx
import { IconHome } from "lavex-design-system";

<IconHome color="#4A90E2" size={24} />
```

### Compatibilidade com `fill`

Consumidores legados podem continuar passando `fill`; o valor é mapeado para `color`:

```tsx
<IconHome fill="#4A90E2" width={24} height={24} />
```

### Ícone Grande para Destaque

```tsx
import { IconExclamation } from "lavex-design-system";

<IconExclamation color="#FF9500" size={48} />
```

### Ícone Pequeno para Botões

```tsx
import { IconPlus } from "lavex-design-system";

<IconPlus color="#34C759" size={16} />
```

## Cores Recomendadas

Use as cores do design system para manter consistência:

```typescript
import Constants from "lavex-design-system/constants";

Constants.styles.textColor.DEFAULT   // #262627
Constants.styles.textColor.SUCCESS   // #059669
Constants.styles.textColor.DANGER    // #DC2626
Constants.styles.textColor.INFO      // #8F98AD
```

## Tamanhos Recomendados

| Contexto              | Tamanho | Uso                                      |
| --------------------- | ------- | ---------------------------------------- |
| Ícone pequeno         | 16      | Dentro de botões pequenos ou badges      |
| Ícone padrão          | 24      | Navegação, toolbars, actions             |
| Ícone médio           | 32      | Cards, destaque em listas                |
| Ícone grande          | 48      | Páginas vazias, onboarding, destaque     |
| Ícone extra grande    | 64+     | Splash screens, estados vazios principais|

## Boas Práticas

1. Importe ícones apenas de `lavex-design-system` (não de `lucide-react-native`)
2. Prefira `color` e `size` em código novo
3. Mantenha `strokeWidth` consistente (default 2)
4. Indique estados ativo/inativo com mudança de `color`
5. Para ícones interativos, use área de toque mínima de 44x44px

## Limitações

- Dependem de `react-native-svg` (peer do design system)
- Importar todos os ícones de uma vez aumenta o bundle; importe só os wrappers necessários
- Ícones muito pequenos (< 12px) podem perder detalhes do outline
