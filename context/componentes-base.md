# Componentes — textos, campos, ações e navegação

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md). O restante do catálogo está em [`componentes-estrutura-e-dominio.md`](./componentes-estrutura-e-dominio.md).

Cada entrada traz **para que serve**, **contrato** (props), **aparência** (valores resolvidos, tema claro) e **comportamento**. Cores entre parênteses como `accent` são tokens do tema ([`tokens-e-tema.md`](./tokens-e-tema.md) §2.2); o hex citado é o do tema claro.

Convenções que valem para todas as entradas:

- `darkMode?: boolean` é **aceita e ignorada** onde aparece (exceto `Accordion`). O tema vem do `LavexThemeProvider`.
- `fontScale?: number = 1` multiplica `fontSize` e `lineHeight`.
- Texto entra por prop (`text`, `label`, `title`), nunca por `children`.
- Fonte entre parênteses é o corte de Plus Jakarta Sans (Regular, Medium, SemiBold, Bold).

---

## 1. Textos

| Componente | Uso | Fonte e tamanho | Cor |
|---|---|---|---|
| `MainTitle` | título de tela legado ("Entrar") | Bold 28/34, `letterSpacing` -0,4 | `text` |
| `Heading level="h1"` | título de destaque da marca | SemiBold 30/36, `letterSpacing` -0,5 | `primary` `#3CDBC0` |
| `Heading level="h2"` | título de seção 2.0 | Bold 21/25,5, `letterSpacing` -0,4 | `text` |
| `Heading level="h3"` | subtítulo 2.0 | Bold 18/24, `letterSpacing` -0,2 | `text` |
| `Heading level="h4"` | rótulo de seção, CAIXA ALTA | Bold 13/18, `letterSpacing` 0,6, `uppercase` | `accent` `#0B7566` |
| `Title` | título de seção legado | Bold 22/28 × `fontScale` | `text` |
| `Subtitle` | título de bloco em card/lista | SemiBold 15/22 | `text` |
| `Text` | corpo | Regular (ou Bold com `bold`) | por `level` |
| `Info` | legenda, metadado, rótulo pequeno | Regular (ou Bold) 13/18 × `fontScale` | `textMuted` ou `text` |

Todos quebram linha (`flexWrap: wrap`, `flexShrink: 1`) e não têm margem nem padding.

### `Heading`

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `level` | `'h1' \| 'h2' \| 'h3' \| 'h4'` | obrigatória |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |

`accessibilityRole="header"` e `aria-level` 1–4 (na web vira `<h1>`…`<h4>`). Não aceita `darkMode` nem `fontScale`. Não define largura; em coluna acompanha o `alignItems` do pai. Tipos exportados: `HeadingLevel`, `HeadingProps`.

### `MainTitle`, `Title`, `Subtitle`

| Prop | `MainTitle` | `Title` | `Subtitle` |
|---|---|---|---|
| `text` | obrigatória | obrigatória | obrigatória |
| `position` | `'left'` | `'left'` | `'left'` |
| `darkMode` / `fontScale` | — | `false` / `1` | — |

### `Text` (exportado como `Text`; componente interno `TextBox`)

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `level` | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning'` | `'default'` |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `bold` | `boolean` | `false` |
| `fill` | `boolean` | `true` |
| `darkMode` / `fontScale` | — | `false` / `1` |

- Tamanhos: `small` 14/20, `medium` 16/24, `large` 17/22.
- Cores por `level`: `default` `text`; `primary` e `success` `accent` (`#0B7566`); `error` `danger` (`#C62828`); `warning` `#8A5A00` fixo.
- `fill: true` aplica `width: 100%`. **Dentro de `flexDirection: row`, passe `fill={false}`** para medir pelo conteúdo.

### `Info`

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `tone` | `'muted' \| 'default'` | `'muted'` |
| `bold` | `boolean` | `false` |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `darkMode` / `fontScale` | — | `false` / `1` |

`alignSelf: stretch` (ocupa a largura). `muted` = `textMuted` `#5A6A72`; `default` = `text`.

---

## 2. Campos

### `Input`

