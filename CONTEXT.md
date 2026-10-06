# CONTEXT — design-system (`lavex-design-system`)

Documento único de contexto técnico do design system da Lavex. Descreve **o código atual** do repositório `LavexTech/design-system`: tokens, padrões, bibliotecas, catálogo de componentes, contrato de props e descrição visual de cada um.

O objetivo é que este arquivo seja suficiente, sozinho, para entender **para que serve**, **como se parece quando renderizado**, **como se comporta** e **quais variantes tem** cada componente — sem abrir o código.

Versão de referência: `package.json` `1.0.4`. Data de referência do código: outubro de 2026.

> A linguagem visual 2.0 está no código (épico [#205](https://github.com/LavexTech/design-system/issues/205)). A especificação visual está em `docs/prototipos/` e o impacto nos apps, em `docs/migracao-2.0.md`. Este documento descreve o **código atual**.

---

## 1. O que é

Biblioteca de componentes React Native (com suporte a web via react-native-web nos apps consumidores) publicada como pacote npm `lavex-design-system` e consumida diretamente do GitHub.

Consumidores:

- `app-client-lavex` — app do cliente;
- `app-provider-lavex` — app do prestador (lavexer);
- `showcase-design-system` / `demo/` — vitrine e app de testes manuais.

Instalação nos apps (pin de branch, não de tag):

```json
"lavex-design-system": "github:LavexTech/design-system#main"
```

Entrypoint: `index.ts` na raiz (`main` e `react-native` apontam para ele). Tudo que o app consome **precisa estar exportado lá**. Arquivos publicados (`files`): `src/`, `docs/`, `babel.config.js`, `tailwind.config.js`, `nativewind-env.d.ts`, `react-native.config.js`, `metro.config.js`, `README.md`, `index.ts`.

Importante: o pacote é distribuído como **código-fonte TypeScript/TSX**, não como build. `npm run build` (`tsc`) gera `dist/` com `.d.ts` e sourcemaps, e `npm run typecheck` roda `tsc --noEmit`. O `tsconfig` usa `module: esnext` e `moduleResolution: bundler`, e inclui `nativewind-env.d.ts`. Os apps não consomem `dist/`: o Metro compila `src/` diretamente. Os peers (`react`, `react-native`, `expo-font`, `nativewind`, `react-native-svg`, `react-native-reanimated`) também estão em `devDependencies` para o `tsc` deste repositório.

---

## 2. Stack e bibliotecas

| Item | Valor |
|---|---|
| Base | React `19.1.0`, React Native `0.81.4` (peer deps) |
| Expo | `expo ^54.0.12`, `expo-font >=14.0.0` (peer) |
| Estilo | `StyleSheet` nativo. NativeWind 4 (`nativewind ^4.2.1`, peer) e `tailwindcss ^3.4.18` permanecem na toolchain do `demo/` e no `babel.config.js` |
| Ícones | `lucide-react-native ^1.31.0` + `react-native-svg ^15.13.0` (peer) |
| Animação | `Animated` da RN e `react-native-reanimated ~4.1.0` + `react-native-worklets ^0.5.1` |
| Gestos | `PanResponder` da RN (não usa `react-native-gesture-handler`) |
| Safe area | `react-native-safe-area-context ^5.6.1` (usado pelo `Modal`) |
| Linguagem | TypeScript `~5.9.2`, `strict: true`, `jsx: react-native`, alias `@/*` |
| Testes | **nenhum** runner e nenhum arquivo de teste |
| CI | **nenhum** workflow de build/lint/teste |

`tailwind.config.js` relevante: `darkMode: 'class'`, `important: 'html'`, `safelist` com padrão regex liberando `bg|border|text|stroke|fill` × paleta semântica × escala.

---

## 3. Estrutura de pastas

```
design-system/
  index.ts                      # barrel ÚNICO de exportação pública
  tailwind.config.js            # paleta semântica, sombras, fontes
  babel.config.js               # babel-preset-expo + nativewind/babel + module-resolver
  metro.config.js
  src/
    components/<Nome>/<Nome>.tsx  # 1 pasta por componente, arquivo com o mesmo nome
    components/Icons/*.tsx        # wrappers finos de lucide-react-native
    components/Icons/iconProps.ts # contrato comum dos ícones
    constants/constants.ts        # design tokens em JS (fonte principal de estilo)
    utils/                        # helpers puros
    assets/fonts/PlusJakartaSans/static/  # TTFs Regular, Medium, SemiBold, Bold e ExtraBold
    fontSetup.ts                  # useFonts / useGlobalFonts
    global.css                    # apenas as 3 diretivas @tailwind
  docs/README.md
  docs/migracao-2.0.md            # guia de impacto da migração 2.0 para os apps consumidores
  docs/prototipos/                # 21 telas HTML de alta fidelidade — especificação visual do 2.0
  demo/                           # app Expo de testes manuais
  README.md, DesignSystemUsage.md
```

---

## 4. Padrões e regras do repositório

### Estrutura e exportação

1. Um componente por pasta: `src/components/<Nome>/<Nome>.tsx`, export **nomeado** (`export const <Nome>`).
2. Todo componente público é reexportado em `index.ts`, agrupado por seção (`// Texts`, `// Inputs`, `// User Cards`, `// Lists`, `// Others`, `// Fonts`, `// Icons`). Componente fora do `index.ts` não existe para o app.

### Estilo

3. A fonte de verdade de estilo é `src/constants/constants.ts` (importado como `Constants`). Valores numéricos/cores crus no `StyleSheet` são exceção; o padrão é `Constants.styles.*`.
4. Os componentes usam `StyleSheet.create` + `Constants`. Não há `className` nem provider de tema de terceiros na árvore.

### Texto e dimensão (regras transversais)

5. **Nada trunca.** Não existe um único `numberOfLines` ou `ellipsizeMode` em todo o `src/`. Todo texto longo **quebra linha** e faz o componente crescer em altura — nunca aparece reticência. Vale para nomes em cards de usuário, títulos de `Order`/`AccordionItem`, rótulos de `CheckButton`, opções de `Select` e balões de `Message`. Ao imaginar o layout, suponha sempre multi-linha, não corte.
6. **A família carregada é só Plus Jakarta Sans.** `fontSetup.ts` registra Regular, Medium, SemiBold, Bold e ExtraBold. Não há alias `Roboto-*`. Quando a família estática já está carregada, `fontWeight` fica `"normal"` e o peso vem do arquivo.

### Props

7. Texto entra como prop `text: string`, não como `children`. `children` é reservado para composição (`Card`, `List`, `Modal`, `Accordion`, `SwipeableListItem`, `Grid`).
8. Callback de interação principal é `onClick` (não `onPress`), exceto em primitivos de baixo nível (`ProfileAvatar.onPress`, `Image.onClick`).
9. Props de tema/escala são opcionais e com default: `darkMode?: boolean = false`, `fontScale?: number = 1`. `fontScale` multiplica `fontSize`/`lineHeight`.
10. Identificadores de código em inglês; textos visíveis padrão e comentários voltados a humanos em pt-BR.

### Manutenção obrigatória

11. **Toda alteração em componente, prop, variante, token ou ícone deve atualizar este `CONTEXT.md` no mesmo conjunto de mudanças** (regra `.cursor/rules/context-md.mdc`). Em review de PR, `CONTEXT.md` desatualizado é achado bloqueante.
12. Toda alteração também exige bump de `version` no `package.json` (regra `.cursor/rules/version-bump.mdc`).

### Largura natural

Determina se dois componentes cabem lado a lado e se um bloco estica até as bordas do container.

| Comportamento | Componentes |
|---|---|
| **Largura total** (`width: 100%` ou `alignSelf: stretch`) | `Card`, `List`, `TextList`, `UserList`, `OfferList`, `Grid`, `Divider`, `Toggle`, `Stepper`, `NavigationBar`, `SwipeableListItem`, `InputChat`, `Message`, `Order`, `Info`, `Text` (com `fill: true`, o default), `Button`, `Input`, `TextArea`, `Accordion`, `Select` |
| **Mede pelo conteúdo** (`alignSelf: flex-start`) | `Tag`, `FAB`, `CheckButton`, `ProfileAvatar`, `Image`, `Text` com `fill={false}` |
| **Cobre a tela** | `Modal` (`Modal` nativo transparente, overlay `flex: 1`) |

---

## 5. Design tokens — `src/constants/constants.ts`

Acessados como `Constants.styles.<grupo>.<CHAVE>`.

### Tipografia

| Grupo | Chave | Valor |
|---|---|---|
| `fontSize` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 36 / 24 / 20 / 18 / 14 |
| `fontSize` | `DISPLAY` / `WORDMARK` / `TITLE` / `ACTION` / `BODY` / `SUBTITLE` / `LABEL` / `CAPTION` | 28 / 30 / 22 / 17 / 16 / 15 / 14 / 13 |
| `lineHeight` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 30 / 26 / 22 / 18 / 14 |
| `lineHeight` | `DISPLAY` / `WORDMARK` / `TITLE` / `ACTION` / `BODY` / `SUBTITLE` / `LABEL` / `CAPTION` | 34 / 36 / 28 / 22 / 24 / 22 / 20 / 18 |
| `fontWeight` | `BOLD` / `NORMAL` / `THIN` | `"700"` / `"400"` / `"100"` |
| `fontFamily` | `REGULAR`, `MEDIUM`, `SEMIBOLD`, `BOLD` | `PlusJakartaSans-Regular`, `PlusJakartaSans-Medium`, `PlusJakartaSans-SemiBold`, `PlusJakartaSans-Bold` |

### Cores

| Grupo | Chave | Valor |
|---|---|---|
| `textColor` | `DEFAULT` | `#2D3B42` (cinza escuro) |
| | `PRIMARY` | `#007AFF` (azul) |
| | `SUCCESS` | `#059669` (verde) |
| | `DANGER` | `#DC2626` (vermelho) |
| | `INFO` | `#8F98AD` (cinza azulado) |
| | `WARNING` | `#F59E0B` (âmbar) |
| `backgroundColor` | `WHITE` / `LIGHT_GRAY` / `GRAY` | `#FFFFFF` / `#E5E1E6` / `#E5E1E6` |
| `borderColor` | `LIGHT` / `MEDIUM` | `#E5E1E6` / `#CED4DA` |
| `color` | `WHITE` / `BLACK` | `#FFFFFF` / `#000000` |
| | `GOLD` | `#FFD700` (estrela preenchida) |
| | `GRAY` | `#E5E1E6` (estrela vazia, badge inativo) |
| | `BLUE` | `#007AFF` |
| | `MEDIUM_GRAY` | `#6C757D` |
| | `SOFT_BLUE` | `#D7E7FA` (balão de mensagem enviada) |
| | `PRIMARY_LIGHT` | `#3CDBC0` (verde-água da marca) |
| | `PRIMARY_DARK` | `#2D3B42` (grafite azulado da marca) |
| | `BACKGROUND_LIGHT` | `#E5E1E6` |
| `shadowColor` | `DEFAULT` | `#000` |

### Paleta da marca (`Constants.styles.brand`)

| Chave | Valor | Uso |
|---|---|---|
| `PRIMARY` | `#3CDBC0` | Verde-água da marca. Cor dos títulos `h1` (`Heading level="h1"`). |
| `DARK` | `#0B7566` | Verde-escuro da marca. Cor dos títulos `h4` e dos links. |
| `DEEP` | `#08706D` | Verde profundo, apoio da escala. |
| `SURFACE` | `#2D3B42` | Grafite azulado da marca. Mesmo hex de `color.PRIMARY_DARK` e `text.DEFAULT`. Cor dos títulos `h2`. |

O Tailwind repete esses hex em `brand.DEFAULT`, `brand.dark`, `brand.deep` e `brand.surface`.

### Tema light/dark (`Constants.styles.theme`)

| Caminho | light | dark |
|---|---|---|
| `text.default` | `#2D3B42` | `#F3F7FF` |
| `text.muted` | `#8F98AD` | `#B7C1D6` |
| `text.primary` | `#007AFF` | `#4EA8FF` |
| `background.surface` | `#FFFFFF` | `#121821` |
| `background.subtle` | `#E5E1E6` | `#1A2432` |
| `border.default` | `#E5E1E6` | `#2A364A` |

### Espaçamento, raio, borda e tamanhos

| Grupo | Chave | Valor |
|---|---|---|
| `spacing` | `TINY` / `SMALL` / `MEDIUM` / `LARGE` / `EXTRA_LARGE` | 4 / 8 / 16 / 24 / 32 |
| `borderRadius` | `SMALL` / `MEDIUM` / `LARGE` / `XL` / `2XL` / `3XL` / `PILL` / `FULL` | 4 / 8 / 12 / 14 / 16 / 20 / 24 / 999 |
| `borderWidth` | `THIN` / `REGULAR` / `THICK` / `HAIRLINE` / `INTERACTIVE` | 0.4 / 0.8 / 1.2 / 1 / 1.5 |
| `componentSize` | `BUTTON_HEIGHT` / `BUTTON_WIDTH` | 40 / 40 |
| | `BUTTON_HEIGHT_LG` / `INPUT_HEIGHT` / `TOUCH_TARGET` | 56 / 52 / 44 |
| | `INPUT_MIN_WIDTH` | 50 |
| | `NAVIGATION_BAR_HEIGHT` | 76 |
| `icon` | `SMALL` / `MEDIUM` | 16 / 20 |
| `opacity` | `LOW` / `MEDIUM` / `HIGH` | 0.5 / 0.7 / 0.9 |
| `maxWidth` | `messageBubble` | `"75%"` |
| `stepper` | `ICON_SIZE` | 16 |
| `gallery` | `CONTAINER_GAP` | 12 |

---

## 6. Paleta no `tailwind.config.js`

O `tailwind.config.js` grava a paleta 2.0 em hexadecimal. `brand`, `ink` e `line` repetem os tokens de `Constants.styles`. As escalas antigas (`primary`, `typography`, `background`, `error` e as demais) também apontam para esses hex, não mais para CSS vars. Nenhum componente lê classes Tailwind para cor. A cor da tela vem de `Constants.styles`.

`Button variant="default"` é fundo `#3CDBC0` e texto `#2D3B42`.

---

## 7. Tipografia e carregamento de fontes

Família única: **Plus Jakarta Sans**, embarcada em `src/assets/fonts/PlusJakartaSans/static/` nos cortes Regular (400), Medium (500), SemiBold (600) e Bold (700). `useFonts` só carrega esses quatro nomes.

`src/fontSetup.ts` exporta:

- `useFonts(fontNames?: string[])` — carrega sob demanda via `expo-font`, com cache em `Set` de módulo para não recarregar. Default: `["PlusJakartaSans-Regular"]`. Retorna `ready: boolean`; em erro, loga e retorna `true` mesmo assim (degrada para a fonte do sistema). Nome fora dos quatro cortes é ignorado.
- `useGlobalFonts()` — carrega todos os 6 cortes.
- `useResolvedFontFamily(fontName)` — devolve o nome da família quando o corte carregou, ou `undefined` antes disso.

Todo texto do pacote usa um desses cortes via `useResolvedFontFamily`. Título e rótulo em negrito usam Bold; peso 500 usa Medium; corpo usa Regular. Com o arquivo carregado, `fontWeight` fica `"normal"`.

`Button` (rótulo e confirmação), `Input`, `TextArea` e o título do `AccordionItem` usam `useResolvedFontFamily`: Regular no campo, Bold no botão e no título. Com a família Bold carregada, `fontWeight` fica `"normal"` para o negrito vir do arquivo estático (no Android, `fontWeight` não combina com família estática). `textStyle` do `Button` continua por último e vence o default.

---

## 8. Catálogo de componentes

Formato de cada entrada: **para que serve**, **contrato** (props), **aparência** (o que se vê) e **comportamento/variantes**.

### 8.1 Textos

#### `Heading`

Título semântico da hierarquia da marca (`h1`, `h2`, `h4`). O `h4` sai em caixa alta mesmo quando o `text` chega em caixa normal.

| Prop | Tipo | Default | Obrigatória |
|---|---|---|---|
| `text` | `string` | — | sim |
| `level` | `'h1' \| 'h2' \| 'h4'` | — | sim |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` | não |

**Aparência:** quebra linha, sem margem nem padding. Com a fonte carregada, `fontWeight` fica `"normal"`.

- `h1`: Plus Jakarta SemiBold, 30 px / 36 px (`WORDMARK`), `letterSpacing` -0,5, cor verde-água `#3CDBC0` (`brand.PRIMARY`).
- `h2`: Plus Jakarta Bold, 28 px / 34 px (`DISPLAY`), `letterSpacing` -0,4, cor grafite azulado `#2D3B42` (`color.PRIMARY_DARK`).
- `h4`: Plus Jakarta ExtraBold, 13 px / 18 px (`CAPTION`), `letterSpacing` 0,6, cor verde-escuro `#0B7566` (`brand.DARK`), `textTransform: "uppercase"`.

**Comportamento:** estático. `accessibilityRole="header"` e `aria-level` 1, 2 ou 4. Na web o react-native-web usa esse nível para a tag (`h1`, `h2`, `h4`). Não aceita `darkMode` nem `fontScale`. Não define `width`; em coluna, acompanha o `alignItems` do pai, como o `MainTitle`. Não substitui `MainTitle`: o título de tela "Entrar" continua no `MainTitle`, em grafite.

#### `MainTitle`

Título principal de tela (o maior da hierarquia).

| Prop | Tipo | Default | Obrigatória |
|---|---|---|---|
| `text` | `string` | — | sim |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` | não |

**Aparência:** Plus Jakarta Bold, `fontSize` 28, `lineHeight` 34, `letterSpacing` -0,4, cor `#2D3B42`. Com a fonte carregada, `fontWeight` fica `"normal"` para o Android usar o arquivo estático. Quebra linha. Não tem margem nem padding próprios.

**Comportamento:** estático; não aceita `darkMode` nem `fontScale`.

#### `Title`

Título de seção.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |

**Aparência:** Plus Jakarta Bold, `fontSize` e `lineHeight` `22 × fontScale` e `28 × fontScale`, cor `#2D3B42` (light) ou `#F3F7FF` (dark). `fontWeight: "normal"` quando a fonte carregou. Quebra linha, sem margens.

#### `Subtitle`

Subtítulo / título de bloco dentro de um card ou lista.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |

**Aparência:** Plus Jakarta SemiBold, `fontSize` 15 e `lineHeight` 22, cor `#2D3B42`. `fontWeight: "normal"` quando a fonte carregou. Sem suporte a dark mode.

#### `Text` (export do componente `TextBox`)

Texto de corpo. É o componente de texto mais usado internamente.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |
| `level` | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning'` | `'default'` |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |
| `fill` | `boolean` | `true` |

**Aparência:** Plus Jakarta Regular, `fontWeight: "normal"` quando a fonte carregou. Tamanhos: `small` 14/20, `medium` 16/24, `large` 17/22 (todos × `fontScale`). Cor por `level` no tema claro: `default` `#2D3B42`, `primary` `#0B7566`, `success` `#0B7566`, `error` `#C62828`, `warning` `#8A5A00`. No `darkMode`, `default` e `primary` continuam nas cores do tema escuro (`#F3F7FF` e `#4EA8FF`). Com `fill: true` (padrão) ocupa `width: 100%` — por isso, dentro de linhas (`flexDirection: row`), passe `fill={false}` para o texto medir pelo conteúdo.

#### `Info`

Texto auxiliar/legenda — metadados, labels de campo, "Sem avaliações", datas.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `tone` | `'muted' \| 'default'` | `'muted'` |
| `bold` | `boolean` | `false` |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |

**Aparência:** Plus Jakarta Regular, `fontSize` `13 × fontScale`, `lineHeight` `18 × fontScale`. `tone="muted"`: `#5A6A72` (light) / `#B7C1D6` (dark), sem opacidade extra. `tone="default"`: `#2D3B42` / `#F3F7FF`. `bold` troca o peso para 700. Ocupa a largura disponível (`alignSelf: stretch`).

### 8.2 Inputs

#### `Input`

Campo de texto base. Todos os demais inputs especializados delegam para ele.

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | — (obrigatória; string vazia esconde o label) |
| `value` | `string` | — (obrigatória) |
| `onChange` | `(value: string) => void` | — (obrigatória) |
| `placeholder` | `string` | `""` |
| `placeholderTextColor` | `string` | `#8F98AD` |
| `validation` | `(value: string) => boolean` | — |
| `errorMessage` | `string` | — |
| `mask` | `string` | — |
| `mobileKeyboard` | `'text' \| 'email' \| 'phone' \| 'number'` | `'text'` |
| `secureTextEntry` | `boolean` | `false` |
| `rightElement` | `ReactNode` | — |
| `onBlur` | `() => void` | — |
| `onSubmitEditing` | `() => void` | — |
| `returnKeyType` | `'done' \| 'go' \| 'next' \| 'search' \| 'send' \| 'default'` | — |
| `autoCapitalize` | `'none' \| 'sentences' \| 'words' \| 'characters'` | — (`'none'` quando `mobileKeyboard='email'`) |
| `autoCorrect` | `boolean` | — (`false` quando `mobileKeyboard='email'`) |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |
| `fieldHeight` | `number` | `52` (`INPUT_HEIGHT`) |

```
  Nome completo                             ← label Bold 14/20, #2D3B42
┌────────────────────────────────┬────────┐
│ ←16→ valor digitado            │ [right]│ fieldHeight (padrão 52)
└────────────────────────────────┴────────┘
  mensagem de erro                           ← caption, #C62828
```

**Aparência:** coluna com `gap` 6. Label em Plus Jakarta Bold, `fontSize` `14 × fontScale`, `lineHeight` `20 × fontScale`, cor `#2D3B42`. A caixa tem altura `fieldHeight` (padrão 52), raio 12, borda 1,5 px `#869199`, fundo branco e `paddingLeft` 16. O texto digitado usa Plus Jakarta Regular, 16 px, cor `#2D3B42`, altura interna 44. Inválido: borda `#C62828` e a `errorMessage` abaixo, em caption. Foco: borda `#0B7566` e, na web, outline de 2 px na mesma cor. `InputEmail` e `InputPassword` repassam `fieldHeight`.

**Comportamento:** aplica `mask` caractere a caractere, onde `X`/`x` são posições de dígito/letra e o resto é literal (máscara com letras A–Z ou dígitos é rejeitada com `console.warn`). Roda `validation` a cada digitação e via `useEffect` quando `value` muda. Na web, `onSubmitEditing` é disparado por `onKeyPress` com Enter (o `onSubmitEditing` nativo é desligado). `rightElement` fica dentro da caixa, à direita, sem encolher (`flexShrink: 0`). O texto do campo encolhe (`minWidth: 0`) para o elemento da direita não sair do quadro em telas estreitas. A caixa corta o que ainda extrapolar (`overflow: hidden`).

#### `InputName`

Nome completo com capitalização automática.

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | — (obrigatória) |
| `value` | `string` | — (obrigatória) |
| `onChange` | `(value: string) => void` | — (obrigatória) |
| `placeholder` | `string` | `"Nome Sobrenome"` |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Aparência:** idêntica ao `Input`.

**Comportamento:** no `onBlur`, capitaliza cada palavra mantendo preposições minúsculas (`de`, `di`, `do`, `da`, `dos`, `das`, `del`) e tratando apóstrofo (`d'Avila`). Validação: exige pelo menos duas palavras; erro `"Digite pelo menos nome e sobrenome"`. Valor vazio é considerado válido.

#### `InputEmail`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | `string` / `(v: string) => void` | obrigatórias |
| `label` | `string` | `"Email"` |
| `placeholder` | `string` | `"example@email.com"` |
| `errorMessage` | `string` | `"Email deve ter formato válido"` |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Comportamento:** força minúsculas a cada digitação; teclado `email-address`, sem autocapitalize/autocorrect. Validação estrutural simples: precisa ter `@` depois do primeiro caractere e um `.` depois do `@` que não seja o último caractere.

#### `InputPhone`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | — | obrigatórias |
| `label` | `string` | `"Telefone"` |
| `placeholder` | `string` | `"(00) 00000-0000"` |
| `errorMessage` | `string` | `"Telefone deve ter 11 dígitos"` |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Comportamento:** máscara progressiva brasileira — `(00)`, `(00) 0000`, `(00) 0000-0000`, `(00) 00000-0000` —, limitada a 11 dígitos. Teclado `phone-pad`. Válido somente com exatamente 11 dígitos (vazio também é válido).

#### `InputCPF`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | — | obrigatórias |
| `label` | `string` | `"CPF"` |
| `placeholder` | `string` | `"000.000.000-00"` |
| `errorMessage` | `string` | `"CPF deve ter formato válido"` |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Comportamento:** máscara `XXX.XXX.XXX-XX`, teclado numérico e validação real dos dois dígitos verificadores (rejeita também sequências repetidas como `111.111.111-11`).

#### `InputPassword`

| Prop | Tipo | Default |
|---|---|---|
| `label` / `value` / `onChange` | — | obrigatórias |
| `placeholder` | `string` | `"Digite sua senha"` |
| `showPasswordToggle` | `boolean` | `true` |
| `errorMessage` | `string` | — (mensagem derivada da regra violada) |
| `minLength` | `number` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
  Senha
┌────────────────────────────────┬───────┐
│ ←12→ ••••••••                  │  👁    │ 48   ← olho dentro da caixa
└────────────────────────────────┴───────┘
  A senha deve conter pelo menos um número  ← mensagem da 1ª regra violada
```

**Aparência:** `Input` com `secureTextEntry` e, à direita dentro da caixa, um botão de 44×44 com ícone de olho de 24 px (`IconEye` quando a senha está visível, `IconEyeClosed` quando oculta). O botão não encolhe e permanece inteiro dentro da borda, mesmo quando a largura da tela não comporta o texto ao lado.

**Comportamento:** o toggle alterna a visibilidade localmente. Validação exige maiúscula, minúscula e dígito, mais `minLength` quando informado; a mensagem de erro é específica para a primeira regra violada (ou a `errorMessage` passada, que tem precedência).

#### `InputNumber`

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | — | obrigatórias |
| `label` | `string` | `"Número"` |
| `placeholder` | `string` | `"Digite um número"` |
| `errorMessage` | `string` | `"Número inválido"` |
| `min` / `max` / `length` | `number` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Comportamento:** remove tudo que não é dígito, trunca em `length` e agrupa de 4 em 4 com espaço (`1234 5678 9012`) — formato pensado para cartão. Valida faixa `min`/`max` com mensagens dedicadas.

#### `InputChat`

Barra de envio de mensagem no chat.

| Prop | Tipo | Default |
|---|---|---|
| `value` / `onChange` | — | obrigatórias |
| `onSend` | `() => void` | — (obrigatória) |
| `placeholder` | `string` | `"Escreva sua mensagem"` |

```
┌──────────────────────────────────┐  ┌────┐
│ Enviar mensagem...               │  │ ➤  │  ← alinhados pela BASE
└──────────────────────────────────┘  └────┘
  flex: 1                        gap 8   ícone 20 + padding 8
```

**Aparência:** linha de largura total, gap 10, alinhada pela base. Campo de 48 px, raio 24, borda 1,5 px `#869199`, padding horizontal 18, texto 16. Botão circular de 48 px: `#3CDBC0` com ícone `#2D3B42` quando há texto; `#E5E1E6` com ícone `#5A6A72` quando vazio. Vazio, o botão fica desabilitado.

**Comportamento:** `onSend` só dispara com `value.trim()` não vazio; `returnKeyType="send"` e Enter também enviam. O componente não limpa o campo — isso é responsabilidade do app.

#### `TextArea`

Campo multilinha com contador opcional.

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | — (obrigatória) |
| `onChange` | `(value: string) => void` | — (obrigatória) |
| `value` | `string` | — |
| `placeholder` | `string` | — |
| `maxLength` | `number` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
  Bio                                       ← label
┌──────────────────────────────────────────┐
│ ←12→ texto multilinha, cresce conforme   │
│ o conteúdo…                              │
└──────────────────────────────────────────┘
                        120/300 caracteres  ← alinhado à direita, só com maxLength
```

**Aparência:** rótulo 14 px peso 600. Campo com altura mínima 120, borda 1,5 px `#869199`, raio 12, texto 16. Foco pinta a borda de `#0B7566`. Com `maxLength`, o contador `"{n}/{max} caracteres"` fica à direita e o campo ignora entrada além do máximo. `darkMode` é aceita e ignorada.

**Comportamento:** digitação acima de `maxLength` é **ignorada** (não trunca, simplesmente não aplica).

#### `Select`

Seleção de uma opção via modal.

| Prop | Tipo | Default |
|---|---|---|
| `label` | `string` | — (obrigatória) |
| `options` | `SelectOption[]` (`{ label, value }`) | — (obrigatória) |
| `onChange` | `(value: string) => void` | — (obrigatória) |
| `value` | `string` | — |
| `placeholder` | `string` | `"Selecione"` |
| `errorMessage` | `string` | — |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |
| `triggerFontScale` | `number` | `1` |

```
  Forma de pagamento                      ← label
┌──────────────────────────────────┬─────┐
│ ←16→ Selecione                   │  ⌄  │ ≥48
└──────────────────────────────────┴─────┘
  ao tocar → Modal com CheckboxListItem (gap 16) + botão "Voltar"
```

**Aparência:** label acima; gatilho em linha de altura mínima 48, fundo branco, raio 8, borda 0,8 px `#CED4DA`, padding horizontal 16, com o texto selecionado (ou o placeholder) à esquerda e um `IconChevronDown` à direita em `#8F98AD`, separado por 8. Com `errorMessage`, a borda vira `#DC2626` e a mensagem aparece embaixo em vermelho. Dark mode: fundo `#1A2432`, borda `#2A364A`, chevron `#B7C1D6`.

**Comportamento:** ao tocar, abre um `Modal` com botão "Voltar" (`default-outline`) listando as opções como `CheckboxListItem` com gap 16 e largura total; a opção atual aparece marcada. Selecionar fecha o modal e chama `onChange`. Desmarcar a opção já selecionada não faz nada. `triggerFontScale` escala **somente** o texto do gatilho (combinado com `fontScale`), útil para caber rótulos longos.

#### `Toggle`

Interruptor booleano com rótulo.

| Prop | Tipo | Default |
|---|---|---|
| `label` / `value` / `onChange` | `string` / `boolean` / `(v: boolean) => void` | obrigatórias |
| `darkMode` / `fontScale` | — | `false` / `1` |

**Aparência:** linha de largura total, rótulo (`Text size="small"`) à esquerda ocupando o espaço livre e o `Switch` nativo à direita. Trilho ligado em `#3CDBC0` (verde-água da marca), desligado em `#CED4DA` (ou `#2A364A` no dark); botão sempre branco. `accessibilityLabel` igual ao `label`.

### 8.3 Cards de usuário

Todos usam o tipo `User`:

```ts
type User = {
  id: string
  name: string
  profileImage: string
  ordersCount: number
  rating: number
  totalRatings?: number   // ausente em UserCardBio, que exige bio
  userType: 'client' | 'provider'
}
```

A legenda de pedidos vem de `getOrdersCountLabel`: `"{n} pedidos executados"` para `provider`, `"{n} pedidos feitos"` para `client`.

#### `UserCardVertical`

Card centralizado com foto grande — perfil em destaque.

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User` | — (obrigatória) |
| `onClick` | `() => void` | — |
| `onAvatarPress` | `() => void` | — |
| `darkMode` | `boolean` | `false` |

```
┌─ Card ────────────────────┐
│          ╭────╮           │  avatar md (80px), circular
│          │ 👤 │           │
│          ╰────╯           │
│        João Silva         │
│    12 pedidos feitos      │
│      ★★★★☆  4.5/5         │
└───────────────────────────┘
  tudo centralizado na horizontal
```

**Aparência:** `Card` com três linhas centralizadas: avatar `md` (80 px, circular), nome (`Text`) com a legenda de pedidos (`Info`) logo abaixo, e a linha de avaliação — 5 estrelas de 16 px seguidas de `"4.5/5"`. Sem avaliações (`totalRatings === 0`, ou `rating === 0` quando `totalRatings` é indefinido), mostra só `"Sem avaliações"`.

#### `UserCardHorizontal`

Card compacto para listas.

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User` | — (obrigatória) |
| `onClick` | `() => void` | — |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |
| `infoTone` | `'muted' \| 'default'` | `'muted'` |

```
┌─ Card ────────────────────┐
│ João Silva                │  coluna, alinhada à esquerda, gap 8
│ 12 pedidos feitos         │  SEM avatar, apesar do nome do componente
│ ★★★★☆                     │
└───────────────────────────┘
```

**Aparência:** `Card` com coluna alinhada à esquerda e gap 8 — nome, legenda de pedidos e estrelas de 16 px (ou `"Sem avaliações"`). Apesar do nome, **não** renderiza avatar nem dispõe os elementos em linha. `infoTone="default"` tira o cinza apagado da legenda.

#### `UserCardBio`

Card com avatar à esquerda e bloco de dados à direita.

| Prop | Tipo | Default |
|---|---|---|
| `user` | `User & { bio: string }` | — (obrigatória) |
| `onClick` / `onAvatarPress` | `() => void` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
┌─ Card ────────────────────────┐
│ ╭────╮  João Silva            │  avatar sm (64px) em coluna fixa de 64
│ │ 👤 │  12 pedidos feitos     │  texto alinhado ao TOPO, não ao centro
│ ╰────╯  ★★★★☆ 4/5             │  a bio NÃO aparece
└───────────────────────────────┘
   64      ←── flex: 1 ──→
```

**Aparência:** `Card` com linha alinhada ao topo e gap 8: coluna fixa de 64 px com o avatar `sm` (64 px) e, à direita, coluna flexível com nome, legenda de pedidos e linha de estrelas 16 px + `"{rating arredondado}/5"`. **O campo `bio` não é renderizado** apesar de obrigatório no tipo (ver dívidas).

#### `ProfileAvatar`

Avatar circular com fallback para ícone.

| Prop | Tipo | Default |
|---|---|---|
| `alt` | `string` | — (obrigatória) |
| `profileImage` | `string \| null` | — |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md'` | `'sm'` |
| `onPress` | `() => void` | — |
| `darkMode` | `boolean` | `false` |

```
com foto:        sem foto (ou só espaços):
 ╭──────╮         ╭──────╮
 │ foto │         │  👤  │   fundo #E5E1E6
 ╰──────╯         ╰──────╯   ícone a 45% do diâmetro, cor #8F98AD
```

**Aparência:** círculo de 32 (`2xs`), 40 (`xs`), 64 (`sm`) ou 80 px (`md`), com `overflow: hidden` e `alignSelf: flex-start`. Com imagem: a foto recortada em círculo. Sem imagem (nulo ou só espaços): fundo `#E5E1E6` (ou `#1A2432` no dark) com `IconProfile` centralizado em 45% do diâmetro, cor `#8F98AD` (ou `#B7C1D6`).

**Comportamento:** com foto, o toque é tratado pelo próprio `Image` (`onClick`); sem foto, o placeholder é envolvido por um `Pressable` com `accessibilityLabel={alt}`.

#### `UserInfo`

Par rótulo/valor de um campo do usuário.

| Prop | Tipo | Default |
|---|---|---|
| `user` | `{ [key: string]: any }` | — (obrigatória) |
| `type` | `string` | — (obrigatória) |
| `label` | `string` | — (derivado de `type`) |
| `onClick` | `() => void` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
E-mail                ← Info, cinza 14px
joao@email.com        ← Text, 18px
```

**Aparência:** duas linhas empilhadas com `gap-y-2`: rótulo em `Info` (cinza pequeno) e valor em `Text` (18 px). Sem borda, fundo ou padding próprios.

**Comportamento:** o rótulo sai do dicionário interno (`name` → "Nome", `email` → "E-mail", `phone` → "Telefone", `address` → "Endereço", `bio` → "Bio", `age` → "Idade", `city` → "Cidade", `country` → "País", `cep` → "CEP"); tipo desconhecido vira o próprio `type` capitalizado. Valor ausente renderiza string vazia. Com `onClick`, tudo vira área tocável.

### 8.4 Listas

#### `List`

Empilha filhos com separador opcional.

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `title` | `string` | — |
| `divider` | `boolean` | `true` |

```
Tarefas pendentes          ← Subtitle 20px, só com title
item 1
──────────────────────     ← 1px #E5E1E6, margem vertical 8
item 2
──────────────────────     ← nunca antes do primeiro item
item 3
```

**Aparência:** coluna de largura total; se houver `title`, um `Subtitle` no topo. Entre itens (nunca antes do primeiro), uma linha de 1 px `#E5E1E6` com margem vertical 8.

#### `TextList`

| Prop | Tipo |
|---|---|
| `texts` | `string[]` (obrigatória) |

**Aparência:** `List` sem título com um `Text` (18 px) por string, separados pela linha de 1 px. Não há bullets nem numeração.

#### `UserList`

| Prop | Tipo |
|---|---|
| `users` | `User[]` (obrigatória) |
| `onUserClick` | `(user: User) => void` |

**Aparência:** `Grid` de 1 coluna com `gap-1` (4 px) onde cada item é um `UserCardHorizontal` clicável. O `Divider` entre itens está comentado no código.

#### `OfferList`

| Prop | Tipo |
|---|---|
| `offers` | `{ id, amount, distance, user, onClick? }[]` (obrigatória) |

**Aparência:** `Grid` de 1 coluna com `gap-1` de componentes `Offer`.

**Observação:** o tipo local de `offers` não inclui `amountLabel`, então esta lista sempre renderiza o valor como `"R$ {amount}"`.

#### `SwipeableListItem`

Item de lista com ação de excluir revelada por arraste para a esquerda.

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `onDelete` | `() => void` | — (obrigatória) |
| `onPress` | `() => void` | — |
| `isOpen` | `boolean` | — (modo controlado quando definido) |
| `onOpenChange` | `(open: boolean) => void` | — |
| `deleteWidth` | `number` | `72` |
| `swipeEnabled` | `boolean` | `true` |

```
fechado:                        aberto (arrastado para ←):
┌──────────────────────────┐    ┌────────────────────┬─────┐
│ children                 │    │ children           │  🗑 │  faixa #DC2626
└──────────────────────────┘    └────────────────────┴─────┘  72px (deleteWidth)
                                 ← o conteúdo desliza; a faixa estava embaixo
```

**Aparência:** container de largura total com `overflow: hidden`. Atrás do conteúdo, encostada à direita e ocupando toda a altura, uma faixa vermelha `#DC2626` de `deleteWidth` px com `IconTrash` branco de 20 px centralizado. O conteúdo fica por cima, fundo branco, com hairlines `#E5E1E6` no topo e na base, e desliza horizontalmente.

**Comportamento:** `PanResponder` só assume o gesto depois de 10 px horizontais predominando sobre o vertical (rolagem da lista continua funcionando). O arraste é limitado ao intervalo `[-deleteWidth, 0]`. No soltar, abre se a velocidade for menor que −0,45, fecha se maior que +0,45, e caso contrário decide pela posição (abre além de 45% da faixa). A animação é `Animated.spring` sem bounce. Tocar no conteúdo aberto **fecha** em vez de disparar `onPress`. Com `swipeEnabled: false`, o item fecha e o gesto é ignorado — o toque continua funcionando. Suporta uso controlado (`isOpen` + `onOpenChange`) para manter só um item aberto na lista.

### 8.5 Estrutura e contêineres

#### `Card`

Superfície padrão para agrupar conteúdo.

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `title` | `string` | — |
| `onClick` | `() => void` | — |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |

```
┌───────────────────────────────────────┐
│ ←16→ Título (14px bold)               │  padding 16 nos quatro lados
│      ↓ 8                              │
│      children                         │
└───────────────────────────────────────┘
   ↓ margem inferior 8 (empilha cards com respiro)
```

**Aparência:** retângulo de largura total, fundo branco (`#121821` no dark), raio 8, borda 0,4 px `#E5E1E6` (`#2A364A` no dark), padding 16 e margem inferior 8. Com `title`, um texto Plus Jakarta Bold de `14 × fontScale` em `#2D3B42`, alinhado à esquerda, com 8 px abaixo. O conteúdo fica em uma `View` de largura total com `overflow: hidden`.

**Comportamento:** com `onClick` vira `TouchableOpacity` com `activeOpacity 0.7`; sem, é uma `View` inerte.

#### `Grid` / `GridItem`

Layout em colunas, sem biblioteca de grid.

| `Grid` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `columns` | `number` | `12` |
| `gap` / `gapX` / `gapY` | `number` | — |
| `darkMode` | `boolean` | `false` (aceita e ignora) |

| `GridItem` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `colSpan` | `number` | `1` |

**Aparência:** contêiner de largura total que não cresce nem encolhe (`flexGrow/flexShrink: 0`, `alignSelf: stretch`). O `gap` **não é em pixels**: cai em faixas de 4, 8, 12, 16, 24, 32 ou 48 px (`<=1 → 4`, `<=2 → 8`, `<=3 → 12`, `<=4 → 16`, `<=6 → 24`, `<=8 → 32`, acima → 48). `gapX` define o vão horizontal; `gapY`, o vertical. Sem um dos dois, vale `gap`.

**Comportamento:** filhos que não são `GridItem` entram com `colSpan` 1. O `colSpan` é limitado a `columns`. A largura de cada célula é `(largura útil × colSpan) / columns`, e a largura útil desconta o vão horizontal entre as células da linha.

#### `Divider`

| Prop | Tipo | Default |
|---|---|---|
| `darkMode` | `boolean` | `false` |

**Aparência:** linha horizontal de largura total e altura 0,4 px, cor `#E5E1E6` (ou `#2A364A` no dark). Sem margens.

#### `Tag`

Etiqueta preenchida. Os nomes `*-outline` permanecem.

**Aparência:** raio 12, texto 13 px peso 700, sem borda. `primary` e `success`: fundo `#E2FAF6`, texto `#0B7566`. `danger`: fundo `#FDECEC`, texto `#C62828`. `warning`: fundo `#FFF4E5`, texto `#8A5A00`. Mede pelo conteúdo (`alignSelf: flex-start`). `darkMode` é aceita e ignorada.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `variant` | `'primary-outline' \| 'success-outline' \| 'danger-outline' \| 'warning-outline'` | `'primary-outline'` |
| `size` | `'default' \| 'sm'` | `'default'` |
| `fontScale` | `number` | `1` |
| `darkMode` | `boolean` | `false` (aceita mas ignora) |

**Comportamento:** puramente visual — não é tocável e não tem estados.

#### `Modal`

Diálogo centralizado com rodapé de ações.

| Prop | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `onClose` | `() => void` | — (obrigatória) |
| `title` | `string` | — |
| `visible` | `boolean` | `true` |
| `buttonText` | `string` | `'OK'` |
| `buttonVariant` | variante de `Button` | `'default'` |
| `buttonSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — |
| `confirmText` | `string` | — |
| `onConfirm` | `() => void` | — |
| `confirmVariant` | variante de `Button` | `'success'` |
| `confirmDisabled` | `boolean` | `false` |
| `closeOnConfirm` | `boolean` | `true` |
| `contentMinHeight` | `number` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
▒▒▒▒▒▒▒▒▒ backdrop (toque fecha) ▒▒▒▒▒▒▒▒▒
   ┌─────────────────────────────────┐
   │            Título               │  header (só com title), centralizado
   ├─────────────────────────────────┤
   │ children — rola, limitado a     │
   │ 70% da altura máxima            │
   ├─────────────────────────────────┤
   │ [Cancelar]         [Confirmar]  │  space-between (só com onConfirm)
   └─────────────────────────────────┘  senão: botão único à direita
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

**Aparência:** `Modal` nativo transparente. Backdrop `rgba(0,0,0,0.5)` cobre a tela e o toque chama `onClose`. O cartão fica centralizado, com 80% da largura (máximo 510), raio 6, borda 1 px, padding 24 e fundo da superfície do tema (`#FFFFFF` no claro, `#121821` no escuro). Altura máxima = altura da janela − `NAVIGATION_BAR_HEIGHT` (76) − safe area inferior. O corpo rola e fica limitado a 70% desse máximo. Com `title`, o texto fica centralizado. Rodapé em linha com gap 8. Com dois botões, cada um cresce para dividir a largura do cartão.

**Comportamento:** modo confirmação é ativado por passar `onConfirm`. Nele, se `buttonText` ainda for o default `'OK'`, o botão esquerdo vira `"Cancelar"`, e um `buttonVariant` `'default'` vira `'default-outline'`. `handleConfirm` chama `onConfirm` e, com `closeOnConfirm` (padrão), também `onClose`. O modal nativo cobre a stack de navegação. `onRequestClose` (botão voltar do Android) chama `onClose`.

#### `Accordion` / `AccordionItem`

Seções expansíveis, uma por vez.

| `Accordion` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `darkMode` | `boolean` | `false` |
| `defaultValue` | `string` | — (id do item que começa aberto) |

| `AccordionItem` | Tipo | Default |
|---|---|---|
| `id` | `string` | — (obrigatória) |
| `title` | `string` | — (obrigatória) |
| `children` | `ReactNode` | — (obrigatória) |
| `titleAccessory` | `ReactNode` | — (ex.: `Tag` de status, logo após o título) |
| `leading` | `ReactNode` | — (ex.: chevron de voltar, antes do título) |
| `trailingAccessory` | `ReactNode` | — (antes do chevron) |
| `contentBackground` | `string` | — (fundo do conteúdo, com padding 16) |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
┌──────────────────────────────────────────────┐
│ [leading] Título  [titleAccessory]      ⌄    │  chevron colado na direita
└──────────────────────────────────────────────┘
  children (quando expandido)
───────────────────────────────────────────────  Divider após cada item
```

**Aparência:** lista de cabeçalhos com padding 16 horizontal e 12 vertical. Fundo branco no claro e `#121821` no escuro. Cada cabeçalho é uma linha: `leading` opcional (margem direita 8), título `18 × fontScale` na cor do tema e em negrito (Plus Jakarta Bold), `titleAccessory` ao lado do título com gap 8, `trailingAccessory` antes do chevron, e um `IconChevronDown` que gira 180° quando o item está aberto. Conteúdo com `contentBackground` ganha esse fundo e padding 16. Abaixo de cada item, um `Divider`.

**Comportamento:** um item por vez, e o aberto pode ser fechado. A troca usa `LayoutAnimation` easeInEaseOut de 300 ms (habilitada no Android).

### 8.6 Ações

#### `Button`

Botão principal do sistema, com modo de confirmação em duas etapas.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `onClick` | `() => void` | — (obrigatória) |
| `variant` | ver abaixo | `'default'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `disabled` | `boolean` | `false` |
| `icon` | `ReactNode` | — |
| `style` / `textStyle` | `ViewStyle` / `TextStyle` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |
| `needsConfirmation` | `boolean` | `false` |
| `confirmationText` | `string` | — (**obrigatória** quando `needsConfirmation` é `true`) |

```
sem icon:                        com icon:
┌──────────────────────────┐     ┌──────────────────────────┐
│ ←20→   Confirmar   ←20→  │ 40  │ ←16→[ic]   Confirmar     │ 40
└──────────────────────────┘     └──────────────────────────┘
         ↑ centralizado                ↑ ícone absoluto a 16px da esquerda;
                                         texto segue centralizado no botão
```

**Aparência:** `Pressable` de largura total. Alturas: `xs` 36, `sm` 40, `md` 48, `lg` 52, `xl` 56. Raios: 12, 12, 14, 16, 16. Texto Plus Jakarta, peso 700, tamanhos 14, 15, 16, 17, 17. Desabilitado: fundo `#E5E1E6`, texto `#5A6A72`, sem borda. `darkMode` é aceita e ignorada.

| Variante | Fundo | Texto | Borda |
|---|---|---|---|
| `default`, `primary`, `success` | `#3CDBC0` | `#2D3B42` | — |
| `default-outline` | `#FFFFFF` | `#2D3B42` | 1,5 px `#869199` |
| `success-outline` | `#E2FAF6` | `#0B7566` | 1,5 px `#0B7566` |
| `secondary` | `#2D3B42` | branco | — |
| `secondary-outline` | `#FFFFFF` | `#2D3B42` | 1,5 px `#2D3B42` |
| `danger` | `#C62828` | branco | — |
| `danger-outline` | `#FFFFFF` | `#C62828` | 1,5 px `#C62828` |
| `ghost` | transparente | `#0B7566` | — |
| `ghost-danger` | transparente | `#C62828` | — |

Toque em fundo opaco aplica opacidade 0,85. Fundo transparente ou branco, no toque, vai para `#E5E1E6`.

**Comportamento:** com `icon`, o nó fica em `position: absolute` a 16 px da esquerda e o texto continua centralizado. Com `needsConfirmation`, o primeiro toque troca o rótulo para `confirmationText` e pinta fundo `#C62828` com texto branco; o segundo toque dispara `onClick`. Sem o segundo toque, volta após 8 segundos.

#### `CheckButton`

Chip selecionável, com modo "travado" compacto.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `checked` | `boolean` | — (obrigatória) |
| `lockedColor` | `string` | — (obrigatória) |
| `onClick` | `(next: boolean) => void` | — |
| `onTap` | `(next: boolean) => void` | — |
| `isLocked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `style` | `ViewStyle` | — |

```
isLocked: false                  isLocked: true
┌──────────────────────┐         ┌──────────┐
│ (✓) Camisa social    │         │ Camisa   │  badge some, texto encolhe
└──────────────────────┘         └──────────┘
 ↑5px ↑badge 15,4                 padding 4,8
 padding-left 28,4                fonte 11,5 na cor lockedColor
 fonte 14,4 preta
```

**Aparência:** pílula retangular de raio 8, borda 1,2 px, fundo branco, que mede pelo conteúdo (`alignSelf: flex-start`). No estado normal (`isLocked: false`): borda e texto pretos, padding esquerdo ~28 px para acomodar um badge circular de 15,4 px a 5 px da borda esquerda — verde `#059669` com `IconCircleCheck` branco quando `checked`, cinza `#E5E1E6` com `IconCircle` preto quando não. Texto Plus Jakarta Regular 14,4 px centralizado. No estado travado (`isLocked: true`): o badge some, o padding encolhe para ~4,8 px, a fonte cai para 11,5 px e borda e texto assumem `lockedColor`.

**Comportamento:** a troca de `isLocked` é **instantânea** (`setValue`, sem animação), embora os valores sejam interpolados. O toque chama `onClick(!checked)` e `onTap(!checked)` — o componente é controlado, não guarda estado. Desabilitado fica com `opacity 0.7`; pressionado, 0,9. Expõe `accessibilityRole="button"` e `accessibilityState={{ checked, disabled }}`.

#### `FAB`

Botão de ação flutuante com rótulo (pílula), não circular.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `onClick` | `() => void` | — (obrigatória) |
| `disabled` | `boolean` | `false` |
| `darkMode` | `boolean` | `false` (ignorado) |

**Aparência:** pílula verde `#059669` de raio 999, padding 16 horizontal e 12 vertical, texto branco Plus Jakarta Regular 18 px (`lineHeight` 22), sombra preta deslocada 2 px para baixo (`opacity 0.22`, raio 4, `elevation 4`). Mede pelo conteúdo (`alignSelf: flex-start`). O posicionamento flutuante é responsabilidade do app — o componente não se posiciona sozinho.

**Comportamento:** pressionado vai a `opacity 0.9`; desabilitado, 0,5. `darkMode` é aceito mas não altera nada.

#### `Stepper`

Contador de quantidade com botões − / + e exclusão opcional.

| Prop | Tipo | Default |
|---|---|---|
| `value` / `min` / `max` | `number` | obrigatórias |
| `onChange` | `(value: number) => void` | — (obrigatória) |
| `text` | `string` | — |
| `onDelete` | `() => void` | — |
| `valueSuffix` | `string` | `""` |

```
┌──┐                                      ┌──┬──┐
│🗑 │  Camisa social              12un    │ −│ +│  40
└──┘  ←───── flex: 1 ─────→   →alinhado   └──┴──┘
 40×40                          à direita  colados, sem borda entre eles
 (só com onDelete)              30px (52 com valueSuffix)
```

**Aparência:** linha de largura total: botão de lixeira opcional de 40×40 (borda 0,4 px, raio 8, margem direita 8), rótulo flexível (`Text` 18 px), valor alinhado à direita em uma coluna de 30 px (52 px quando há `valueSuffix`) e, encostado na direita, o par de botões de 40×40 unidos — o esquerdo com `IconMinus` e cantos arredondados só à esquerda, o direito com `IconPlus` e cantos só à direita, sem borda entre eles. Ícones de 16 px, fundo branco, borda `#CED4DA`. Botão no limite: fundo `#E5E1E6` e `opacity 0.5`.

**Comportamento:** `+` só incrementa abaixo de `max`, `−` só decrementa acima de `min`; o componente é controlado.

#### `NavigationBar`

Barra de abas inferior.

| Prop | Tipo | Default |
|---|---|---|
| `pages` | `string[]` | — (obrigatória) |
| `activePage` | `string` | — (obrigatória) |
| `icons` | `((isActive: boolean) => ReactNode)[]` | — |
| `onNavigate` | `(page: string) => void` | — |
| `darkMode` / `fontScale` | — | `false` / `1` |

```
──────────────────────────────────────  borda superior 0,4px
│   [ic]   │   [ic]   │   [ic]   │
│  Início  │  Pedido  │   Conta  │      ativo #0B7566, inativo #5A6A72
└──────────┴──────────┴──────────┘
    1/3         1/3        1/3           cada aba com flex igual
```

**Aparência:** altura mínima 76, fundo branco, borda superior 1 px `#E5E1E6`. Aba ativa: pílula `#E2FAF6` e texto `#0B7566` peso 700. Inativa: texto `#5A6A72` peso 500. Rótulo 13 px. No iOS há padding extra para o home indicator. `NAVIGATION_BAR_HEIGHT` vale 76.

**Comportamento:** a função de ícone recebe `isActive` e deve devolver o ícone já colorido. Toque com `activeOpacity 0.7` chama `onNavigate(page)`.

### 8.7 Domínio (pedidos, ofertas, avaliação, chat)

#### `Order`

Resumo de um pedido.

| Prop | Tipo | Default |
|---|---|---|
| `order` | `{ id: number, title: string, createdAt: Date, itemList: OrderItem[], images?: string[] }` | — (obrigatória) |
| `backTarget` | `() => void` | — |

`OrderItem = { quantity: number, name: string }`.

```
┌─ Card ────────────────────────────────┐
│ ‹  Lavagem de 5 peças                 │  chevron 24px só com backTarget
│    Criado em 05/10/2026               │  Info, cinza
│ ↓ 16                                  │
│ ┌────┐┌────┐┌────┐  →                 │  Gallery, rola na horizontal
│ └────┘└────┘└────┘                    │
│ ↓ 16                                  │
│ Itens do pedido:                      │
│ 2x Camisa social                      │
│ ─────────────────                     │  separador do TextList
│ 1x Calça jeans                        │
└───────────────────────────────────────┘
```

**Aparência:** `Card` com três blocos separados por `gap-4` (16 px): cabeçalho com `Subtitle` do título — precedido por um `IconChevronLeft` de 24 px quando há `backTarget` — e, abaixo, `Criado em dd/mm/aaaa` em `Info`; a `Gallery` horizontal de imagens, quando houver; e o bloco de itens com `Text size="small"` "Itens do pedido:" seguido de um `TextList` no formato `"{quantidade}x {nome}"`.

**Comportamento:** com `backTarget`, o card passa a responder ao botão físico de voltar do Android e a um swipe da borda esquerda (origem até 48 px da borda, mais de 80 px de deslocamento ou velocidade acima de 0,6, com desvio vertical menor que 20 px). O `PanResponder` não captura o toque inicial, para não roubar o clique do chevron.

#### `Offer`

Card de oferta de um lavexer.

| Prop | Tipo | Default |
|---|---|---|
| `amount` | `number` | — (obrigatória) |
| `distance` | `number` | — (obrigatória) |
| `user` | `User` | — (obrigatória) |
| `amountLabel` | `string` | — (substitui o valor formatado) |
| `onClick` | `() => void` | — |

```
┌─ Card ────────────────────────────────┐
│ R$ 45                            3km  │  verde 20px ↔ Info cinza
│ ↓ 8                                   │
│ João Silva            ★★★★☆  4.5/5    │  nome ↔ estrelas 16px + nota
└───────────────────────────────────────┘
  ambas as linhas em space-between
```

**Aparência:** `Card` clicável com duas linhas. No topo, em `space-between`: o valor em verde `#059669`, `Text size="large"` (20 px), no formato `"R$ {amount}"` ou o `amountLabel` recebido; à direita, a distância `"{n}km"` em `Info`. Abaixo (margem 8), outra linha em `space-between` com o nome do usuário à esquerda e, à direita, estrelas de 16 px + `"4.5/5"` — ou `"Sem avaliações"` quando `totalRatings` é 0 (ou `rating` é 0, sem `totalRatings`).

#### `Stars`

Exibição somente leitura de uma nota.

| Prop | Tipo | Default |
|---|---|---|
| `rating` | `number` | — (obrigatória) |
| `size` | `number` | `24` |

```
★ ★ ★ ★ ☆     sem gap entre as estrelas; altura da linha = size
↑ douradas    ↑ cinza #E5E1E6 (a base aparece sempre, por baixo)
```

**Aparência:** linha de 5 estrelas de `size` px. Fundo sempre em cinza `#E5E1E6`; por cima, estrela cheia dourada `#FFD700` ou meia estrela dourada, conforme a nota. Altura da linha = `size`, sem gap entre as estrelas.

**Comportamento:** a nota é limitada a `[0, 5]` e arredondada para o meio ponto mais próximo.

#### `StarRating`

Avaliação interativa com meia estrela.

| Prop | Tipo | Default |
|---|---|---|
| `size` | `number` | `24` |
| `initialRating` | `number` | `0` |
| `onRatingChange` | `(rating: number) => void` | — |
| `disabled` | `boolean` | `false` |

```
★   ★   ★   ◐   ☆      gap 4 entre as estrelas (Grid de 5 colunas)
│ │                     cada estrela tem 2 áreas de toque:
└─┴─ metade esquerda = .5   |   metade direita = inteiro
```

**Aparência:** `Grid` de 5 colunas com `gap-1` (4 px), cada célula com uma estrela de `size` px — cinza `#E5E1E6` de base, com sobreposição dourada cheia ou meia conforme a seleção.

**Comportamento:** cada estrela tem duas áreas tocáveis (metade esquerda = `.5`, metade direita = inteiro). O componente mantém a nota em estado próprio a partir de `initialRating` (não é controlado por prop) e expõe prévia enquanto o toque está pressionado (`onPressIn`/`onPressOut`). Nota final limitada a `[0, 5]`.

#### `Message`

Bolha de mensagem do chat; delega para `MessageSent` ou `MessageReceived`.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `isOwn` | `boolean` | `false` |
| `timestamp` | `string` | hora atual `HH:MM` |
| `senderName` | `string` | `"You"` / `"Contact"` |
| `avatarUrl` | `string` | — |
| `userType` | `'client' \| 'provider' \| 'support'` | `'client'` |
| `showAvatar` | `boolean` | `true` |
| `showSenderName` | `boolean` | `true` (só afeta recebidas) |
| `isGrouped` | `boolean` | `false` |
| `avatarVariant` | `'image' \| 'headset'` | `'image'` |
| `onClick` | `() => void` | — |

```
enviada (isOwn: true) — alinhada à direita:
                  ┌────────────────────┐ ┌────┐
           14:32  │ Texto da mensagem  │ │ 👤 │   tudo alinhado pela BASE
                  └────────────────────┘ └────┘
                   #D7E7FA, ≤75%          40×40
                   canto inf. direito reto

recebida — espelhada:
┌────┐  João Silva
│ 👤 │  ┌────────────────────┐
└────┘  │ Texto da mensagem  │  14:32
  40×40 └────────────────────┘
         branco + borda, ≤75%
         canto inf. esquerdo reto
```

**Aparência — enviada (`isOwn: true`):** linha alinhada à direita e pela base, com gap 4: horário em cinza `#8F98AD` de 12 px, balão azul claro `#D7E7FA` com raio 12 (canto inferior direito reto, raio 4), padding 16/8, texto `#2D3B42` de 18 px, largura máxima 75%; e, à direita, coluna de avatar de 40×40 com margem esquerda 8.

**Aparência — recebida:** espelhada — avatar à esquerda (40×40, margem direita 8), depois coluna com o nome do remetente (`Text size="small"`, margem inferior 4) e o balão **branco** com borda 0,4 px `#E5E1E6`, raio 12 com canto inferior esquerdo reto (raio 4); o horário fica à direita do balão.

**Comportamento:** `isGrouped` reduz a margem superior de 8 para 2 px (mensagens consecutivas do mesmo remetente). `showAvatar: false` mantém a coluna de 40 px vazia, preservando o alinhamento. `avatarVariant: 'headset'` troca a foto por um círculo cinza `#E5E1E6` de 32 px com `IconHeadset` de 22 px em `#8F98AD` — usado no chat de suporte. Com `onClick`, toda a mensagem vira área tocável com `activeOpacity 0.7`.

### 8.8 Mídia e avisos

#### `Image`

| Prop | Tipo | Default |
|---|---|---|
| `src` / `alt` | `string` | obrigatórias |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` |
| `type` | `'default' \| 'circle'` | `'default'` |
| `onClick` | `() => void` | — |
| `darkMode` | `boolean` | `false` (ignorado) |

**Aparência:** quadrado de 24, 40, 64, 80, 96, 128 ou 256 px conforme o `size`, com `overflow: hidden`, `alignSelf: flex-start` e sem crescer/encolher. `type="circle"` aplica raio igual à metade do lado; `default` usa `rounded-lg` (8 px).

**Comportamento:** com `onClick` vira `TouchableOpacity` (`activeOpacity 0.7`) com `accessibilityRole="button"` e `accessibilityLabel={alt}`.

#### `Gallery`

| Prop | Tipo |
|---|---|
| `images` | `string[]` (obrigatória) |
| `onClick` | `(imageUrl: string, index: number) => void` |

```
┌────┐ ┌────┐ ┌────┐ ┌───
│ 80 │ │ 80 │ │ 80 │ │     →  rola na horizontal, sem barra
└────┘ └────┘ └────┘ └───
   gap 12        padding horizontal 4
```

**Aparência:** `ScrollView` horizontal sem barra de rolagem, padding horizontal 4 e gap 12 entre itens, cada um uma `Image` `md` (80×80) com raio 14.

#### `Alert`

Aviso em destaque dentro de um card.

| Prop | Tipo |
|---|---|
| `text` | `string` (obrigatória) |

```
┌─ Card ────────────────────┐
│           (!)             │  IconExclamation 48×48, centralizado
│ ↓ 16                      │
│   Texto do aviso em 18px, │  centralizado, quebra linha
│   centralizado            │
└───────────────────────────┘
```

**Aparência:** `Card` com duas linhas separadas por `gap-4`: `IconExclamation` (círculo com `!`) de 48×48 centralizado no topo, e abaixo o texto em `Text size="medium"` (18 px) centralizado. Não tem variantes de cor nem botão de fechar.

### 8.9 Fora de uso

#### `HelloWorld`

Componente de exemplo que renderiza o texto `"Hello World"`. **Não é exportado** no `index.ts` e não tem uso. Candidato a remoção.

---

### 8.10 Linguagem 2.0 — o que o código faz agora

Esta seção prevalece sobre qualquer descrição anterior do mesmo componente. `darkMode` continua aceita e é ignorada nos componentes reescritos.

**Tipografia.** Plus Jakarta Sans (400/500/600/700/800). Não há segunda família.

**`Button`.** `Pressable`, sem gluestack. Alturas: `xs` 36, `sm` 40, `md` 48, `lg` 52, `xl` 56. `default`, `primary` e `success` são fundo `#3CDBC0` e texto `#2D3B42`. Desabilitado: fundo `#E5E1E6`, texto `#5A6A72`. Variantes novas: `ghost` e `ghost-danger`. `needsConfirmation`, `style`, `textStyle`, `icon` e `fontScale` seguem o contrato antigo.

**`Input` e `TextArea`.** `TextInput` nativo. Campo 52 px, borda 1.5 `#869199`, raio 12, texto 16. Rótulo 14 px peso 600. Foco pinta a borda de `#0B7566` (outline na web). Erro em `#C62828`. Máscara, validação e Enter na web permanecem. `TextArea` tem altura mínima 120 e contador `"{n}/{max} caracteres"`.

**`Select`.** Gatilho com a caixa do `Input` (52 px, raio 12, borda 1.5 `#869199`). O modal de opções usa o `Modal` nativo. Não há provider de tema.

**Sem gluestack.** `Modal`, `Grid`, `Accordion`, `Image` e `Select` usam primitivos do React Native. A pasta `src/ui` foi removida, junto com `@gluestack-ui/*`, `gluestack-ui`, `@legendapp/motion`, `react-aria` e `react-stately`.

**`InputChat`.** Campo de 48 px com raio 24 e botão circular de 48 px em `#3CDBC0`. Vazio, o botão fica `#E5E1E6`. Não limpa o campo.

**`Message`.** Enviada: fundo `#2D3B42`, texto branco, raio 18 com canto inferior direito 4. Recebida: fundo `#E5E1E6`, sem borda, canto inferior esquerdo 4.

**`NavigationBar`.** Altura mínima 76. Aba ativa com pílula `#E2FAF6` e texto `#0B7566` peso 700. Inativa em `#5A6A72`. `NAVIGATION_BAR_HEIGHT` vale 76.

**`Tag`.** Preenchida, raio 12, texto 13 peso 700. Nomes `*-outline` permanecem. `primary`/`success`: fundo `#E2FAF6`, texto `#0B7566`. `danger`: `#FDECEC` / `#C62828`. `warning`: `#FFF4E5` / `#8A5A00`.

**`ProfileAvatar`.** `size` aceita os nomes antigos ou um número (diâmetro). Abaixo de 24, cai para 24.

**`Gallery`.** Itens de 80 px com raio 14.

**`AccordionItem`.** Props novas: `trailingAccessory` e `contentBackground`.

**Novos, todos exportados no `index.ts`.** `SearchInput`, `TopHeader`, `RadioCard` (callback `onSelect`), `CheckboxListItem`, `QuantityStepper`, `StatusBanner` (`info` | `dark`), `EmptyState`, `Timeline` (`TimelineStep.status`: `done` | `current` | `pending`), `ImageUploader` (não abre câmera; a tela chama `onAdd`), `AnimatedStatusIndicator` (reanimated; para se `active` é falso ou se o sistema pede reduzir movimento).

---

## 9. Ícones

Todos em `src/components/Icons/`, wrappers finos sobre `lucide-react-native` (SVG via `react-native-svg`). Contrato comum (`iconProps.ts`):

| Prop | Tipo | Default |
|---|---|---|
| `color` | `string` | `#2D3B42` (cinza escuro; cor de traço, preferida) |
| `fill` | `string` | — (alias legado de `color`; em `IconStar`/`IconStarHalf` também preenche a forma) |
| `size` | `number` | `24` (preferida) |
| `width` / `height` | `number` | — (fallback quando `size` não é passado) |
| `strokeWidth` | `number` | `2` |

Resolução: cor = `color ?? fill ?? '#2D3B42'`; tamanho = `size ?? width ?? height ?? 24`. Exceto nas estrelas, os ícones são **somente traço** (`fill: none`).

| Export | Glifo lucide | Uso típico |
|---|---|---|
| `IconStar` | `Star` | `Stars`, `StarRating` (preenche quando `fill` é passado) |
| `IconStarHalf` | `StarHalf` | meia estrela |
| `IconSend` | `Send` | `InputChat` |
| `IconHome` | `House` | aba Início |
| `IconHistory` | `History` | aba Histórico |
| `IconReceipt` | `Receipt` | aba Pedido |
| `IconProfile` | `User` | `ProfileAvatar` placeholder, aba Conta |
| `IconHeadset` | `Headset` | avatar do suporte no chat |
| `IconLoader` | `LoaderCircle` | estados de carregamento |
| `IconEye` / `IconEyeClosed` | `Eye` / `EyeOff` | `InputPassword` |
| `IconExclamation` | `CircleAlert` | `Alert` |
| `IconImage` | `Image` | anexos/fotos |
| `IconTrash` | `Trash2` | `Stepper`, `SwipeableListItem` |
| `IconPlus` / `IconMinus` | `Plus` / `Minus` | `Stepper` |
| `IconClose` | `X` | fechar |
| `IconCheck` | `Check` | confirmação |
| `IconCircle` / `IconCircleCheck` | `Circle` / `CircleCheckBig` | `CheckButton` |
| `IconSearch` | `Search` | busca |
| `IconFilter` | `ListFilter` | filtros |
| `IconMessage` | `MessageCircle` | chat |
| `IconArrowLeft` / `IconArrowRight` | `ArrowLeft` / `ArrowRight` | navegação |
| `IconChevronLeft` / `IconChevronRight` / `IconChevronDown` | `ChevronLeft` / `ChevronRight` / `ChevronDown` | `Order`, `Select`, listas |
| `IconEdit` | `Pencil` | edição |

Para adicionar um ícone: criar `src/components/Icons/Icon<Nome>.tsx` seguindo o padrão (importa o glifo, usa `resolveIconColor`/`resolveIconSize`, `strokeWidth` default), exportar no `index.ts` e registrar na tabela acima.

---

## 10. Camada `src/ui`

Removida na `1.0.1`. Os componentes usam `View`, `Pressable`, `TextInput`, `Image` e `Modal` do React Native. O `Image` público mede `2xs` 24, `xs` 40, `sm` 64, `md` 80, `lg` 96, `xl` 128 e `2xl` 256. `type="circle"` usa metade do lado como raio; `default` usa raio 8.

---

## 11. Utilitários `src/utils/*`

| Função | Assinatura | Comportamento |
|---|---|---|
| `getOrdersCountLabel` | `(ordersCount: number, userType: 'client' \| 'provider') => string` | `"{n} pedidos executados"` para `provider`, `"{n} pedidos feitos"` para `client` |
| `hasProfileImage` | `(profileImage?: string \| null) => boolean` | `true` só quando a string existe e não é só espaços |
| `getProfileImageUrl` | `(profileImage?: string \| null, _userType?) => string` | devolve a URL com `trim()`, ou string vazia. Não gera placeholder remoto — o fallback visual é o `ProfileAvatar` |

Nenhum utilitário é exportado no `index.ts`; são de consumo interno.

---

## 12. Dívidas técnicas conhecidas

1. **Sem testes e sem CI.** Não há runner, nenhum arquivo de teste e nenhum workflow de build/lint. Toda verificação é manual via `demo/` ou pelo app consumidor.
2. **Docs por componente removidas.** Permanecem `docs/README.md`, `docs/migracao-2.0.md` e `docs/prototipos/`. Este `CONTEXT.md` é a fonte canônica do contrato.
3. **`checklist.md` removido.** A lista antiga citava componentes que não existem (`TabBar`, `OrderList`, `OfferCard`).
4. **Escalas Tailwind antigas apontam para a paleta 2.0.** `primary-500` é `#3CDBC0`, não um azul. Nenhum componente usa essas classes; a cor da tela continua em `Constants.styles`.
5. **Dark mode parcial.** `MainTitle`, `Subtitle`, `Tag`, `FAB`, `Stepper`, `Stars`, `StarRating`, `Gallery`, `Alert`, `List`, `Message*`, `InputChat`, `Button`, `Input` e `TextArea` não reagem a `darkMode`. `Modal`, `Accordion`, `Select` (texto) e `Divider` ainda usam o tema claro/escuro. `FAB`, `Image` e `Grid` aceitam a prop e a descartam.
6. **`UserCardHorizontal` não é horizontal** — empilha os dados em coluna e não mostra avatar.
7. **`UserCardBio` não renderiza a `bio`**, embora o campo seja obrigatório no tipo.
8. **`OfferList` e `UserList` não passam `key`** no `GridItem` mapeado (o `key` do `OfferList` está no `Offer` interno, não no item da lista) e `OfferList` não repassa `amountLabel` nem `totalRatings`.
9. **`UserList` tem o `Divider` entre itens comentado** no código.
10. **`Grid.gap` não é pixel.** Cai em faixas de 4, 8, 12, 16, 24, 32 ou 48 px. Um valor como `5` vira 16 px.
11. **`Text` no `darkMode` ainda usa o azul `#4EA8FF` em `level="primary"`.** O tema claro já usa `#0B7566`. O app do prestador depende dessas cores escuras.
12. **`Alert` importa `Constants` e `Dimensions` sem usar**; `Modal` importa `Dimensions` via `useWindowDimensions` (ok) mas `Order` importa `Constants` para poucos usos.
13. **Pin por branch.** Os apps consomem `#main`, então qualquer merge aqui muda o pacote dos apps sem bump controlado.
14. **`HelloWorld`** permanece no repositório sem uso nem export.
15. **`StarRating` não é controlado** — ignora mudanças de `initialRating` após a montagem.
16. **`Stepper` e `CheckButton` seguem o desenho antigo.** Os equivalentes 2.0 são `QuantityStepper` e, na lista de peças, `Tag` mais `Button`. A troca na tela fica no app cliente.

---

## 13. Como manter este documento

Atualize o `CONTEXT.md` **no mesmo commit/branch** da alteração sempre que:

- criar, renomear ou remover um componente ou ícone;
- adicionar, remover ou mudar o default de uma prop;
- mudar a aparência (cor, raio, borda, espaçamento, tipografia, tamanho) ou o comportamento de um componente;
- alterar `src/constants/constants.ts` ou `tailwind.config.js`;
- adicionar ou remover dependência;
- criar ou quitar uma dívida técnica.

Descreva sempre o **código real**, não a intenção: comportamento indesejado vai documentado como é e registrado na seção de dívidas. Texto em pt-BR; nomes de código em inglês.

Se a mudança atravessa repositórios (ex.: componente novo consumido pelo `app-client-lavex`), atualize o `CONTEXT.md` de cada repositório tocado.
