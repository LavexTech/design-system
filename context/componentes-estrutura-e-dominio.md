# Componentes — estrutura, feedback, mídia, usuário e domínio

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md). Textos, campos, ações e navegação estão em [`componentes-base.md`](./componentes-base.md); as convenções do catálogo (tokens do tema, `darkMode` ignorada, `fontScale`) estão no topo daquele arquivo.

---

## 1. Estrutura e contêineres

### `Card`

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `title` | `string` | — |
| `onClick` | `() => void` | — (vira `TouchableOpacity`, `activeOpacity` 0,7) |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
┌───────────────────────────────────────┐
│ Título (14, peso 700)                 │  padding 16, raio 8, borda 0,4 border
│ ↓ 8                                   │
│ children (width 100%, overflow hidden)│
└───────────────────────────────────────┘
   ↓ marginBottom 8
```

Largura total, fundo `surface`. O título usa Regular com `fontWeight` 700 (negrito sintético), cor `text`, tamanho `14 × fontScale`.

### `Grid` / `GridItem`

Layout em colunas medido em JS (não é flex-wrap nem biblioteca).

| `Grid` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `columns` | `number` | `12` |
| `gap` / `gapX` / `gapY` | `number` | — |
| `darkMode` | `boolean` | ignorada |

| `GridItem` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `colSpan` | `number` | `1` (limitado a `[1, columns]`) |

- **`gap` não é pixel**: é a escala do Tailwind. `<=1 → 4`, `<=2 → 8`, `<=3 → 12`, `<=4 → 16`, `<=6 → 24`, `<=8 → 32`, acima → 48 px. `gapX`/`gapY` sobrescrevem `gap` em cada eixo.
- Mede a própria largura no `onLayout` e **não renderiza nada até medir** (primeiro frame vazio).
- Filho que não é `GridItem` entra com `colSpan` 1. As células são agrupadas em linhas até somar `columns`; largura da célula = `floor((largura − vãos da linha) × colSpan / columns)`.
- `GridItem` em si só devolve `children`; quem lê `colSpan` é o `Grid`.

### `List`

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `title` | `string` | — (vira `Subtitle` no topo) |
| `divider` | `boolean` | `true` |

Coluna de largura total. Entre itens (nunca antes do primeiro) uma linha de 1 px `border` com margem vertical 8.

### `TextList`

`texts: string[]` (obrigatória). Um `List` sem título com um `Text` medium (16) por string. Sem bullets.

### `Divider`

Linha horizontal de largura total, altura 0,4 px, cor `border`. Sem margens. `darkMode` ignorada.

### `Tag`

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `variant` | `'primary-outline' \| 'success-outline' \| 'danger-outline' \| 'warning-outline'` | `'primary-outline'` |
| `size` | `'default' \| 'sm'` | `'default'` |
| `fontScale` | `number` | `1` |
| `darkMode` | `boolean` | ignorada |

Etiqueta **preenchida** (o sufixo `-outline` ficou por compatibilidade). Raio 12, sem borda, mede pelo conteúdo. Texto Bold, `default` 14 (padding 8/4) e `sm` 11,9 (padding 6/2), `lineHeight` = fonte × 1,3.

| Variante | Fundo | Texto |
|---|---|---|
| `primary-outline`, `success-outline` | `surfaceAccent` `#E2FAF6` | `accent` `#0B7566` |
| `danger-outline` | `surfaceDanger` `#FDECEC` | `danger` `#C62828` |
| `warning-outline` | `#FFF4E5` fixo | `#8A5A00` fixo |

Não é tocável. Tipos `TagVariant` e `TagSize` não são exportados no `index.ts`.

### `Modal`

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `onClose` | `() => void` | obrigatória |
| `title` | `string` | — |
| `visible` | `boolean` | `true` |
| `buttonText` | `string` | `'OK'` |
| `buttonVariant` | variante de `Button` (sem `link-gray`) | `'default'` |
| `buttonSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — (`md`) |
| `confirmText` | `string` | `'OK'` quando há `onConfirm` |
| `onConfirm` | `() => void` | — (ativa o modo confirmação) |
| `confirmVariant` | variante de `Button` | `'success'` |
| `confirmDisabled` | `boolean` | `false` |
| `closeOnConfirm` | `boolean` | `true` |
| `stackedButtons` | `boolean` | `false` |
| `contentMinHeight` | `number` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
▒▒▒▒▒▒▒ backdrop rgba(0,0,0,.5) — toque chama onClose ▒▒▒▒▒▒▒
   ┌─────────────────────────────────┐  80% da largura (máx. 510), raio 6,
   │             Título              │  borda 1 border, padding 24, fundo surface
   │ children (rola; máx. 70% da     │
   │ altura útil)                    │
   │ [Cancelar]        [Confirmar]   │  com onConfirm: dois botões dividindo a largura
   └─────────────────────────────────┘  sem onConfirm: um botão alinhado à direita
   stackedButtons:   [   Confirmar   ]
                          Voltar         (link fica centralizado; outras variantes esticam)
```