Campo base. Os campos especializados delegam para ele.

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | obrigatória (string vazia esconde o rótulo) |
| `value` | `string` | obrigatória |
| `onChange` | `(value: string) => void` | obrigatória |
| `placeholder` | `string` | `""` |
| `placeholderTextColor` | `string` | `#66757D` |
| `validation` | `(value: string) => boolean` | — |
| `errorMessage` | `string` | — |
| `mask` | `string` | — |
| `mobileKeyboard` | `'text' \| 'email' \| 'phone' \| 'number'` | `'text'` |
| `secureTextEntry` | `boolean` | `false` |
| `rightElement` | `ReactNode` | — |
| `onBlur` / `onSubmitEditing` | `() => void` | — |
| `returnKeyType` | `'done' \| 'go' \| 'next' \| 'search' \| 'send' \| 'default'` | — |
| `autoCapitalize` | `'none' \| 'sentences' \| 'words' \| 'characters'` | `'none'` se `email` |
| `autoCorrect` | `boolean` | `false` se `email` |
| `fieldHeight` | `number` | `52` |
| `inputRef` | `React.Ref<TextInput>` | — (para `focus()`) |
| `disabled` | `boolean` | `false` (somente leitura) |
| `hideDisabledIcon` | `boolean` | `false` (com `disabled`, esconde o cadeado) |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
  Nome completo                     ← rótulo Bold 14/20, text
┌───────────────────────────┬──────┐
│ ←16→ valor digitado       │[right]│ 52 (fieldHeight), raio 12, borda 1,5
└───────────────────────────┴──────┘
  mensagem de erro                  ← 13 px, danger
```

**Aparência:** coluna `gap` 6, `alignSelf: stretch`. Caixa com fundo `surface`, borda 1,5 px `borderInteractive` (`#869199`), `paddingLeft` 16; texto digitado Regular 16, altura interna 44. Foco: borda `accent`. Inválido: borda `danger` e `errorMessage` abaixo. Desabilitado: fundo `#F4F4F5`, borda `border`, texto `#5A6A72` e `IconLock` 18 px à direita (substitui `rightElement`). Na web o outline nativo fica desligado. `keyboardAppearance` `dark` no tema escuro, `light` no claro.

**Comportamento:**

- `mask`: `X`/`x` recebem um caractere alfanumérico; o resto é literal. Máscara com letras (exceto X) ou dígitos é rejeitada com `console.warn` e o valor passa sem máscara.
- `validation` roda a cada digitação e num `useEffect` quando `value` muda (só se `value` não for vazio).
- Teclado: `email` → `email-address`/`inputMode="email"`/`autoComplete="email"`/`textContentType="emailAddress"`; `phone` → `phone-pad`/`tel`; `number` → `numeric`.
- Web: Enter dispara `onSubmitEditing` via `onKeyPress`; o `onSubmitEditing` nativo fica desligado.
- O texto encolhe (`minWidth: 0`) para o `rightElement` (que não encolhe) caber em tela estreita; a caixa tem `overflow: hidden`.

### Campos especializados

Todos repassam `darkMode` e `fontScale` ao `Input` e têm a mesma aparência.

