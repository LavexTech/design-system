# Alert Component

O componente Alert é um popup modal que aparece na tela para exibir mensagens de notificação importantes.

## Importação

```tsx
import { Alert } from "lavex-design-system";
```

## Props

| Prop   | Tipo     | Obrigatório | Descrição                                    |
| ------ | -------- | ----------- | -------------------------------------------- |
| `text` | `string` | Sim         | A mensagem principal que será exibida no alerta |

## O que faz

- Popup modal centralizado na tela
- Ícone de exclamação automático
- Texto centralizado com tamanho médio
- Fundo branco com bordas arredondadas
- Responsivo (máximo 90% da largura da tela ou 400px)

## Exemplo Básico

```tsx
import { Alert } from "lavex-design-system";

<Alert text="Operação realizada com sucesso." />
```

## Exemplos de Uso

```tsx
<Alert text="Erro ao processar solicitação. Tente novamente." />
```

## Como funciona

1. Renderiza um container centralizado na tela
2. Exibe um box branco com bordas arredondadas
3. Mostra ícone de exclamação no topo
4. Centraliza o texto abaixo do ícone
5. Responsivo para diferentes tamanhos de tela

## Observações

- Não possui botão de fechamento automático
- Deve ser controlado externamente (mostrar/ocultar)
- Usa ícone fixo de exclamação
- Ideal para mensagens temporárias ou de confirmação
