# Tokens, tema e tipografia

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md).

Descreve `src/constants/constants.ts`, `src/theme/*`, `src/fontSetup.ts` e `tailwind.config.js` como estão no código (versão `1.15.x`).

---

## 1. Como a cor chega num componente

Há duas fontes de valor, e cada componente usa uma das duas para cada propriedade:

1. **Tema** (`useLavexTheme().colors`): cores que mudam entre claro e escuro. É o caminho padrão para cor desde a 1.15.0.
2. **`Constants.styles`** (`src/constants/constants.ts`, import default `Constants`): tamanhos, raios, bordas, espaçamentos, fontes e as cores que ficam **fixas** nos dois temas.

Regra prática para código novo: cor que deve acompanhar o tema vem de `useLavexTheme()` e entra como estilo inline; o resto vai para `StyleSheet.create` usando `Constants.styles.*`. Hex cru no componente é exceção e precisa de justificativa (ex.: overlay `rgba(0, 0, 0, 0.5)`).

`Constants` **não é exportado** no `index.ts`. Os apps não leem tokens do pacote; quem precisa de um hex o repete localmente.

---

## 2. Tema (`src/theme/`)

### 2.1 API

```tsx
import { LavexThemeProvider, useLavexTheme } from "lavex-design-system"

<LavexThemeProvider mode="dark">{/* app do Lavexer */}</LavexThemeProvider>

const { mode, colors } = useLavexTheme() // mode: "light" | "dark"
```

| Prop do provider | Tipo | Default |
|---|---|---|
| `mode` | `"light" \| "dark"` | `"light"` |
| `children` | `ReactNode` | — |

- Sem provider na árvore, `useLavexTheme()` devolve o tema `light` (os mesmos hex de antes do tema existir). O app do cliente não usa o provider.
- O valor do contexto é memoizado por `mode` (dois objetos estáticos, `LIGHT_THEME` e `DARK_THEME`).
- Exportados no `index.ts` (seção `// Theme`): `LavexThemeProvider`, `useLavexTheme`, `lightColors`, `darkColors` e os tipos `ThemeColors`, `ThemeMode`, `LavexTheme`, `LavexThemeProviderProps`.

### 2.2 Tokens semânticos (`src/theme/tokens.ts`)

| Token | Uso | light | dark |
|---|---|---|---|
| `background` | fundo de tela, `TopHeader`; check e número sobre `accent` | `#FFFFFF` | `#1B252A` |
| `surface` | cards, campos, caixas com borda, `NavigationBar` | `#FFFFFF` | `#24323A` |
| `surfaceSubtle` | listas, fundo de linha, `IconButtonLarge` pressionado | `#FAF9FA` | `#24323A` |
| `surfaceMuted` | cinza-claro de preenchimento, botão desabilitado, bolha recebida, skeleton | `#E5E1E6` | `#34444C` |
| `surfaceAccent` | pílula ativa da `NavigationBar`, `Tag` verde, `PaymentButton` selecionado | `#E2FAF6` | `#14433D` |
| `surfaceDanger` | `ErrorBox`, `Tag` de erro | `#FDECEC` | `#4A2326` |
| `border` | divisores, bordas suaves | `#E5E1E6` | `#34444C` |
| `borderInteractive` | borda de campo, de radio, de stepper | `#869199` | `#6E7E86` |
| `text` | texto padrão, `h2`, `h3`, cor padrão dos ícones | `#2D3B42` | `#F2F5F6` |
| `textMuted` | apoio, `Info`, ícone inativo | `#5A6A72` | `#A9B6BC` |
| `accent` | links, `h4`, ícone ativo, foco, check | `#0B7566` | `#3CDBC0` |
| `accentDeep` | `Button variant="link"`, estrela do `ShortStarRating` | `#08706D` | `#3CDBC0` |
| `primary` | fundo do botão principal, `h1`, trilho do `Toggle` ligado | `#3CDBC0` | `#3CDBC0` |
| `onPrimary` | texto e ícone sobre `primary` | `#2D3B42` | `#1B252A` |
| `danger` | erro, lixeira, confirmação do `Button` | `#C62828` | `#FF6B6B` |
| `inverseSurface` | `DarkInformationBox(Large)`, bolha enviada, `Button secondary`, `StatusBanner dark` | `#2D3B42` | `#E2FAF6` |
| `onInverse` | texto sobre `inverseSurface` | `#FFFFFF` | `#1B252A` |
| `star` | estrela preenchida (declarado, ainda não lido por `Stars`/`StarRating`) | `#FFD700` | `#FFD700` |

### 2.3 Cores que ficam fixas nos dois temas

Quando o fundo é fixo, o texto e o ícone sobre ele também ficam fixos, para não virar texto claro sobre fundo claro.