| Componente | Props próprias (default) | Comportamento |
|---|---|---|
| `InputName` | `label` (obrigatória), `value`, `onChange`, `placeholder` (`"Nome Sobrenome"`) | No `onBlur` capitaliza cada palavra, mantém `de, di, do, da, dos, das, del` minúsculas e trata apóstrofo (`d'Avila`). Válido com 2+ palavras ou vazio; erro `"Digite pelo menos nome e sobrenome"`. |
| `InputEmail` | `label` (`"Email"`), `placeholder` (`"example@email.com"`), `errorMessage` (`"Email deve ter formato válido"`) | Força minúsculas. Teclado de e-mail. Válido com `@` após o 1º caractere e `.` depois do `@` que não seja o último. |
| `InputPhone` | `label` (`"Telefone"`), `placeholder` (`"(00) 00000-0000"`), `errorMessage` (`"Telefone deve ter 11 dígitos"`) | Máscara progressiva `(00) 0000`, `(00) 0000-0000`, `(00) 00000-0000`, limitada a 11 dígitos. Válido com 11 dígitos ou vazio. |
| `InputCPF` | `label` (`"CPF"`), `placeholder` (`"000.000.000-00"`), `errorMessage` (`"CPF deve ter formato válido"`) | Máscara `XXX.XXX.XXX-XX`, teclado numérico, valida os dígitos verificadores e rejeita sequências repetidas. |
| `InputNumber` | `label` (`"Número"`), `placeholder` (`"Digite um número"`), `errorMessage` (`"Número inválido"`), `min`, `max`, `length` | Remove não dígitos, corta em `length` e agrupa de 4 em 4 com espaço (formato de cartão). Fora de `min`/`max` mostra `"Valor deve ser maior/menor ou igual a N"`. |
| `InputPassword` | `label` (obrigatória), `placeholder` (`"Digite sua senha"`), `showPasswordToggle` (`true`), `minLength`, `errorMessage`, `fieldHeight`, `onSubmitEditing`, `returnKeyType` | `secureTextEntry` com botão 44×44 de olho (`IconEye` visível / `IconEyeClosed` oculta) dentro da caixa. Exige maiúscula, minúscula e dígito (+ `minLength`); a mensagem é a da 1ª regra violada, ou `errorMessage` se passada. A prop `validation` existe no tipo mas é ignorada. |

### `SearchInput`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | `string` / `(v: string) => void` | obrigatórias |
| `placeholder` | `string` | `"Buscar"` |
| `onSubmit` | `() => void` | — |
| `onClear` | `() => void` | — |
| `autoFocus` | `boolean` | `false` |
| `fontScale` | `number` | `1` (escala fonte **e** altura do campo) |

```
┌──────────────────────────────────────┐
│ 🔍  Buscar peça, ex: camisa      ✕  │ 52 × fontScale, raio 12
└──────────────────────────────────────┘
 ↑ ícone 20 a 16 px da borda   ↑ só com texto, área 44
```

Sem rótulo. `accessibilityRole="search"`, `returnKeyType="search"`. Borda 1,5 `borderInteractive`, foco `accent`. `IconSearch` 20 `textMuted` absoluto. Com texto, `IconClose` (18 × `fontScale`) limpa: chama `onChange("")` e `onClear`.

### `TextArea`

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | obrigatória |
| `onChange` | `(value: string) => void` | obrigatória |
| `value` / `placeholder` | `string` | — |
| `maxLength` | `number` | — |
| `counterSuffix` | `string` | `" caracteres"` |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
  Bio                                   ← SemiBold 14/20
┌──────────────────────────────────────┐
│ texto multilinha…                    │ altura mín. 120, padding 16
└──────────────────────────────────────┘
                     120/300 caracteres  ← 13 px textMuted, só com maxLength
```

Borda 1,5 `borderInteractive`, raio 12, texto Regular 16, foco `accent`. Digitação que passaria de `maxLength` é **ignorada** (o `onChange` não é chamado). `counterSuffix=""` mostra só `n/max`.

### `Select`

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | obrigatória |
| `options` | `{ label: string, value: string }[]` | obrigatória |
| `onChange` | `(value: string) => void` | obrigatória |
| `value` | `string` | — |
| `placeholder` | `string` | `"Selecione"` |
| `errorMessage` | `string` | — |
| `triggerFontScale` | `number` | `1` (escala só o texto do gatilho) |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
  Forma de pagamento                ← Text small
┌────────────────────────────┬───┐
│ ←16→ Selecione             │ ⌄ │ ≥52, raio 12, borda 1,5
└────────────────────────────┴───┘
  toque → Modal com CheckboxListItem (gap 16) + botão "Voltar"
```

Chevron 18 px `#8F98AD` fixo. Com `errorMessage`: borda `danger` e texto de erro abaixo. O modal usa `buttonText="Voltar"`, `buttonVariant="default-outline"`; a opção atual vem marcada; tocar outra fecha e chama `onChange`; desmarcar a atual não faz nada. Tipo `SelectOption` não é exportado no `index.ts`.

### `Toggle`