- `RN Modal` transparente com `animationType="fade"` e `statusBarTranslucent`; cobre a stack de navegação. `onRequestClose` (voltar do Android) chama `onClose`.
- Teclado: o overlay é uma `KeyboardAvoidingView` (`behavior="padding"` nas duas plataformas). Com o teclado aberto o cartão sobe e encolhe junto com a área visível; o corpo rola e mantém toques (`keyboardShouldPersistTaps="handled"`). Campos dentro do `Modal` nunca ficam atrás do teclado.
- Altura máxima do cartão = altura da janela − 76 (`NAVIGATION_BAR_HEIGHT`) − safe area inferior. O corpo é um `ScrollView` limitado a 70% disso.
- Título: `Text` medium (16) centralizado.
- Modo confirmação: se `buttonText` ainda for `'OK'` vira `"Cancelar"`; `buttonVariant` `'default'` vira `'default-outline'`. Confirmar chama `onConfirm` e, com `closeOnConfirm`, `onClose`.
- Precisa de `SafeAreaProvider` (`react-native-safe-area-context`) na árvore do app.

### `Drawer` (+ `useDrawerScroll`)

Painel que sobe de baixo, sem barra de título nem chevron de voltar. Usado no app do cliente para as avaliações da Lavexer e para a escolha de entrega do pedido FLEX.

| Prop | Tipo | Default |
|---|---|---|
| `visible` | `boolean` | obrigatória |
| `onClose` | `() => void` | obrigatória (chamada **depois** da animação de saída) |
| `children` | `ReactNode` | obrigatória (ocupa o espaço entre o topo e o rodapé, `flex: 1`) |
| `heightRatio` | `number` | `0.75` (fração da altura da janela; limitada a `[0,1; 1]`) |
| `footer` | `ReactNode` | — (rodapé fixo com borda superior, padding 16 + safe area inferior) |
| `closeAccessibilityLabel` | `string` | `'Fechar'` |

```
▒▒▒▒▒▒▒▒ fundo rgba(0,0,0,.5) (1/4 da tela) — toque fecha ▒▒▒▒▒▒▒▒
┌──────────────────── ▔▔▔▔ ───────────────────── ✕ ┐  raio 16 no topo, fundo surface
│ children (rola com useDrawerScroll)                 │  altura = janela × heightRatio
│                                                     │  cobre a tab bar (RN Modal)
├─────────────────────────────────────────────────────┤
│ footer                                              │
└─────────────────────────────────────────────────────┘
```

- `RN Modal` transparente, `animationType="none"`: a entrada é um slide-up de 300 ms (`Easing.out(cubic)`) com o fundo em fade; a saída é o slide-down inverso. O fundo acompanha o arraste.
- Fecha por **X** (canto superior direito), **toque no fundo escuro**, **swipe para baixo** (arrastar mais de 25% da altura ou soltar com velocidade > 1) e **voltar do Android**. Todos passam pela mesma animação de saída e só então chamam `onClose`. Arraste curto volta para o lugar.
- `visible` indo a `false` por fora (o app navegou) também anima a saída antes de desmontar.
- Gesto: `PanResponder` na fase de captura, só para arraste vertical para baixo. Para não brigar com listas, o conteúdo rolável deve espalhar `useDrawerScroll()` (`<FlatList {...useDrawerScroll()} />`): com a lista fora do topo, o arraste rola a lista; no topo, desce a drawer. Sem isso, o arraste para baixo sempre desce a drawer.
- Uma barrinha (grabber) no topo indica o arraste; não é barra de título.
- Precisa de `SafeAreaProvider` na árvore do app.

### `Accordion` / `AccordionItem`

Seções expansíveis, uma aberta por vez.