| Componente | Cor fixa |
|---|---|
| `Input` | placeholder `#66757D`. Desabilitado: fundo `#F4F4F5`, texto e cadeado `#5A6A72` |
| `TextArea`, `SearchInput`, `InputChat` | placeholder `#66757D` |
| `Select` | chevron `#8F98AD` |
| `Toggle` | trilho desligado `#CED4DA`, botão `#FFFFFF` |
| `Button` | texto branco em `danger` e na confirmação |
| `Text level="warning"`, `Tag warning-outline` | `#FFF4E5` / `#8A5A00` |
| `StatusBanner` | `info`: fundo `#EEFBF8`, ícone `#0B7566`, texto `#2D3B42` |
| `ErrorBox` | título `#000000` no claro (no escuro usa `text`) |
| `EmptyState` | círculo `#E6F7F6` |
| `SwipeableListItem` | trilho de excluir `#DC2626`, lixeira branca |
| `IconButtonLarge` | caixa do ícone `#F4F4F5`, ícone `#2D3B42` |
| `ProfileAvatar` | ícone do placeholder `#8F98AD` |
| `PaymentButton` | fundo da miniatura `#FFFFFF` (logos de bandeira) |
| `PhotoSkeleton` | faixa `#FFFFFF` |
| `Message` | horário e ícone do avatar de suporte `#8F98AD` |
| `AnimatedStatusIndicator` | anéis e núcleo padrão `#3CDBC0` |
| `Modal`, `ImageUploader` | overlay `rgba(0, 0, 0, 0.5)` |

### 2.4 Componentes que ainda não leem o tema

Não chamam `useLavexTheme()`:

- **Pintam cor própria fixa (sempre claro):** `FAB`, `Stepper` (fundo, borda), `Stars`, `StarRating`, `CheckButton`, `Image` (só o skeleton acompanha o tema).
- **Leem o tema legado `Constants.styles.theme` pela prop `darkMode`:** `Accordion`/`AccordionItem` (ver §3.6). Num app com `LavexThemeProvider mode="dark"`, o acordeão continua branco se `darkMode` não for passado.
- **Só compõem outros componentes e herdam o tema pelos filhos:** `Grid`, `List`/`TextList`, `UserList`, `OfferList`, `UserCardVertical`, `UserCardHorizontal`, `UserCardBio`, `UserInfo`, `Order`, `Offer`, `Alert`, `Gallery`, `Message` (wrapper), `InputName`, `InputEmail`, `InputPhone`, `InputCPF`, `InputNumber`, `InputPassword` (delegam ao `Input`). Exceção dentro deles: o chevron de voltar do `Order` é `#2D3B42` fixo.

---

## 3. `Constants.styles` (`src/constants/constants.ts`)

Acesso: `Constants.styles.<grupo>.<CHAVE>`. Nos componentes é comum `const C = Constants.styles`.

### 3.1 Tipografia

| Grupo | Chave | Valor |
|---|---|---|
| `fontSize` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 36 / 24 / 20 / 18 / 14 |
| `fontSize` | `DISPLAY` / `WORDMARK` / `TITLE` / `ACTION` / `BODY` / `SUBTITLE` / `LABEL` / `CAPTION` | 28 / 30 / 22 / 17 / 16 / 15 / 14 / 13 |
| `lineHeight` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 30 / 26 / 22 / 18 / 14 |
| `lineHeight` | `DISPLAY` / `WORDMARK` / `TITLE` / `ACTION` / `BODY` / `SUBTITLE` / `LABEL` / `CAPTION` | 34 / 36 / 28 / 22 / 24 / 22 / 20 / 18 |
| `fontWeight` | `BOLD` / `NORMAL` / `THIN` | `"700"` / `"400"` / `"100"` |
| `fontFamily` | `REGULAR` / `MEDIUM` / `SEMIBOLD` / `BOLD` | `PlusJakartaSans-Regular` / `-Medium` / `-SemiBold` / `-Bold` |

A escala semântica (`DISPLAY` … `CAPTION`) é a da linguagem 2.0. A escala antiga (`LARGEST` … `SMALL`) continua em uso em alguns componentes (`Card`, `Tag`, `FAB`, `CheckButton`, `Message`, `AccordionItem`).

### 3.2 Paleta da marca e superfícies 2.0