| Prop | Tipo | Default |
|---|---|---|
| `label` / `value` / `onChange` | `string` / `boolean` / `(v: boolean) => void` | obrigatórias |
| `darkMode` / `fontScale` | — | `false` / `1` |

Linha de largura total: rótulo (`Text size="small"`, `flex: 1`) e `Switch` nativo à direita. Trilho ligado `primary` `#3CDBC0`, desligado `#CED4DA`, botão branco.

### `CheckboxListItem`

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | obrigatória |
| `checked` | `boolean` | obrigatória |
| `onChange` | `(next: boolean) => void` | obrigatória |
| `trailing` | `ReactNode` | — |
| `disabled` | `boolean` | `false` |
| `divider` | `boolean` | `true` (linha inferior `border`) |
| `boxSize` / `boxRadius` | `number` | `22` / `6` |
| `verticalPadding` | `number` | — (substitui a altura mínima 52) |
| `fontScale` | `number` | `1` (só o rótulo) |

```
┌──┐
│✓ │  Camisa social                         [trailing]   altura mín. 52, gap 14
└──┘
```

`accessibilityRole="checkbox"`. Caixa com borda 1,5 `borderInteractive`; marcada fica cheia de `accent` com `IconCheck` (14 × `boxSize/22`) na cor `background`. Rótulo Regular 16, `textMuted` quando desabilitado. Controlado: o toque chama `onChange(!checked)`.

### `InputChat`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | — | obrigatórias |
| `onSend` | `() => void` | obrigatória |
| `placeholder` | `string` | `"Escreva sua mensagem"` |

```
┌──────────────────────────────────┐  ┌────┐
│ Escreva sua mensagem             │  │ ➤  │  alinhados pela base, gap 10
└──────────────────────────────────┘  └────┘
  altura 48, raio 24                   círculo 48
```

Campo `flex: 1`, borda 1,5 `borderInteractive`, padding horizontal 18, Regular 16. Botão: `primary` com ícone `onPrimary` quando há texto; `surfaceMuted` com ícone `textMuted` e desabilitado quando vazio. `onSend` só dispara com `value.trim()` não vazio (botão ou Enter). **Não limpa o campo**: isso é do app.

---

## 3. Ações

### `Button`

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `onClick` | `() => void` | obrigatória |
| `variant` | ver tabela | `'default'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `iconPosition` | `'left' \| 'right' \| 'inline'` | `'left'` |
| `style` / `textStyle` | `ViewStyle` / `TextStyle` | — (aplicados por último) |
| `needsConfirmation` | `boolean` | `false` |
| `confirmationText` | `string` | obrigatória quando `needsConfirmation` é `true` (união discriminada) |
| `darkMode` / `fontScale` | — | `false` / `1` |

| `size` | Altura | Raio | Fonte | Padding horizontal |
|---|---|---|---|---|
| `xs` | 36 | 12 | 14 | 16 |
| `sm` | 40 | 12 | 15 | 16 |
| `md` | 48 | 14 | 16 | 20 |
| `lg` | 52 | 16 | 17 | 24 |
| `xl` | 56 | 16 | 17 | 28 |

| Variante | Fundo | Texto | Borda |
|---|---|---|---|
| `default`, `primary`, `success` | `primary` `#3CDBC0` | `onPrimary` `#2D3B42` | — |
| `default-outline` | `surface` | `text` | 1,5 `borderInteractive` |
| `success-outline` | `surfaceAccent` `#E2FAF6` | `accent` | 1,5 `accent` |
| `secondary` | `inverseSurface` `#2D3B42` | `onInverse` branco | — |
| `secondary-outline` | `surface` | `text` | 1,5 `text` |
| `danger` | `danger` `#C62828` | branco | — |
| `danger-outline` | `surface` | `danger` | 1,5 `danger` |
| `ghost` | transparente | `accent` | — |
| `ghost-danger` | transparente | `danger` | — |
| `link` | transparente | `accentDeep` `#08706D` | — |
| `link-gray` | transparente | `textMuted` | — |

```
iconPosition="left":            "right":                 "inline" / link:
┌──────────────────────────┐   ┌──────────────────────┐   [ic] Texto
│ [ic]     Confirmar       │   │   Avançar  [ic]      │   na largura do conteúdo
└──────────────────────────┘   └──────────────────────┘
 ícone absoluto a 16 px          ícone 6 px após o texto
```