| `Accordion` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `defaultValue` | `string` | — (id que começa aberto) |
| `darkMode` | `boolean` | `false` (**usada**: escolhe o tema legado) |

| `AccordionItem` | Tipo | Default |
|---|---|---|
| `id` / `title` / `children` | `string` / `string` / `ReactNode` | obrigatórias |
| `leading` | `ReactNode` | — (antes do título, margem 8) |
| `titleAccessory` | `ReactNode` | — (logo após o título, gap 8) |
| `trailingAccessory` | `ReactNode` | — (antes do chevron, margem 8) |
| `contentBackground` | `string` | — (fundo do conteúdo, com padding 16) |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
┌──────────────────────────────────────────────┐
│ [leading] Título [titleAccessory]  [trail] ⌄ │  padding 16/12
└──────────────────────────────────────────────┘
  children (quando aberto)
───────────────────────────────────────────────  Divider após cada item
```

Título Bold `18 × fontScale`; chevron 20 gira 180° aberto. Cores do **tema legado** (`Constants.styles.theme`): claro `#2D3B42` sobre `#FFFFFF`, escuro `#F3F7FF` sobre `#121821`. Troca com `LayoutAnimation` easeInEaseOut de 300 ms (habilitada no Android). O item aberto pode ser fechado.

### `RadioCard` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `selected` | `boolean` | obrigatória |
| `onSelect` | `() => void` | obrigatória |
| `children` | `ReactNode` | obrigatória (conteúdo livre) |
| `showRadio` | `boolean` | `true` |
| `disabled` | `boolean` | `false` |
| `accessibilityLabel` | `string` | — |

```
┌──────────────────────────────────────────┐
│ (●)  children (flex 1)                   │ altura mín. 72, padding 16/12, raio 14, gap 14
└──────────────────────────────────────────┘
```

Borda 1,5: `accent` selecionado, `borderInteractive` não. Rádio 22 px com miolo de 11 px `accent`. Desabilitado: fundo `surfaceMuted`. Pressionado 0,85. `accessibilityRole="radio"`. Controlado; o grupo (exclusividade) é responsabilidade da tela.

### `SwipeableListItem`

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | obrigatória |
| `onDelete` | `() => void` | obrigatória |
| `onPress` | `() => void` | — |
| `isOpen` | `boolean` | — (controlado quando definido) |
| `onOpenChange` | `(open: boolean) => void` | — |
| `deleteWidth` | `number` | `72` |
| `swipeEnabled` | `boolean` | `true` |

```
fechado:                        aberto (arrastado para ←):
┌──────────────────────────┐    ┌────────────────────┬─────┐
│ children                 │    │ children           │  🗑 │  #DC2626, deleteWidth
└──────────────────────────┘    └────────────────────┴─────┘
```

Conteúdo com fundo `surface` e hairlines `border` no topo e na base, por cima de um trilho vermelho com `IconTrash` branco 20 (`accessibilityLabel="Excluir"`). `PanResponder` só assume após 10 px horizontais predominando (desiste se o vertical passar de 10 px); arraste limitado a `[-deleteWidth, 0]`. Ao soltar: abre com `vx < −0,45`, fecha com `vx > 0,45`, senão abre além de 45% da faixa. `Animated.spring` sem bounce. Tocar o conteúdo aberto **fecha** em vez de chamar `onPress`. `swipeEnabled: false` fecha e ignora o gesto. Modo controlado permite manter um item aberto por lista.

### `SimpleTable`

| Prop | Tipo | Default |
|---|---|---|
| `items` | `{ label: string, value: string, emphasis?: boolean }[]` | obrigatória |

```
┌───────────────────────┬───────────────────────┐
│ Pedido                │                  #123 │  cada linha: borda 1 border, padding 16/12
├───────────────────────┼───────────────────────┤  colunas de 50%
│ **Total**             │            **R$ 45,00**│  emphasis: rótulo Bold, valor 22/28
└───────────────────────┴───────────────────────┘
```

Rótulo Regular 16/24, valor Bold 16/24 alinhado à direita, ambos `text`, fundo `surface`. Primeira linha arredonda os cantos de cima (raio 12), última os de baixo; linhas se sobrepõem 1 px para não dobrar a borda. Cada linha é um elemento acessível `"{label}: {value}"`. Tipos `SimpleTableItem` e `SimpleTableProps` exportados.