| Grupo | Chave | Valor | Uso |
|---|---|---|---|
| `brand` | `PRIMARY` | `#3CDBC0` | verde-água da marca |
| | `DARK` | `#0B7566` | verde-escuro (links, foco) |
| | `DEEP` | `#08706D` | verde profundo |
| | `SURFACE` | `#2D3B42` | grafite azulado |
| `surface` | `DEFAULT` / `MUTED` / `SUBTLE` | `#FFFFFF` / `#E5E1E6` / `#FAF9FA` | branco, cinza-claro, cinza-claríssimo |
| | `ZINC` | `#F4F4F5` | `Input` desabilitado, caixa do `IconButtonLarge` |
| | `INFO` | `#EEFBF8` | `StatusBanner info` |
| | `ACCENT` | `#E2FAF6` | verde-claro |
| | `ILLUSTRATION` | `#E6F7F6` | círculo do `EmptyState` |
| `text` | `DEFAULT` / `MUTED` / `PLACEHOLDER` / `LINK` / `DANGER` | `#2D3B42` / `#5A6A72` / `#66757D` / `#0B7566` / `#C62828` | |
| `border` | `SOFT` / `INTERACTIVE` / `SUBTLE` | `#E5E1E6` / `#869199` / `#D5DCDF` | |
| `feedback` | `DANGER_SURFACE` / `WARNING_SURFACE` / `WARNING_TEXT` | `#FDECEC` / `#FFF4E5` / `#8A5A00` | |

**Cinza-claro** = `#E5E1E6`. **Cinza-claríssimo** = `#FAF9FA`. **Grafite** = `#2D3B42`. Esses nomes aparecem em issues e no `CONTEXT.md` dos apps.

### 3.3 Cores legadas (ainda referenciadas)

| Grupo | Chave | Valor | Onde ainda aparece |
|---|---|---|---|
| `textColor` | `DEFAULT` | `#2D3B42` | `Order` (chevron) |
| | `PRIMARY` | `#007AFF` | nenhum componente; azul que não existe na linguagem 2.0 |
| | `SUCCESS` | `#059669` | `FAB`, badge do `CheckButton` |
| | `DANGER` | `#DC2626` | trilho do `SwipeableListItem` |
| | `INFO` | `#8F98AD` | chevron do `Select`, horário do `Message`, placeholder do `ProfileAvatar` |
| | `WARNING` | `#F59E0B` | nenhum |
| `backgroundColor` | `WHITE` / `LIGHT_GRAY` / `GRAY` | `#FFFFFF` / `#E5E1E6` / `#E5E1E6` | `Stepper`, `CheckButton` |
| `borderColor` | `LIGHT` / `MEDIUM` | `#E5E1E6` / `#CED4DA` | `MEDIUM`: `Stepper`, trilho desligado do `Toggle` |
| `color` | `WHITE` / `BLACK` / `GOLD` / `GRAY` | `#FFFFFF` / `#000000` / `#FFD700` / `#E5E1E6` | estrelas, `CheckButton`, `ErrorBox` |
| | `BLUE` / `MEDIUM_GRAY` / `SOFT_BLUE` | `#007AFF` / `#6C757D` / `#D7E7FA` | nenhum componente |
| | `PRIMARY_LIGHT` / `PRIMARY_DARK` / `BACKGROUND_LIGHT` | `#3CDBC0` / `#2D3B42` / `#E5E1E6` | nenhum componente |
| `shadowColor` | `DEFAULT` | `#000` | `FAB`, `NavigationBar` |

### 3.4 Espaçamento, raio, borda e tamanhos

| Grupo | Chave | Valor |
|---|---|---|
| `spacing` | `TINY` / `SMALL` / `MEDIUM` / `LARGE` / `EXTRA_LARGE` | 4 / 8 / 16 / 24 / 32 |
| `borderRadius` | `SMALL` / `MEDIUM` / `LARGE` / `XL` / `2XL` / `3XL` / `PILL` / `FULL` | 4 / 8 / 12 / 14 / 16 / 20 / 24 / 999 |
| `borderWidth` | `THIN` / `REGULAR` / `THICK` / `HAIRLINE` / `INTERACTIVE` | 0.4 / 0.8 / 1.2 / 1 / 1.5 |
| `componentSize` | `BUTTON_HEIGHT` / `BUTTON_WIDTH` | 40 / 40 (só o `Stepper` antigo) |
| | `BUTTON_HEIGHT_LG` / `INPUT_HEIGHT` / `TOUCH_TARGET` | 56 / 52 / 44 |
| | `INPUT_MIN_WIDTH` | 50 |
| | `NAVIGATION_BAR_HEIGHT` | 76 (altura mínima da `NavigationBar`; o `Modal` desconta esse valor da altura máxima) |
| `icon` | `SMALL` / `MEDIUM` | 16 / 20 |
| `opacity` | `LOW` / `MEDIUM` / `HIGH` | 0.5 / 0.7 / 0.9 |
| `maxWidth` | `messageBubble` | `"75%"` |
| `stepper` | `ICON_SIZE` | 16 |
| `gallery` | `CONTAINER_GAP` | 12 |

### 3.5 Medidas recorrentes da linguagem 2.0

Valores que se repetem nos componentes 2.0 e que convém reusar em componente novo:

| Medida | Valor | Onde |
|---|---|---|
| Altura de campo | 52 (`INPUT_HEIGHT`) | `Input`, `SearchInput`, gatilho do `Select`, linha do `CheckboxListItem` |
| Área tocável | 44 (`TOUCH_TARGET`) | olho do `InputPassword`, limpar do `SearchInput`, voltar do `TopHeader`, X do `ImageUploader` |
| Borda interativa | 1,5 px `borderInteractive` | campos, `RadioCard`, `PaymentButton`, `QuantityStepper`, `Button` outline |
| Raio de campo | 12 (`LARGE`) | `Input`, `TextArea`, `SearchInput`, `Select`, `Tag` |
| Raio de cartão 2.0 | 14 (`XL`) | `RadioCard`, `PaymentButton`, `StatusBanner`, fotos |
| Raio de caixa grande | 16 (`2XL`) | `ErrorBox`, `DarkInformationBox(Large)`, `IconButtonLarge` |
| Foco | borda `accent` | `Input`, `TextArea`, `SearchInput` |
| Pressionado | opacidade 0,85 | `Button` opaco, `RadioCard`, `CheckboxListItem`, `PaymentButton` |

### 3.6 Tema legado (`Constants.styles.theme`)

| Caminho | light | dark |
|---|---|---|
| `text.default` | `#2D3B42` | `#F3F7FF` |
| `text.muted` | `#8F98AD` | `#B7C1D6` |
| `text.primary` | `#007AFF` | `#4EA8FF` |
| `background.surface` | `#FFFFFF` | `#121821` |
| `background.subtle` | `#E5E1E6` | `#1A2432` |
| `border.default` | `#E5E1E6` | `#2A364A` |

Só `Accordion`/`AccordionItem` ainda leem este objeto (escolhido pela prop `darkMode`). Não use em código novo.

---

## 4. `tailwind.config.js`

Os componentes **não usam classes Tailwind** (não há `className` em `src/`). O arquivo existe porque o `babel.config.js` inclui `nativewind/babel`, porque o `demo/` usa NativeWind e porque os apps herdam a paleta.

- `darkMode: 'class'`, `important: 'html'`, `content` cobrindo `app`, `components`, `utils`, raiz e `src`.
- `safelist` com regex liberando `bg|border|text|stroke|fill` × paletas × escala.
- `theme.extend.colors`: `brand` (`DEFAULT` `#3CDBC0`, `dark` `#0B7566`, `deep` `#08706D`, `surface` `#2D3B42`), `ink` (`DEFAULT` `#2D3B42`, `muted` `#5A6A72`, `placeholder` `#66757D`), `line` (`soft` `#E5E1E6`, `interactive` `#869199`, `subtle` `#D5DCDF`) e as escalas antigas (`primary`, `secondary`, `typography`, `background`, `error`, `success`, `warning`, `info`…), todas apontando para hex da paleta 2.0. `primary-500` é `#3CDBC0`, não azul.
- As cores eram strings com aspas duplicadas (`''#E6F7F6''`) até a 1.15.0; hoje são strings simples.

---

## 5. Tipografia e fontes (`src/fontSetup.ts`)

Família única: **Plus Jakarta Sans**, embarcada em `src/assets/fonts/PlusJakartaSans/static/` nos cortes Regular (400), Medium (500), SemiBold (600) e Bold (700). Não há alias `Roboto-*` nem segunda família.

| Função | Exportada no `index.ts` | Comportamento |
|---|---|---|
| `useFonts(fontNames?: string[])` | sim | Carrega sob demanda via `expo-font` com cache num `Set` de módulo. Default `["PlusJakartaSans-Regular"]`. O estado inicial já é `true` quando `Font.isLoaded` confirma todos os nomes. Retorna `ready: boolean`; em erro loga e retorna `true` (degrada para a fonte do sistema). Nome fora dos quatro cortes é ignorado. |
| `useGlobalFonts()` | não | Carrega os quatro cortes. |
| `useResolvedFontFamily(fontName)` | não | Se o corte já está carregado, devolve o nome no primeiro render. Senão carrega e devolve `undefined` até terminar. |

Padrão de uso nos componentes (copie em componente novo):

```tsx
const bold = useResolvedFontFamily(C.fontFamily.BOLD)
<Text style={{ fontFamily: bold, fontWeight: bold ? "normal" : "700" }} />
```

Com a família estática carregada, `fontWeight` fica `"normal"` e o peso vem do arquivo (no Android, `fontWeight` não combina com família estática). Antes de carregar, cai no peso numérico com a fonte do sistema.

Exceções que ainda usam `fontFamily` fixo sem `useResolvedFontFamily`: `Card` (título Regular + `fontWeight` 700), `NavigationBar` (rótulo Regular + peso 700/500), `CheckButton`, `FAB` (via `useFonts`), `Message` (balão e horário).

O app do cliente chama `useFonts` no `app/_layout.tsx`.