**Aparência:** `Pressable` com `alignSelf: stretch` (largura total). Rótulo Bold, `lineHeight` = fonte × 1,2, centralizado. `link` e `link-gray` não têm altura, raio nem padding: medem pelo conteúdo (`alignSelf: flex-start`, `minHeight` 24). Desabilitado: fundo `surfaceMuted` `#E5E1E6`, texto `text` `#2D3B42`, sem borda.

**Comportamento:**

- Pressionado: fundo opaco ganha opacidade 0,85; fundo transparente ou `surface` vira `surfaceMuted`. Hover só na web, com o mesmo efeito dos transparentes. O estado visual sai de `getButtonColors` no callback `style` do `Pressable`; não há `useState` de pressionado.
- `needsConfirmation`: 1º toque troca o rótulo por `confirmationText` e pinta fundo `danger` com texto branco; 2º toque chama `onClick`. Sem o 2º toque, volta após 8 s.
- O componente é `React.memo`.

### `CheckButton` (desenho antigo)

Chip selecionável com modo "travado" compacto. Não é usado pelos apps desde a 2.0 (o cliente trocou por `CheckboxListItem` + `Tag`/`Button`).

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | obrigatória |
| `checked` | `boolean` | obrigatória |
| `lockedColor` | `string` | obrigatória |
| `onClick` / `onTap` | `(next: boolean) => void` | — (ambos são chamados) |
| `isLocked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |

```
isLocked: false                  isLocked: true
┌──────────────────────┐         ┌──────────┐
│ (✓) Camisa social    │         │ Camisa   │  badge some, texto encolhe
└──────────────────────┘         └──────────┘
```

Raio 8, borda 1,2 px, fundo branco, mede pelo conteúdo. Normal: borda e texto pretos, Regular 14,4/14,4; badge circular 15,4 px a 5 px da esquerda — `#059669` com `IconCircleCheck` branco quando marcado, `#E5E1E6` com `IconCircle` preto quando não. Travado: sem badge, padding 4,8, fonte 11,5, borda e texto em `lockedColor`. A troca de `isLocked` é instantânea (`setValue`). Desabilitado opacidade 0,7; pressionado 0,9. Não lê o tema.

### `FAB`

| Prop | Tipo | Default |
|---|---|---|
| `text` / `onClick` | `string` / `() => void` | obrigatórias |
| `disabled` | `boolean` | `false` |
| `darkMode` | `boolean` | `false` (ignorada) |

Pílula `#059669` de raio 999, padding 16/12, texto branco Regular 18/22, sombra (offset 0/2, opacidade 0,22, raio 4, `elevation` 4). Mede pelo conteúdo. **Não se posiciona sozinho**: o app aplica `position: absolute`. Pressionado 0,9; desabilitado 0,5. Não lê o tema.

### `QuantityStepper` (2.0)

| Prop | Tipo | Default |
|---|---|---|
| `value` / `min` / `max` | `number` | obrigatórias |
| `onChange` | `(value: number) => void` | obrigatória |
| `label` | `string` | — |
| `valueSuffix` | `string` | — (exibido como `"{value} {suffix}"`) |
| `onDelete` | `() => void` | — |
| `disabled` | `boolean` | `false` |
| `accessibilityLabel` | `string` | declarada, não usada |

```
(🗑)  Camisa social ───── flex 1 ─────  (−)  3  (+)
 36    Regular 16                        36  Bold 16  36    gap 6 no grupo, 12 até o rótulo
```

Botões circulares de 36 px, fundo `surface`, borda 1,5 `borderInteractive`, ícone 20 `text`. No limite (`value <= min` / `>= max`) o botão desabilita e borda e ícone vão para `border`. Lixeira: círculo 36 sem borda, `IconTrash` 20 `danger`. Sem `label`, o grupo mede pelo conteúdo (`alignSelf: flex-start`). Controlado. `accessibilityLabel` dos botões: `"Diminuir {label}"`, `"Aumentar {label}"`, `"Remover {label}"` (ou `item`).