### `IconButtonLarge`

| Prop | Tipo | Default |
|---|---|---|
| `icon` | `'credit-card' \| 'message-square' \| 'message-square-text' \| 'qr-code' \| 'truck'` | obrigatória |
| `title` / `description` | `string` | obrigatórias |
| `onClick` | `() => void` | obrigatória |
| `position` | `'first' \| 'middle' \| 'last'` | — |

```
┌──────────────────────────────────────────────┐
│ [▢ic]  Título em negrito                   › │  padding 16/8, borda 1 border
│        Descrição (Info)                      │  colunas flex 2 / 9 / 1
└──────────────────────────────────────────────┘
```

Ícone 18 `#2D3B42` numa caixa de 40 px `#F4F4F5` raio 12 (fixos). Título `Text` Bold; descrição `Info`; `IconChevronRight` 20 `textMuted`. Fundo `surface`, pressionado `surfaceSubtle`. `first` arredonda os cantos de cima (16), `last` os de baixo; `middle`/`last` sobem 1 px para colar na borda do anterior. Sem `position`, cantos retos. Usado empilhado como menu na Conta.

### `PaymentButton`

| Prop | Tipo | Default |
|---|---|---|
| `graphic` | `ReactNode` | obrigatória (logo ou ícone) |
| `title` / `subtitle` | `string` | obrigatórias |
| `initiallySelected` | `boolean` | `false` |
| `selected` | `boolean` | — (modo controlado; vence o estado interno) |
| `onChange` | `(selected: boolean) => void` | — |
| `disabled` | `boolean` | `false` |

```
┌──────────────────────────────────────────────┐
│ ┌──────┐  Pix                           (✓)  │  colunas flex 3 / 8 / 1, padding 12, raio 14
│ └──────┘  Aprovação imediata                 │  título Bold 16/24, subtítulo 14/20 textMuted
└──────────────────────────────────────────────┘
 miniatura: largura ≤64, proporção 1,5, fundo #FFFFFF, raio 8, borda 1 border
```

Não selecionado: borda 1,5 `borderInteractive`, fundo `surface`. Selecionado: borda `accent`, fundo `surfaceAccent`, check circular 22 `accent` com `IconCheck` 14 (traço 3) na cor `background`. Título e subtítulo **truncam em 1 linha** (`numberOfLines={1}`; única exceção da regra "nada trunca"). O toque inverte a seleção (não é rádio exclusivo: a tela garante a exclusividade). Desabilitado 0,5; pressionado 0,85. `initiallySelected` resincroniza o estado interno quando muda. `accessibilityRole="radio"`.

---

## 2. Feedback e status

### `StatusBanner` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `variant` | `'info' \| 'dark'` | `'info'` |
| `icon` | `ReactNode` | `IconExclamation` 20 |
| `align` | `'left' \| 'center'` | `'left'` |
| `trailing` | `ReactNode` | — |

```
┌──────────────────────────────────────────┐
│ (!)  Texto do aviso, 13/18, flex 1   [t] │ padding 16/14, raio 14, gap 12, alinhado ao topo
└──────────────────────────────────────────┘
```

`info`: fundo `#EEFBF8`, ícone `#0B7566`, texto `#2D3B42` (fixos). `dark`: fundo `inverseSurface`, ícone `primary`, texto `onInverse`. `accessibilityRole="alert"`.

### `EmptyState` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `title` | `string` | obrigatória |
| `description` | `string` | — |
| `icon` | `ReactNode` | `IconSearch` 36 `accent` |
| `action` | `ReactNode` | — (ex.: `Button`) |

Coluna centralizada, padding 32, gap 8: círculo 96 `#E6F7F6` com o ícone, título Bold 17 `text`, descrição Regular 15/22 `textMuted` (largura máx. 280) e `action`.

### `ErrorBox`

| Prop | Tipo | Default |
|---|---|---|
| `title` / `details` | `string` | obrigatórias |

```
┌──────────────────────────────────────┐
│               ( ✕ )                  │  círculo 58 danger, IconClose 32 surfaceDanger
│        Título 22/28 Bold             │  #000000 no claro, text no escuro
│     detalhes Regular 16/24 text      │
└──────────────────────────────────────┘  fundo surfaceDanger, raio 16, padding 16, gap 8
```

`accessibilityRole="alert"`. Usado na falha de pagamento.

### `Alert` (desenho antigo)

