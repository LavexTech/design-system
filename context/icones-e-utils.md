# Ícones e utilitários

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md).

---

## 1. Ícones (`src/components/Icons/`)

Wrappers finos sobre `lucide-react-native` `^1.31.0` (SVG via `react-native-svg`). Cada arquivo importa o glifo pelo subpath `lucide-react-native/icons/<nome-kebab>` (export default). O barrel `lucide-react-native` **não** é importado, para não puxar a biblioteca inteira.

### 1.1 Contrato comum (`iconProps.ts`)

| Prop | Tipo | Default |
|---|---|---|
| `color` | `string` | `colors.text` do tema (`#2D3B42` claro, `#F2F5F6` escuro) |
| `fill` | `string` | — alias legado de `color` |
| `size` | `number` | `24` |
| `width` / `height` | `number` | — (usados quando `size` não vem) |
| `strokeWidth` | `number` | `2` |

- Cor = `color ?? fill ?? colors.text` (hook `useIconColor`). `resolveIconColor` (sem tema, padrão `#2D3B42`) continua exportado do arquivo para uso interno.
- Tamanho = `size ?? width ?? height ?? 24` (`resolveIconSize`).
- Todos são **só traço** (`fill: none`), exceto as estrelas.
- `IconStar`: com `fill`, a estrela fica sólida. Com `color` **e** `fill`, o traço é `color` e o miolo é `fill`. `IconStarHalf` preenche com `fill`.
- `IconCircleWaves` é composto: `IconCircle` + `IconWaves` a 60% do lado, centralizado.

### 1.2 Catálogo (todos exportados no `index.ts`)

| Export | Glifo lucide (subpath) | Uso no DS / nos apps |
|---|---|---|
| `IconArrowDown` | `arrow-down` | aviso "role para ver mais" (cliente) |
| `IconArrowLeft` / `IconArrowRight` | `arrow-left` / `arrow-right` | botões "Avançar" (cliente) |
| `IconCamera` | `camera` | `ImageUploader`, editar foto |
| `IconCheck` | `check` | `CheckboxListItem`, `Timeline`, `PaymentButton` |
| `IconChevronDown` / `Left` / `Right` | `chevron-down` / `chevron-left` / `chevron-right` | `Select`, `Accordion`, `TopHeader`, `Order`, `IconButtonLarge` |
| `IconCircle` / `IconCircleCheck` | `circle` / `circle-check-big` | `CheckButton` |
| `IconCircleWaves` | composto | `DarkInformationBox(Large)` `icon="circle-waves"` |
| `IconClose` | `x` | `SearchInput`, `ImageUploader`, `ErrorBox`, caixa grande `icon="x"` |
| `IconCreditCard` | `credit-card` | carteira, `IconButtonLarge` |
| `IconEdit` | `pencil` | edição (mesmo glifo de `IconPencil`) |
| `IconExclamation` | `circle-alert` | `Alert`, `StatusBanner` |
| `IconEye` / `IconEyeClosed` | `eye` / `eye-off` | `InputPassword` |
| `IconFilter` | `list-filter` | filtros |
| `IconHeadset` | `headset` | avatar de suporte no `Message` |
| `IconHistory` | `rotate-ccw-clock` | aba Histórico (Lavexer). Na 1.31 `History` é alias desse glifo |
| `IconHome` | `house` | aba Início |
| `IconHourglass` | `hourglass` | caixa "aguardando" |
| `IconImage` | `image` | anexos |
| `IconLoader` | `loader-circle` | carregamento |
| `IconLock` | `lock` | `Input` desabilitado, pagamento |
| `IconLogOut` | `log-out` | sair da conta |
| `IconMapPin` | `map-pin` | endereço |
| `IconMessage` | `message-circle` | aba de mensagens (Lavexer) |
| `IconMessageSquare` | `message-square` | botão de chat, `IconButtonLarge` |
| `IconMessageSquareText` | `message-square-text` | chat de suporte vazio, `IconButtonLarge` |
| `IconMinus` / `IconPlus` | `minus` / `plus` | steppers, adicionar |
| `IconPencil` | `pencil` | editar perfil |
| `IconProfile` | `user` | placeholder do `ProfileAvatar`, aba Conta (Lavexer) |
| `IconQrCode` | `qr-code` | Pix, `IconButtonLarge` |
| `IconReceipt` | `receipt-text` | aba Histórico (cliente) |
| `IconSearch` | `search` | `SearchInput`, `EmptyState` |
| `IconSend` | `send` | `InputChat` |
| `IconShieldCheck` | `shield-check` | aviso de segurança |
| `IconStar` / `IconStarHalf` | `star` / `star-half` | `Stars`, `StarRating`, `ShortStarRating` |
| `IconTrash` | `trash-2` | `Stepper`, `QuantityStepper`, `SwipeableListItem` |
| `IconTruck` | `truck` | entrega, `IconButtonLarge` |
| `IconUserRound` | `user-round` | aba Conta (cliente) |
| `IconWaves` | `waves-horizontal` | ondas (lavagem) |

### 1.3 Como adicionar um ícone

1. Criar `src/components/Icons/Icon<Nome>.tsx` copiando um wrapper existente (ex.: `IconTruck.tsx`): import default de `lucide-react-native/icons/<nome-kebab>`, `useIconColor(color, fill)`, `resolveIconSize(size, width, height)`, `strokeWidth = DEFAULT_STROKE_WIDTH`.
2. Conferir que o subpath existe na versão instalada (`node_modules/lucide-react-native/dist/esm/icons/<nome>.mjs`); aliases como `history` não têm arquivo próprio.
3. Exportar no `index.ts`, seção `// Icons`.
4. Registrar na tabela acima.
5. Se for usado por nome em `DarkInformationBox(Large)` ou `IconButtonLarge`, acrescentar ao mapa `ICONS` do componente e ao tipo da prop.

---

## 2. Utilitários (`src/utils/`)

Nenhum é exportado no `index.ts`; são de uso interno.

| Função | Arquivo | Assinatura | Comportamento |
|---|---|---|---|
| `getOrdersCountLabel` | `ordersCountLabel.ts` | `(ordersCount: number, userType: 'client' \| 'provider') => string` | `"{n} pedidos executados"` (provider) ou `"{n} pedidos feitos"` (client) |
| `hasProfileImage` | `profileImage.ts` | `(profileImage?: string \| null) => boolean` | `true` só com string não vazia após `trim` |
| `getProfileImageUrl` | `profileImage.ts` | `(profileImage?: string \| null, _userType?) => string` | URL com `trim()` ou `""`. Não gera placeholder remoto |
| `useReduceMotion` | `reduceMotion.ts` | `() => boolean` | Store de módulo com `useSyncExternalStore`: uma leitura de `AccessibilityInfo.isReduceMotionEnabled()` e um único listener `reduceMotionChanged` para todas as instâncias; o listener sai quando o último assinante desmonta. Valor inicial (e no servidor) `false`. Usado por `PhotoSkeleton` e `AnimatedStatusIndicator` |

Outros helpers exportados de dentro de componentes (não do `index.ts`): `formatShortRating(rating)` em `ShortStarRating.tsx` (`4.8` → `"4,8"`).