### `Stepper` (desenho antigo)

Linha completa com botões quadrados colados. Mantido por compatibilidade; o equivalente 2.0 é `QuantityStepper` (`text` → `label`, demais props iguais).

| Prop | Tipo | Default |
|---|---|---|
| `value` / `min` / `max` | `number` | obrigatórias |
| `onChange` | `(value: number) => void` | obrigatória |
| `text` | `string` | — |
| `onDelete` | `() => void` | — |
| `valueSuffix` | `string` | `""` (colado no número: `12un`) |

```
┌──┐                                   ┌──┬──┐
│🗑 │  Camisa social          12un    │ −│ +│  40
└──┘  ←── flex 1 ──→   min 30 (52)     └──┴──┘
```

Botões 40×40, fundo branco, borda 0,4 `#CED4DA`, raio 8 só nos cantos externos; ícones 16. No limite: fundo `#E5E1E6` e opacidade 0,5. Rótulo e valor em `Text` medium (16). Não lê o tema.

---

## 4. Navegação e cabeçalho

### `TopHeader`

| Prop | Tipo | Default |
|---|---|---|
| `title` | `string` | obrigatória |
| `subtitle` | `string` | — |
| `onBack` | `() => void` | — (desenha o botão de voltar) |
| `align` | `'left' \| 'center'` | `'left'` |
| `leading` | `ReactNode` | — (substitui o botão de voltar) |
| `trailing` | `ReactNode` | — |
| `titleAccessory` | `ReactNode` | — (ao lado do título, gap 8) |
| `fontScale` | `number` | `1` |

```
┌───────────────────────────────────────────────┐
│ (‹)  Título da tela  [accessory]     [trailing]│ fundo background
│      Subtítulo opcional                        │ Regular 15/22 textMuted
└───────────────────────────────────────────────┘
 44×44   Bold 28/34, letterSpacing -0,4
```

`paddingLeft` 12 com `onBack`/`leading`, senão 24; `paddingRight` 24. **Não aplica safe area** (a tela faz isso) e não tem borda inferior. Título com `accessibilityRole="header"`; linha do título com `flexWrap`. Voltar: círculo 44, `IconChevronLeft` 24 `text`, `accessibilityLabel="Voltar"`.

### `NavigationBar`

| Prop | Tipo | Default |
|---|---|---|
| `pages` | `string[]` | obrigatória (os rótulos, que também são as chaves) |
| `activePage` | `string` | obrigatória |
| `icons` | `((isActive: boolean) => ReactNode)[]` | — (devolve o ícone já colorido) |
| `badges` | `number[]` | — (na ordem de `pages`) |
| `onNavigate` | `(page: string) => void` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
──────────────────────────────────────────  borda superior 1 px border
│  (▭ic▭)   │    [ic]²   │    [ic]    │      pílula 56×30 surfaceAccent, a 12 px do topo
│  Início   │   Pedido   │   Conta    │      ativo accent 700 · inativo textMuted 500, 13/18
└───────────┴────────────┴────────────┘      cada aba flex 1, altura mín. 76
```

Fundo `surface`. A pílula é **um único** elemento da barra que desliza (300 ms) até o centro da aba ativa; ícone e rótulo cruzam opacidade em 400 ms. No iOS há padding extra (topo +6, base +10) para o home indicator; o resto da safe area é do app. `badges[i] > 0` põe um `CountBadge` no canto superior direito do ícone e acrescenta `", N não lidas"` ao `accessibilityLabel`. Abas com `accessibilityRole="tab"`. `NavTab` e `TabFace` são `memo`; `onLayout` só grava a largura com diferença > 0,5 px.

### `CountBadge`

| Prop | Tipo | Default |
|---|---|---|
| `count` | `number` | obrigatória (`<= 0` não renderiza) |
| `max` | `number` | `9` (acima mostra `9+`) |
| `accessibilityLabel` | `string` | `"{n} não lidas"` |

Círculo de 18 px `accent` com número Bold 11/14 na cor `background`. Com 2+ caracteres vira pílula (`paddingHorizontal` 5). Mede pelo conteúdo.