`text: string` (obrigatória). `Card` com `IconExclamation` 48 centralizado e, 16 px abaixo, `Text` medium centralizado. Sem variantes. Equivalente 2.0: `StatusBanner`.

### `DarkInformationBoxLarge`

Caixa de status centralizada (pedido confirmado, aguardando, cancelado, concluído).

| Prop | Tipo | Default |
|---|---|---|
| `icon` | `string` | obrigatória: `check`, `circle-check`, `circle-waves`, `hourglass`, `map-pin`, `message-square`, `shield-check`, `credit-card`, `receipt`, `exclamation`, `x` (desconhecido = sem ícone) |
| `animated` | `boolean` | obrigatória (anéis de pulso) |
| `title` | `string` | obrigatória |
| `text` | `string` | — (vazio ou só espaços não desenha a linha) |
| `iconColor` | `string` | `onPrimary` |
| `circleColor` | `string` | `primary` |

```
┌──────────────────────────────────────┐
│               ( ícone )              │  círculo 72, ícone 28
│        Título Bold 20/28             │
│      texto Regular 13/18             │  tudo centralizado, cor onInverse
└──────────────────────────────────────┘  fundo inverseSurface, raio 16, padding 20/24, gap 8
```

Com `animated`, o círculo é um `AnimatedStatusIndicator` (72) e os anéis vazam para fora (`overflow: visible`; o contêiner do indicador mede 2,4 × 72). `circleColor` vai para o núcleo; os anéis continuam `#3CDBC0`. `accessibilityRole="summary"`.

### `DarkInformationBox`

Versão horizontal e compacta (status do pedido em andamento).

| Prop | Tipo | Default |
|---|---|---|
| `icon` | `string` | obrigatória (mesma lista, **sem** `x`) |
| `animated` | `boolean` | obrigatória |
| `title` / `text` | `string` | obrigatórias |

```
┌──────────────────────────────────────────┐
│  ( ícone )   Título Bold 20/28           │  colunas flex 3 / 9, centradas na vertical
│    50 px     texto Regular 13/18         │  gap 4, alinhado à esquerda
└──────────────────────────────────────────┘  fundo inverseSurface, raio 16, padding 12/16
```

Círculo 50 `primary` com ícone 20 `onPrimary`; com `animated`, `AnimatedStatusIndicator` de 50. Sem `iconColor`/`circleColor`.

### `AnimatedStatusIndicator`

| Prop | Tipo | Default |
|---|---|---|
| `size` | `number` | `72` (diâmetro do núcleo) |
| `active` | `boolean` | `true` |
| `icon` | `ReactNode` | — |
| `accessibilityLabel` | `string` | — |
| `coreColor` | `string` | `#3CDBC0` |

Contêiner de `2,4 × size`. Núcleo circular com o ícone e dois anéis (borda 2 `#3CDBC0`) que crescem até 2,2× e somem em 2 s, o segundo com 1 s de atraso, em loop (Reanimated, thread de UI). Parados com `active={false}` ou com "reduzir movimento" do sistema (`useReduceMotion`). `accessibilityRole="progressbar"`.

### `Timeline` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `steps` | `TimelineStep[]` | obrigatória |
| `fontScale` | `number` | `1` (só o título) |

`TimelineStep = { id, title, status: 'DONE' | 'CURRENT' | 'EMPTY', extra?, description?, timestamp? }`. Tipos `TimelineStep` e `TimelineStepStatus` exportados.

```
(✓) Pedido confirmado              10:32   ← extra (Info tone default)
 │  descrição / timestamp (13/18 textMuted)
(●) Em lavagem                             ← CURRENT em Bold
 │
( ) Pronto para retirada                   ← EMPTY em textMuted
```

Nó 22 px numa coluna de 22 (gap 14 até o texto). `DONE`: fundo e borda 2 `accent` com `IconCheck` 13 `background`. `CURRENT`: fundo `primary`, borda 2 `accent`. `EMPTY`: fundo `surface`, borda 1,5 `borderInteractive`. Título 15 × `fontScale`: Bold no `CURRENT`, Regular nos outros; cor `textMuted` no `EMPTY`. Linha vertical de 2 px abaixo do nó (exceto no último): `accent`, ou `border` quando o passo é `EMPTY`. `paddingBottom` 20 por passo. `accessibilityLabel` lê título, `extra` e "concluída" / "em andamento" / "pendente".

### `PhotoSkeleton`

| Prop | Tipo | Default |
|---|---|---|
| `width` / `height` | `DimensionValue` | `"100%"` |
| `borderRadius` | `number` | `14` |
| `style` | `StyleProp<ViewStyle>` | — |

Bloco `surfaceMuted` com uma faixa branca (opacidade 0,55, 45% da largura, mín. 24) que atravessa da esquerda para a direita em 1200 ms, em loop. Sem faixa com "reduzir movimento". Oculto da acessibilidade. Usado por `Image`, `ImageUploader` (e, por eles, `ProfileAvatar` e `Gallery`) até a foto pintar.

---

## 3. Mídia

### `Image`

| Prop | Tipo | Default |
|---|---|---|
| `src` / `alt` | `string` | obrigatórias |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` |
| `pixelSize` | `number` | — (substitui o lado de `size`) |
| `type` | `'default' \| 'circle'` | `'default'` |
| `onClick` | `() => void` | — |
| `darkMode` | `boolean` | ignorada |

Quadrado de 24 / 40 / 64 / 80 / 96 / 128 / 256 px. `circle` usa raio = lado/2; `default` raio 8. `resizeMode="cover"`. Até `onLoad`, um `PhotoSkeleton` cobre o quadro; trocar `src` volta o skeleton; `onError` o tira. Com `onClick` vira `TouchableOpacity` (`accessibilityRole="button"`, `accessibilityLabel={alt}`).

### `Gallery`

| Prop | Tipo |
|---|---|
| `images` | `string[]` (obrigatória) |
| `onClick` | `(imageUrl: string, index: number) => void` |

`ScrollView` horizontal sem barra, padding horizontal 4, gap 12; cada item é uma `Image` `md` (80) dentro de um recorte de raio 14.

### `ImageUploader` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `images` | `string[]` | obrigatória (URIs) |
| `onAdd` | `() => void` | obrigatória (a tela abre câmera/galeria) |
| `onRemove` | `(imageUrl: string, index: number) => void` | — (sem ela, não há X) |
| `onPressImage` | `(imageUrl: string, index: number) => void` | — (chamado antes do zoom) |
| `maxImages` | `number` | — |
| `pendingCount` | `number` | `0` |
| `columns` | `number` | `3` |
| `addLabel` | `string` | `"Adicionar"` (vazio esconde) |
| `addIcon` | `ReactNode` | `IconCamera` 24 `accent` |
| `disabled` | `boolean` | `false` |

```
┌╌╌╌╌╌╌╌╌┐ ┌────────┐✕ ┌────────┐✕
╎   📷   ╎ │  foto  │   │  foto  │     célula = 90% da fatia (largura/columns)
╎Adicionar╎ │        │   │        │     fileira cheia: space-between
└╌╌╌╌╌╌╌╌┘ └────────┘   └────────┘     fileira incompleta: alinhada à esquerda, mesmo vão
┌────────┐
│░░░░░░░░│  ← pendingCount: só skeleton, sem toque
└────────┘
```

- Ordem: célula de adicionar, fotos, pendentes. A de adicionar some quando `images.length + pendingCount >= maxImages`.
- Adicionar: borda tracejada 2 `accent`, fundo `surface`, raio 14, rótulo Bold 14 `accent`.
- Foto: ocupa a célula (raio 14), `PhotoSkeleton` até `onLoad`. X de remover: círculo 24 `inverseSurface` com `IconClose` 14 `onInverse`, área 44, deslocado −6/−6 no canto. Escondido com `disabled`.
- Toque na foto: zoom em `RN Modal` — a imagem cresce da célula até caber na tela (300 ms, Reanimated) sobre overlay `rgba(0,0,0,.5)`; toque na foto ou no overlay desfaz.
- Mede a largura no `onLayout`; nada aparece antes da medida.

### `ProfileAvatar`

| Prop | Tipo | Default |
|---|---|---|
| `alt` | `string` | obrigatória |
| `profileImage` | `string \| null` | — |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| number` | `'sm'` |
| `onPress` | `() => void` | — |
| `darkMode` | `boolean` | repassada e ignorada |

Círculo de 32 / 40 / 64 / 80 px, ou o número informado (mínimo 24, com `console.warn`). Com foto (string não vazia após `trim`): `Image` circular. Sem foto: fundo `surfaceMuted` com `IconProfile` a 45% do diâmetro em `#8F98AD`, envolvido num `Pressable` (`accessibilityLabel={alt}`) se houver `onPress`. Mede pelo conteúdo.

---

## 4. Usuário e avaliação

Os cards de usuário usam um tipo `User` local (só `UserCardHorizontal` exporta o seu; nenhum é exportado no `index.ts`):

```ts
type User = {
  id: string
  name: string
  profileImage: string
  ordersCount: number
  rating: number
  totalRatings?: number            // ausente em UserCardBio, que exige `bio: string`
  userType: 'client' | 'provider'
}
```

"Tem avaliações" = `totalRatings > 0` quando `totalRatings` é número, senão `rating > 0`. A legenda de pedidos vem de `getOrdersCountLabel`: `"{n} pedidos executados"` (provider) ou `"{n} pedidos feitos"` (client).

### `UserCardBio`

Bloco de perfil sem borda, usado no topo da Conta dos dois apps.

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User & { bio: string }` (sem `totalRatings`) | obrigatória |
| `onClick` | `() => void` | — (envolve tudo num `Pressable`) |
| `onAvatarPress` | `() => void` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
╭────╮  João Silva                         Text Bold
│ 64 │  ★ 4,8  · 12 pedidos                ShortStarRating + Info (gap 8)
╰────╯  Nota média dada pelos Lavexers     Info
```

Avatar `sm` (64) numa coluna fixa, gap 8; coluna de dados com gap 4. Sem nota (`rating <= 0`): estrela com `–` e legenda "Calculado a partir do primeiro pedido". `· 1 pedido` no singular. A `bio` **não é renderizada**.

### `UserCardVertical`

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User` | obrigatória |
| `onClick` / `onAvatarPress` | `() => void` | — |
| `darkMode` | `boolean` | `false` |

`Card` com `Grid` 12 colunas gap 8, tudo centralizado: avatar `md` (80); nome (`Text`) e legenda de pedidos (`Info`); `Stars` 16 + `"4.5/5"` (ponto, uma casa) ou `"Sem avaliações"`.

### `UserCardHorizontal`

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User` | obrigatória |
| `onClick` | `() => void` | — |
| `infoTone` | `'muted' \| 'default'` | `'muted'` |
| `darkMode` / `fontScale` | — | `false` / `1` |

`Card` com coluna alinhada à esquerda e gap 8: nome, legenda de pedidos e `Stars` 16 (ou "Sem avaliações"). **Apesar do nome, não tem avatar nem layout em linha.**

### `UserInfo`

| Prop | Tipo | Default |
|---|---|---|
| `user` | `{ [key: string]: any }` | obrigatória |
| `type` | `string` | obrigatória (chave lida de `user`) |
| `label` | `string` | derivado de `type` |
| `onClick` | `() => void` | — |
| `gap` | `number` | `2` (escala do `Grid`: 8 px) |
| `darkMode` / `fontScale` | — | `false` / `1` |

Rótulo em `Info` e valor em `Text` medium, empilhados. Dicionário de rótulos: `name` Nome, `email` E-mail, `phone` Telefone, `address` Endereço, `bio` Bio, `age` Idade, `city` Cidade, `country` País, `cep` CEP; outro `type` vira o próprio nome capitalizado. Valor ausente vira `""`.

### `UserList`

`users: User[]` (obrigatória), `onUserClick?: (user) => void`. `Grid` de 1 coluna, gap 4, com um `UserCardHorizontal` por usuário (sem `key` no item).

### `Stars`

`rating: number` (obrigatória), `size?: number = 24`. Cinco estrelas sem gap, altura = `size`. Base sempre cinza `#E5E1E6`; por cima, estrela cheia ou meia em `#FFD700` (nota limitada a [0, 5] e arredondada ao meio ponto). Não lê o tema.

### `StarRating`

| Prop | Tipo | Default |
|---|---|---|
| `size` | `number` | `24` |
| `initialRating` | `number` | `0` |
| `onRatingChange` | `(rating: number) => void` | — |
| `disabled` | `boolean` | `false` |

`Grid` de 5 colunas (gap 4) com as estrelas de `Stars`. Cada estrela tem duas áreas de toque: metade esquerda = `.5`, direita = inteiro. Prévia enquanto pressiona. **Não controlado**: guarda a nota em estado próprio e ignora mudanças de `initialRating` após montar.

### `ShortStarRating`

| Prop | Tipo | Default |
|---|---|---|
| `rating` | `number` | obrigatória |
| `size` | `number` | `16` |
| `darkMode` / `fontScale` | — | `false` / `1` |

Uma estrela sólida `accentDeep` e a nota com uma casa e vírgula (`4,8`) em `Text` small; gap 4. `rating <= 0` mostra `–`. `accessibilityLabel` "Nota 4,8" ou "Sem nota".

---

## 5. Pedido, oferta e chat

### `Order` (desenho antigo)

| Prop | Tipo | Default |
|---|---|---|
| `order` | `{ id: number, title: string, createdAt: Date, itemList: { quantity: number, name: string }[], images?: string[] }` | obrigatória |
| `backTarget` | `() => void` | — |

```
┌─ Card ────────────────────────────────┐
│ ‹  Lavagem de 5 peças                 │  Subtitle; chevron 24 só com backTarget
│    Criado em 05/10/2026               │  Info
│ ┌────┐┌────┐┌────┐  →                 │  Gallery (se houver images)
│ Itens do pedido:                      │  Text small
│ 2x Camisa social                      │  TextList "{qtd}x {nome}"
└───────────────────────────────────────┘  blocos separados por 16 (Grid gap 4)
```

Com `backTarget`: responde ao voltar físico do Android e a swipe da borda esquerda (origem até 48 px, deslocamento > 80 px ou `vx` > 0,6, desvio vertical < 20 px). Não é usado pelos apps hoje.

### `Offer`

| Prop | Tipo | Default |
|---|---|---|
| `amount` / `distance` | `number` | obrigatórias |
| `user` | `User` | obrigatória |
| `amountLabel` | `string` | — (substitui `"R$ {amount}"`) |
| `onClick` | `() => void` | — |

```
┌─ Card ────────────────────────────────┐
│ R$ 45                            3km  │  Text large (17) accent ↔ Info
│ ↓ 8                                   │
│ João Silva            ★★★★☆  4.5/5    │  nome ↔ Stars 16 + Info (ou "Sem avaliações")
└───────────────────────────────────────┘
```

O valor cede espaço e a distância nunca quebra; se a nota não couber ao lado do nome, desce (`flexWrap`). `amount` é formatado só com `String(amount)` (sem casas decimais nem separador): formatar moeda é do app, via `amountLabel`.

### `OfferList`

`offers: { id: number, amount, distance, user, onClick? }[]` (obrigatória). `Grid` 1 coluna, gap 4, com um `Offer` por item. Não repassa `amountLabel` nem `totalRatings`.

### `Message`

Bolha do chat; delega a `MessageSent` (`isOwn`) ou `MessageReceived` (internos, não exportados).

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `isOwn` | `boolean` | `false` |
| `timestamp` | `string` | hora atual `HH:MM` |
| `senderName` | `string` | `"You"` / `"Contact"` |
| `avatarUrl` | `string` | — |
| `userType` | `'client' \| 'provider' \| 'support'` | `'client'` (sem efeito visual) |
| `showAvatar` | `boolean` | `true` (false mantém a coluna vazia) |
| `showSenderName` | `boolean` | `true` (só recebidas) |
| `isGrouped` | `boolean` | `false` (margem superior 2 em vez de 8) |
| `avatarVariant` | `'image' \| 'headset'` | `'image'` |
| `onClick` | `() => void` | — |

```
enviada:                         14:32 ┌──────────────────┐ ┌──┐
                                       │ Texto            │ │👤│  linha à direita, base alinhada
                                       └──────────────────┘ └──┘
                                        inverseSurface, canto inf. direito 4
recebida: ┌──┐ Nome do remetente
          │👤│ ┌──────────────────┐ 14:32
          └──┘ │ Texto            │      surfaceMuted, canto inf. esquerdo 4
               └──────────────────┘
```

Balão raio 18 (um canto 4), padding 16/8, largura máx. 75%, texto Regular 18/22 (`onInverse` na enviada, `text` na recebida). Horário 12/14 `#8F98AD`. Coluna de avatar 40×40 com `ProfileAvatar xs`; `headset` troca por círculo 32 `surfaceMuted` com `IconHeadset` 22 `#8F98AD` (chat de suporte). Nome do remetente em `Text` small. Com `onClick`, tudo vira `TouchableOpacity` (0,7).
