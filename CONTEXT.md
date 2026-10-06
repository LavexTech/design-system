# CONTEXT — design-system (`lavex-design-system`)

Documento único de contexto técnico do design system da Lavex. Descreve **o código atual** do repositório `LavexTech/design-system`: tokens, padrões, bibliotecas, catálogo de componentes, contrato de props e descrição visual de cada um.

O objetivo é que este arquivo seja suficiente, sozinho, para entender **para que serve**, **como se parece quando renderizado**, **como se comporta** e **quais variantes tem** cada componente — sem abrir o código.

Versão de referência: `package.json` `0.2.15`. Data de referência do código: outubro de 2026.

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

Importante: o pacote é distribuído como **código-fonte TypeScript/TSX**, não como build. Existe um script `npm run build` (`tsc`, saída em `dist/`), mas ele **falha hoje** com 52 erros `TS2307` e, de qualquer forma, não é o que os apps consomem — o Metro do app compila `src/` diretamente (ver dívida 19). Por isso a config do Tailwind do app precisa incluir `node_modules/lavex-design-system` no `content`.

---

## 2. Stack e bibliotecas

| Item | Valor |
|---|---|
| Base | React `19.1.0`, React Native `0.81.4` (peer deps) |
| Expo | `expo ^54.0.12`, `expo-font >=14.0.0` (peer) |
| Estilo | NativeWind 4 (`nativewind ^4.2.1`, peer) + `tailwindcss ^3.4.18` + `StyleSheet` nativo |
| Primitivos de UI | `gluestack-ui ^3.0.7`, `@gluestack-ui/core ^3.0.10`, `@gluestack-ui/utils ^3.0.7`, `@gluestack-ui/accordion ^1.0.14` |
| Variantes de classe | `tailwind-variants ^0.1.20` (via `tva` do gluestack) |
| Ícones | `lucide-react-native ^1.31.0` + `react-native-svg ^15.13.0` (peer) |
| Animação | `Animated` da RN (maioria), `react-native-reanimated ~4.1.0`, `react-native-worklets ^0.5.1`, `@legendapp/motion ^2.4.0` (peer) |
| Gestos | `PanResponder` da RN (não usa `react-native-gesture-handler`) |
| Safe area | `react-native-safe-area-context ^5.6.1` (usado pelo `Modal`) |
| Acessibilidade web | `react-aria ^3.44.0`, `react-stately ^3.42.0` (transitivo do gluestack) |
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
    ui/                           # primitivos gluestack-ui (gerados/ajustados, uso interno)
    utils/                        # helpers puros
    assets/fonts/Roboto/          # TTFs da família Roboto
    fontSetup.ts                  # useFonts / useGlobalFonts
    global.css                    # apenas as 3 diretivas @tailwind
  docs/*.md                       # docs antigas por componente (parcialmente desatualizadas)
  demo/                           # app Expo de testes manuais
  README.md, DesignSystemUsage.md, checklist.md
```

---

## 4. Padrões e regras do repositório

### Estrutura e exportação

1. Um componente por pasta: `src/components/<Nome>/<Nome>.tsx`, export **nomeado** (`export const <Nome>`).
2. Todo componente público é reexportado em `index.ts`, agrupado por seção (`// Texts`, `// Inputs`, `// User Cards`, `// Lists`, `// Others`, `// Fonts`, `// Icons`). Componente fora do `index.ts` não existe para o app.
3. `src/ui/*` é **interno**: primitivos gluestack consumidos pelos componentes, nunca exportados direto para os apps.

### Estilo

4. A fonte de verdade de estilo é `src/constants/constants.ts` (importado como `Constants`). Valores numéricos/cores crus no `StyleSheet` são exceção; o padrão é `Constants.styles.*`.
5. A maioria dos componentes usa `StyleSheet.create` + `Constants`. NativeWind/Tailwind aparece apenas dentro de `src/ui/*` (primitivos gluestack) e em classes de grid/raio passadas por `className`.
6. Componentes que embrulham primitivos gluestack renderizam um `GluestackUIProvider` próprio (`Button`, `Input`, `TextArea`, `Select`, `Grid`, `Modal`, `Accordion`). Esse provider é uma `View` extra na árvore. Sem `style`, o default é `{ flex: 1, height: '100%', width: '100%' }`. `Button`, `Input`, `TextArea` e `Accordion` passam `hugContentStyle` (`flexGrow: 0`, `flexShrink: 0`, `alignSelf: 'stretch'`, `width: '100%'`). `Modal` passa `{ flex: 1, width: '100%', height: '100%' }` de propósito, para o overlay cobrir a tela.

### Texto e dimensão (regras transversais)

7. **Nada trunca.** Não existe um único `numberOfLines` ou `ellipsizeMode` em todo o `src/`. Todo texto longo **quebra linha** e faz o componente crescer em altura — nunca aparece reticência. Vale para nomes em cards de usuário, títulos de `Order`/`AccordionItem`, rótulos de `CheckButton`, opções de `Select` e balões de `Message`. Ao imaginar o layout, suponha sempre multi-linha, não corte.
8. **Fonte do texto é o Roboto embarcado.** Componentes próprios e `Button`, `Input`, `TextArea` e `Accordion` aplicam a família via `useResolvedFontFamily` (seção 7). O corte Bold neutraliza `fontWeight` do Tailwind para o negrito vir do arquivo `Roboto-Bold`.

### Props

9. Texto entra como prop `text: string`, não como `children`. `children` é reservado para composição (`Card`, `List`, `Modal`, `Accordion`, `SwipeableListItem`, `Grid`).
10. Callback de interação principal é `onClick` (não `onPress`), exceto em primitivos de baixo nível (`ProfileAvatar.onPress`, `Image.onClick`).
11. Props de tema/escala são opcionais e com default: `darkMode?: boolean = false`, `fontScale?: number = 1`. `fontScale` multiplica `fontSize`/`lineHeight`.
12. Identificadores de código em inglês; textos visíveis padrão e comentários voltados a humanos em pt-BR.

### Manutenção obrigatória

13. **Toda alteração em componente, prop, variante, token ou ícone deve atualizar este `CONTEXT.md` no mesmo conjunto de mudanças** (regra `.cursor/rules/context-md.mdc`). Em review de PR, `CONTEXT.md` desatualizado é achado bloqueante.
14. Toda alteração também exige bump de `version` no `package.json` (regra `.cursor/rules/version-bump.mdc`).

### Largura natural

Determina se dois componentes cabem lado a lado e se um bloco estica até as bordas do container.

| Comportamento | Componentes |
|---|---|
| **Largura total** (`width: 100%` ou `alignSelf: stretch`) | `Card`, `List`, `TextList`, `UserList`, `OfferList`, `Grid`, `Divider`, `Toggle`, `Stepper`, `NavigationBar`, `SwipeableListItem`, `InputChat`, `Message`, `Order`, `Info`, `Text` (com `fill: true`, o default) |
| **Mede pelo conteúdo** (`alignSelf: flex-start`) | `Tag`, `FAB`, `CheckButton`, `ProfileAvatar`, `Image`, `Text` com `fill={false}` |
| **Largura total, altura do conteúdo** (`hugContentStyle`) | `Button`, `Input`, `TextArea`, `Accordion`, `Grid`, `Select` |
| **Cobre a tela** (`flex: 1`) | `Modal` |

`Button`, `Input`, `TextArea` e `Accordion` passam `hugContentStyle` ao provider, no mesmo espírito do `Grid`. Dois `Button` empilhados numa coluna flexível ficam com a altura do próprio botão. `Modal` mantém `flex: 1` no wrapper porque o overlay precisa ocupar a tela; o `GluestackModal` interno também recebe `flex: 1`. O default do provider não foi invertido: um consumidor sem `style` ainda estica, e o `Modal` depende disso.

---

## 5. Design tokens — `src/constants/constants.ts`

Acessados como `Constants.styles.<grupo>.<CHAVE>`.

### Tipografia

| Grupo | Chave | Valor |
|---|---|---|
| `fontSize` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 36 / 24 / 20 / 18 / 14 |
| `lineHeight` | `LARGEST` / `LARGER` / `LARGE` / `MEDIUM` / `SMALL` | 30 / 26 / 22 / 18 / 14 |
| `fontWeight` | `BOLD` / `NORMAL` / `THIN` | `"700"` / `"400"` / `"100"` |
| `fontFamily` | `REGULAR`, `REGULAR_ITALIC`, `EXTRA_LIGHT`, `EXTRA_LIGHT_ITALIC`, `BOLD`, `BOLD_ITALIC` | `Roboto-Regular`, `Roboto-Italic`, `Roboto-ExtraLight`, `Roboto-ExtraLightItalic`, `Roboto-Bold`, `Roboto-BoldItalic` |

### Cores

| Grupo | Chave | Valor |
|---|---|---|
| `textColor` | `DEFAULT` | `#262627` (quase preto) |
| | `PRIMARY` | `#007AFF` (azul) |
| | `SUCCESS` | `#059669` (verde) |
| | `DANGER` | `#DC2626` (vermelho) |
| | `INFO` | `#8F98AD` (cinza azulado) |
| | `WARNING` | `#F59E0B` (âmbar) |
| `backgroundColor` | `WHITE` / `LIGHT_GRAY` / `GRAY` | `#FFFFFF` / `#F8F9FA` / `#E9ECEF` |
| `borderColor` | `LIGHT` / `MEDIUM` | `#DEE2E6` / `#CED4DA` |
| `color` | `WHITE` / `BLACK` | `#FFFFFF` / `#000000` |
| | `GOLD` | `#FFD700` (estrela preenchida) |
| | `GRAY` | `#E0E0E0` (estrela vazia, badge inativo) |
| | `BLUE` | `#007AFF` |
| | `MEDIUM_GRAY` | `#6C757D` |
| | `SOFT_BLUE` | `#D7E7FA` (balão de mensagem enviada) |
| | `PRIMARY_LIGHT` | `#3CDBC0` (verde-água da marca) |
| | `PRIMARY_DARK` | `#2D3B42` (grafite azulado da marca) |
| | `BACKGROUND_LIGHT` | `#E5E1E6` |
| `shadowColor` | `DEFAULT` | `#000` |

### Tema light/dark (`Constants.styles.theme`)

| Caminho | light | dark |
|---|---|---|
| `text.default` | `#262627` | `#F3F7FF` |
| `text.muted` | `#8F98AD` | `#B7C1D6` |
| `text.primary` | `#007AFF` | `#4EA8FF` |
| `background.surface` | `#FFFFFF` | `#121821` |
| `background.subtle` | `#F8F9FA` | `#1A2432` |
| `border.default` | `#DEE2E6` | `#2A364A` |

### Espaçamento, raio, borda e tamanhos

| Grupo | Chave | Valor |
|---|---|---|
| `spacing` | `TINY` / `SMALL` / `MEDIUM` / `LARGE` / `EXTRA_LARGE` | 4 / 8 / 16 / 24 / 32 |
| `borderRadius` | `SMALL` / `MEDIUM` / `LARGE` | 4 / 8 / 12 |
| `borderWidth` | `THIN` / `REGULAR` / `THICK` | 0.4 / 0.8 / 1.2 |
| `componentSize` | `BUTTON_HEIGHT` / `BUTTON_WIDTH` | 40 / 40 |
| | `INPUT_MIN_WIDTH` | 50 |
| | `NAVIGATION_BAR_HEIGHT` | 64 |
| `icon` | `SMALL` / `MEDIUM` | 16 / 20 |
| `opacity` | `LOW` / `MEDIUM` / `HIGH` | 0.5 / 0.7 / 0.9 |
| `maxWidth` | `messageBubble` | `"75%"` |
| `stepper` | `ICON_SIZE` | 16 |
| `gallery` | `CONTAINER_GAP` | 12 |

---

## 6. Paleta NativeWind/gluestack

Paralela aos tokens acima e usada **apenas** pelos primitivos `src/ui/*`. `tailwind.config.js` mapeia cada cor para uma CSS var (`rgb(var(--color-<nome>-<escala>)/<alpha>)`) e `src/ui/gluestack-ui-provider/config.ts` define os valores light/dark.

Escalas disponíveis: `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `typography`, `outline`, `background` (0–950), mais `background.error|warning|muted|success|info|light|dark`, `typography.white|gray|black` e `indicator.primary|info|error`.

Valores de referência no modo light (os mais presentes na UI):

| Token | light | dark |
|---|---|---|
| `primary-500` | `#333333` | `#E6E6E6` |
| `primary-600` | `#292929` | `#F0F0F0` |
| `secondary-500` | `#D9D9DB` | `#3F4040` |
| `success-500` | `#348352` | `#489766` |
| `error-500` | `#E63535` | `#EF4444` |
| `warning-500` | `#E77828` | `#FB954B` |
| `info-500` | `#0DA6F2` | `#32B4F4` |
| `typography-0` | `#FEFEFF` | `#171717` |
| `typography-900` | `#262627` | `#F5F5F5` |
| `background-0` | `#FFFFFF` | `#121212` |
| `outline-300` | `#D3D3D3` | `#747474` |
| `indicator-primary` | `#373737` | `#F7F7F7` |

Consequência prática: um `Button` "default" não é azul — o `primary` do gluestack é **grafite** (`#333333`). O azul da marca vive em `Constants.styles.textColor.PRIMARY` / `color.BLUE`.

Sombras nomeadas do Tailwind: `hard-1..hard-5` e `soft-1..soft-4` (todas em `rgba(38,38,38,0.1–0.2)`).

---

## 7. Tipografia e carregamento de fontes

Família única: **Roboto**, embarcada em `src/assets/fonts/Roboto/static/` nos cortes Regular, Italic, Bold, BoldItalic, ExtraLight e ExtraLightItalic.

`src/fontSetup.ts` exporta:

- `useFonts(fontNames?: string[])` — carrega sob demanda via `expo-font`, com cache em `Set` de módulo para não recarregar. Default: `["Roboto-Regular"]`. Retorna `ready: boolean`; em erro, loga e retorna `true` mesmo assim (degrada para a fonte do sistema).
- `useGlobalFonts()` — carrega todos os 6 cortes.
- `useResolvedFontFamily(fontName)` — devolve o nome da família quando o corte carregou, ou `undefined` antes disso.

Componentes de texto (`MainTitle`, `Title`, `Subtitle`, `Text`, `FAB`) chamam `useFonts` internamente e aplicam `fontFamily: undefined` enquanto a fonte não carregou, evitando o erro de família inexistente. `Info`, `Tag`, `NavigationBar` e os balões de `Message` aplicam `Roboto-Regular` direto, sem esperar o load.

`Button` (rótulo e confirmação), `Input`, `TextArea` e o título do `AccordionItem` usam `useResolvedFontFamily`: Regular no campo, Bold no botão e no título. Com a família Bold carregada, `fontWeight` fica `"normal"` para o negrito vir do arquivo estático (no Android, `fontWeight` não combina com família estática). `textStyle` do `Button` continua por último e vence o default. Os primitivos em `src/ui/*` seguem sem `fontFamily` na classe Tailwind; a família entra pelo `style` do componente.

---

## 8. Catálogo de componentes

Formato de cada entrada: **para que serve**, **contrato** (props), **aparência** (o que se vê) e **comportamento/variantes**.

### 8.1 Textos

#### `MainTitle`

Título principal de tela (o maior da hierarquia).

| Prop | Tipo | Default | Obrigatória |
|---|---|---|---|
| `text` | `string` | — | sim |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` | não |

**Aparência:** texto Roboto-Regular com `fontWeight` 700, `fontSize` 36 e `lineHeight` 36 (sem respiro extra entre linhas), cor `#262627`, alinhado conforme `position`, quebra linha (`flexWrap: wrap`, `flexShrink: 1`). Não tem margem nem padding próprios.

**Comportamento:** estático; não aceita `darkMode` nem `fontScale`.

#### `Title`

Título de seção.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |
| `darkMode` | `boolean` | `false` |
| `fontScale` | `number` | `1` |

**Aparência:** Roboto-Regular 700, `fontSize` e `lineHeight` iguais a `24 × fontScale`, cor `#262627` (light) ou `#F3F7FF` (dark). Quebra linha, sem margens.

#### `Subtitle`

Subtítulo / título de bloco dentro de um card ou lista.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `position` | `'left' \| 'center' \| 'right'` | `'left'` |

**Aparência:** Roboto-Regular 700, `fontSize`/`lineHeight` 20, cor `#262627`. Sem suporte a dark mode.

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

**Aparência:** Roboto-Regular peso 400, `lineHeight` `22 × fontScale`. Tamanhos: `small` 15, `medium` 18, `large` 20 (todos × `fontScale`). Cor por `level`: `default` `#262627` / `#F3F7FF` (dark), `primary` `#007AFF` / `#4EA8FF`, `success` `#059669`, `error` `#DC2626`, `warning` `#F59E0B`. Com `fill: true` (padrão) ocupa `width: 100%` — por isso, dentro de linhas (`flexDirection: row`), passe `fill={false}` para o texto medir pelo conteúdo.

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

**Aparência:** Roboto-Regular, `fontSize` `14 × fontScale`, `lineHeight` `19,6 × fontScale` (14 × 1.4). `tone="muted"`: cor `#8F98AD` (light) / `#B7C1D6` (dark) com `opacity: 0.7` — ou seja, visivelmente apagado. `tone="default"`: mesma cor do `Title` (`#262627` / `#F3F7FF`) e opacidade total. `bold` troca o peso para 700. Ocupa a largura disponível (`alignSelf: stretch`).

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

```
  Nome completo                             ← label (Text size=small, 15px)
┌────────────────────────────────┬────────┐
│ ←12→ valor digitado            │ [right]│ 48
└────────────────────────────────┴────────┘
  Email deve ter formato válido             ← só quando inválido (14px, vermelho)
```

**Aparência:** coluna (`Grid` 1 coluna, `gap-2`) com três blocos empilhados: label (`Text size="small"`), caixa do campo e mensagem de erro. A caixa é retangular de altura 48 (`size="xl"`), raio 8, borda 1 px `background-300` (`#D5D4D4`), fundo branco; texto digitado em `#262627`, `fontSize` `18 × fontScale`, padding horizontal 12, em `Roboto-Regular` (seção 7). Em dark mode o fundo vira `#1A2432` e a borda `#2A364A`. Inválido: borda vermelha `#DC2626` e, abaixo, a `errorMessage` em `Text size="small" level="error"`. Foco: borda `primary-700` (`#1F1F1F`) e, na web, ring interno.

**Comportamento:** aplica `mask` caractere a caractere, onde `X`/`x` são posições de dígito/letra e o resto é literal (máscara com letras A–Z ou dígitos é rejeitada com `console.warn`). Roda `validation` a cada digitação e via `useEffect` quando `value` muda. Na web, `onSubmitEditing` é disparado por `onKeyPress` com Enter (o `onSubmitEditing` nativo é desligado). `rightElement` é renderizado dentro da caixa, à direita.

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

**Aparência:** `Input` com `secureTextEntry` e, à direita dentro da caixa, um botão com ícone de olho de 24 px (`IconEye` quando a senha está visível, `IconEyeClosed` quando oculta) e padding de 16 horizontal / 8 vertical.

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
| `placeholder` | `string` | `"Enviar mensagem..."` |

```
┌──────────────────────────────────┐  ┌────┐
│ Enviar mensagem...               │  │ ➤  │  ← alinhados pela BASE
└──────────────────────────────────┘  └────┘
  flex: 1                        gap 8   ícone 20 + padding 8
```

**Aparência:** linha de largura total alinhada pela base, com gap 8: à esquerda o `Input` sem label ocupando o espaço restante (placeholder em `#E0E0E0`); à direita um botão quadrado de padding 8 e raio 12 com `IconSend` 20×20. O ícone fica azul `#007AFF` quando há texto e cinza `#6C757D` quando vazio; o botão inteiro cai para `opacity 0.5` quando desabilitado.

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

**Aparência:** label (`Text size="small"`) acima, caixa multilinha `size="xl"` com fundo branco, raio 8 e borda padrão do gluestack; texto `18 × fontScale` em `#262627`, em `Roboto-Regular` (seção 7). Com `maxLength`, abaixo e alinhado à direita aparece `"{n}/{max} caracteres"` em `Text size="small"`. Dark mode: fundo `#1A2432`, borda `#2A364A`.

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
  ao tocar → Modal com os CheckButton empilhados (gap 16) + botão "Voltar"
```

**Aparência:** label acima; gatilho em linha de altura mínima 48, fundo branco, raio 8, borda 0,8 px `#CED4DA`, padding horizontal 16, com o texto selecionado (ou o placeholder) à esquerda e um `IconChevronDown` à direita em `#8F98AD`, separado por 8. Com `errorMessage`, a borda vira `#DC2626` e a mensagem aparece embaixo em vermelho. Dark mode: fundo `#1A2432`, borda `#2A364A`, chevron `#B7C1D6`.

**Comportamento:** ao tocar, abre um `Modal` com botão "Voltar" (`default-outline`) listando as opções como `CheckButton` empilhados com gap 16, largura total; a opção atual aparece marcada. Selecionar fecha o modal e chama `onChange`. Desmarcar a opção já selecionada não faz nada. `triggerFontScale` escala **somente** o texto do gatilho (combinado com `fontScale`), útil para caber rótulos longos.

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
 │ foto │         │  👤  │   fundo #E9ECEF
 ╰──────╯         ╰──────╯   ícone a 45% do diâmetro, cor #8F98AD
```

**Aparência:** círculo de 32 (`2xs`), 40 (`xs`), 64 (`sm`) ou 80 px (`md`), com `overflow: hidden` e `alignSelf: flex-start`. Com imagem: a foto recortada em círculo. Sem imagem (nulo ou só espaços): fundo `#E9ECEF` (ou `#1A2432` no dark) com `IconProfile` centralizado em 45% do diâmetro, cor `#8F98AD` (ou `#B7C1D6`).

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
──────────────────────     ← 1px #DEE2E6, margem vertical 8
item 2
──────────────────────     ← nunca antes do primeiro item
item 3
```

**Aparência:** coluna de largura total; se houver `title`, um `Subtitle` no topo. Entre itens (nunca antes do primeiro), uma linha de 1 px `#DEE2E6` com margem vertical 8.

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

**Aparência:** container de largura total com `overflow: hidden`. Atrás do conteúdo, encostada à direita e ocupando toda a altura, uma faixa vermelha `#DC2626` de `deleteWidth` px com `IconTrash` branco de 20 px centralizado. O conteúdo fica por cima, fundo branco, com hairlines `#DEE2E6` no topo e na base, e desliza horizontalmente.

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

**Aparência:** retângulo de largura total, fundo branco (`#121821` no dark), raio 8, borda 0,4 px `#DEE2E6` (`#2A364A` no dark), padding 16 e margem inferior 8. Com `title`, um texto Roboto 700 de `14 × fontScale` em `#262627`, alinhado à esquerda, com 8 px abaixo. O conteúdo fica em uma `View` de largura total com `overflow: hidden`.

**Comportamento:** com `onClick` vira `TouchableOpacity` com `activeOpacity 0.7`; sem, é uma `View` inerte.

#### `Grid` / `GridItem`

Layout em colunas sobre o grid do gluestack.

| `Grid` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `columns` | `number` | `12` |
| `gap` / `gapX` / `gapY` | `number` | — |
| `darkMode` | `boolean` | `false` |

| `GridItem` | Tipo | Default |
|---|---|---|
| `children` | `ReactNode` | — (obrigatória) |
| `colSpan` | `number` | `1` |

**Aparência:** contêiner de largura total que não cresce nem encolhe (`flexGrow/flexShrink: 0`, `alignSelf: stretch`), distribuindo filhos em `columns` colunas. O `gap` **não é em pixels**: é mapeado para as classes Tailwind `gap-1|2|3|4|6|8|12` por faixas (`<=1 → gap-1`, `<=2 → gap-2`, `<=3 → gap-3`, `<=4 → gap-4`, `<=6 → gap-6`, `<=8 → gap-8`, acima → `gap-12`), ou seja, 4/8/12/16/24/32/48 px.

**Comportamento:** filhos que não são `GridItem` são embrulhados automaticamente com `col-span-1`. O `colSpan` é limitado a `columns`.

#### `Divider`

| Prop | Tipo | Default |
|---|---|---|
| `darkMode` | `boolean` | `false` |

**Aparência:** linha horizontal de largura total e altura 0,4 px, cor `#DEE2E6` (ou `#2A364A` no dark). Sem margens.

#### `Tag`

Etiqueta de status, sempre em contorno (não existe variante preenchida).

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `variant` | `'primary-outline' \| 'success-outline' \| 'danger-outline' \| 'warning-outline'` | `'primary-outline'` |
| `size` | `'default' \| 'sm'` | `'default'` |
| `fontScale` | `number` | `1` |
| `darkMode` | `boolean` | `false` (aceita mas ignora) |

**Aparência:** retângulo que mede pelo conteúdo (`alignSelf: flex-start`), fundo **transparente**, borda de 1 px e raio 4. `default`: padding 8 horizontal / 4 vertical e texto de `14 × fontScale`. `sm`: padding 6 horizontal / 2 vertical e texto de `11,9 × fontScale` (14 × 0,85). `lineHeight` sempre 1,3 × o tamanho da fonte. Texto Roboto-Regular peso 400, na mesma cor da borda: `#007AFF` (`primary-outline`), `#059669` (`success-outline`), `#DC2626` (`danger-outline`) ou `#F59E0B` (`warning-outline`).

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

**Aparência:** backdrop escurecido cobrindo a tela (toque fecha) e um cartão centralizado `size="md"` do gluestack. Altura máxima = altura da janela − 64 (altura da navigation bar) − safe area inferior; o corpo rola e é limitado a 70% desse máximo. Com `title`, cabeçalho com o texto centralizado (`Text`). Rodapé em linha com gap 8: só um botão alinhado à direita no modo simples; dois botões com `space-between` quando há `onConfirm` (cancelar à esquerda, confirmar à direita).

**Comportamento:** modo confirmação é ativado por passar `onConfirm`. Nele, se `buttonText` ainda for o default `'OK'`, o botão esquerdo vira `"Cancelar"`, e um `buttonVariant` `'default'` vira `'default-outline'`. `handleConfirm` chama `onConfirm` e, com `closeOnConfirm` (padrão), também `onClose`. Usa `useRNModal`, então funciona sobre qualquer stack de navegação. O `GluestackUIProvider` do modal recebe `flex: 1` de propósito para o backdrop cobrir a tela.

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
| `darkMode` / `fontScale` | — | `false` / `1` |

```
┌──────────────────────────────────────────────┐
│ [leading] Título  [titleAccessory]      ⌄    │  chevron colado na direita
└──────────────────────────────────────────────┘
  children (quando expandido)
───────────────────────────────────────────────  Divider após cada item
```

**Aparência:** lista de cabeçalhos sobre fundo branco (`#121821` no dark). Cada cabeçalho é uma linha de largura total: opcional `leading` (margem direita 8), título `18 × fontScale` em `#262627` e em negrito (`Roboto-Bold`), `titleAccessory` colado ao título com gap 8, e na extremidade direita um chevron (para cima quando aberto, para baixo quando fechado). Abaixo de cada item, um `Divider`.

**Comportamento:** `type="single"` e colapsável — abrir um item fecha o outro, e o aberto pode ser fechado. A transição usa `LayoutAnimation` easeInEaseOut de 300 ms (habilitada explicitamente no Android).

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

**Aparência base:** retângulo de cantos levemente arredondados (raio 4), conteúdo em linha centralizado com gap 8. Altura e padding por `size`: `xs` 32/14, `sm` 36/16, `md` 40/20, `lg` 44/24, `xl` 48/28 px. Texto em `Roboto-Bold` (aparência de negrito), tamanho `text-base` (16) no `md`. Desabilitado: `opacity 40%`.

**Variantes:**

| Variante | Fundo | Texto | Borda |
|---|---|---|---|
| `default` | `#333333` (primary-500) | branco (`typography-0`) | — |
| `default-outline` | transparente | `#333333` | 1 px primary-300 |
| `success` | `#348352` (success-500) | branco | — |
| `success-outline` | transparente | `#333333` (não verde — ver dívidas) | 1 px success-300 |
| `danger` | `#DC2626` | branco | 1 px `#DC2626` |
| `danger-outline` | transparente | `#DC2626` | 1 px `#DC2626` |
| `primary` | `#2D3B42` | `#3CDBC0` | 1 px `#2D3B42` |
| `secondary` | `#2D3B42` | `#E5E1E6` | 1 px `#2D3B42` |
| `secondary-outline` | `#E5E1E6` | `#2D3B42` | 1 px `#2D3B42` |

`primary`, `secondary` e `secondary-outline` são as variantes com a identidade visual da marca (grafite + verde-água). `default` e `success` herdam a paleta do gluestack.

Em dark mode, `default` e `default-outline` passam a fundo `#1A2432`/transparente, borda `#2A364A` e texto `#F3F7FF`. `fontScale` ≠ 1 ajusta o texto para `18 × fontScale`.

**Estados `hover` e `active`** (relevantes na web; no mobile só o `active` aparece, durante o toque):

| Variante | Normal | Hover | Active |
|---|---|---|---|
| `default` | `#333333` | `#292929` | `#1F1F1F` |
| `success` | `#348352` | `#2A7948` | `#206F3E` |
| `default-outline` / `success-outline` | transparente | fundo `#F6F6F6` (`background-50`) | volta a transparente |

Ressalva importante: as variantes `primary`, `secondary`, `secondary-outline`, `danger` e `danger-outline` definem `backgroundColor` por `style` **inline**, que vence o `className` do NativeWind. Nessas cinco **não há** mudança nenhuma de hover/active — o botão fica visualmente estático até o toque ser solto.

**Comportamento:** com `icon`, o nó é posicionado em `position: absolute` a 16 px da esquerda, e o texto continua centralizado. Com `needsConfirmation`, o botão deixa de usar o primitivo gluestack e vira um `Pressable` próprio (altura mínima 40, raio 8, padding 16/8, texto bold centralizado): o primeiro toque troca o rótulo para `confirmationText` e anima fundo, borda e texto para vermelho `#DC2626`/branco em 300 ms; o segundo toque dispara `onClick`. Sem o segundo toque, volta ao estado original após **8 segundos**. Pressionado reduz a opacidade para 0,85; desabilitado, 0,5.

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

**Aparência:** pílula retangular de raio 8, borda 1,2 px, fundo branco, que mede pelo conteúdo (`alignSelf: flex-start`). No estado normal (`isLocked: false`): borda e texto pretos, padding esquerdo ~28 px para acomodar um badge circular de 15,4 px a 5 px da borda esquerda — verde `#059669` com `IconCircleCheck` branco quando `checked`, cinza `#E0E0E0` com `IconCircle` preto quando não. Texto Roboto 14,4 px centralizado. No estado travado (`isLocked: true`): o badge some, o padding encolhe para ~4,8 px, a fonte cai para 11,5 px e borda e texto assumem `lockedColor`.

**Comportamento:** a troca de `isLocked` é **instantânea** (`setValue`, sem animação), embora os valores sejam interpolados. O toque chama `onClick(!checked)` e `onTap(!checked)` — o componente é controlado, não guarda estado. Desabilitado fica com `opacity 0.7`; pressionado, 0,9. Expõe `accessibilityRole="button"` e `accessibilityState={{ checked, disabled }}`.

#### `FAB`

Botão de ação flutuante com rótulo (pílula), não circular.

| Prop | Tipo | Default |
|---|---|---|
| `text` | `string` | — (obrigatória) |
| `onClick` | `() => void` | — (obrigatória) |
| `disabled` | `boolean` | `false` |
| `darkMode` | `boolean` | `false` (ignorado) |

**Aparência:** pílula verde `#059669` de raio 999, padding 16 horizontal e 12 vertical, texto branco Roboto-Regular 18 px (`lineHeight` 22), sombra preta deslocada 2 px para baixo (`opacity 0.22`, raio 4, `elevation 4`). Mede pelo conteúdo (`alignSelf: flex-start`). O posicionamento flutuante é responsabilidade do app — o componente não se posiciona sozinho.

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

**Aparência:** linha de largura total: botão de lixeira opcional de 40×40 (borda 0,4 px, raio 8, margem direita 8), rótulo flexível (`Text` 18 px), valor alinhado à direita em uma coluna de 30 px (52 px quando há `valueSuffix`) e, encostado na direita, o par de botões de 40×40 unidos — o esquerdo com `IconMinus` e cantos arredondados só à esquerda, o direito com `IconPlus` e cantos só à direita, sem borda entre eles. Ícones de 16 px, fundo branco, borda `#CED4DA`. Botão no limite: fundo `#E9ECEF` e `opacity 0.5`.

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
│  Início  │  Pedido  │   Conta  │      ativo #007DFF, inativo #8F98AD
└──────────┴──────────┴──────────┘
    1/3         1/3        1/3           cada aba com flex igual
```

**Aparência:** linha de largura total com fundo branco (`#121821` no dark) e borda superior de 0,4 px `#DEE2E6` (`#2A364A`). Cada aba ocupa fração igual, centralizada, com ícone opcional acima (margem inferior 2) e rótulo Roboto-Regular de `15 × fontScale` (`lineHeight` `18 × fontScale`). Ativa em azul `#007DFF`, inativa em `#8F98AD`. Padding vertical 4 px, exceto no iOS: 10 px no topo e 14 px na base (acomoda o home indicator). Altura de referência para cálculos de layout: `Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT` = 64.

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
↑ douradas    ↑ cinza #E0E0E0 (a base aparece sempre, por baixo)
```

**Aparência:** linha de 5 estrelas de `size` px. Fundo sempre em cinza `#E0E0E0`; por cima, estrela cheia dourada `#FFD700` ou meia estrela dourada, conforme a nota. Altura da linha = `size`, sem gap entre as estrelas.

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

**Aparência:** `Grid` de 5 colunas com `gap-1` (4 px), cada célula com uma estrela de `size` px — cinza `#E0E0E0` de base, com sobreposição dourada cheia ou meia conforme a seleção.

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

**Aparência — enviada (`isOwn: true`):** linha alinhada à direita e pela base, com gap 4: horário em cinza `#8F98AD` de 12 px, balão azul claro `#D7E7FA` com raio 12 (canto inferior direito reto, raio 4), padding 16/8, texto `#262627` de 18 px, largura máxima 75%; e, à direita, coluna de avatar de 40×40 com margem esquerda 8.

**Aparência — recebida:** espelhada — avatar à esquerda (40×40, margem direita 8), depois coluna com o nome do remetente (`Text size="small"`, margem inferior 4) e o balão **branco** com borda 0,4 px `#DEE2E6`, raio 12 com canto inferior esquerdo reto (raio 4); o horário fica à direita do balão.

**Comportamento:** `isGrouped` reduz a margem superior de 8 para 2 px (mensagens consecutivas do mesmo remetente). `showAvatar: false` mantém a coluna de 40 px vazia, preservando o alinhamento. `avatarVariant: 'headset'` troca a foto por um círculo cinza `#E9ECEF` de 32 px com `IconHeadset` de 22 px em `#8F98AD` — usado no chat de suporte. Com `onClick`, toda a mensagem vira área tocável com `activeOpacity 0.7`.

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

**Aparência:** `ScrollView` horizontal sem barra de rolagem, padding horizontal 4 e gap 12 entre itens, cada um uma `Image` `md` (80×80) com raio 8.

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

## 9. Ícones

Todos em `src/components/Icons/`, wrappers finos sobre `lucide-react-native` (SVG via `react-native-svg`). Contrato comum (`iconProps.ts`):

| Prop | Tipo | Default |
|---|---|---|
| `color` | `string` | `#262627` (cor de traço, preferida) |
| `fill` | `string` | — (alias legado de `color`; em `IconStar`/`IconStarHalf` também preenche a forma) |
| `size` | `number` | `24` (preferida) |
| `width` / `height` | `number` | — (fallback quando `size` não é passado) |
| `strokeWidth` | `number` | `2` |

Resolução: cor = `color ?? fill ?? '#262627'`; tamanho = `size ?? width ?? height ?? 24`. Exceto nas estrelas, os ícones são **somente traço** (`fill: none`).

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

## 10. Camada interna `src/ui/*`

Primitivos do gluestack-ui (gerados pelo CLI e ajustados). Não são exportados para os apps.

| Módulo | O que provê |
|---|---|
| `gluestack-ui-provider/` | `GluestackUIProvider` + `config.ts` com as CSS vars light/dark. Sem `style`, aplica `{ flex: 1, height: '100%', width: '100%' }` |
| `button/` | `Button`, `ButtonText`, `ButtonIcon`, `ButtonSpinner`, `ButtonGroup` com variantes `solid/outline/link` × `primary/secondary/positive/negative` |
| `input/` | `Input`, `InputField`, `InputIcon`, `InputSlot`, variantes `outline/underlined/rounded` e tamanhos `sm/md/lg/xl` |
| `textarea/` | `Textarea`, `TextareaInput` |
| `modal/` | `Modal`, `ModalBackdrop`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter` |
| `accordion/` | primitivos do `@gluestack-ui/accordion` |
| `grid/` | `Grid`/`GridItem` com cálculo responsivo de colunas (versões nativa e web) |
| `icon/` | `Icon` + glifos usados pelo accordion (`ChevronUpIcon`, `ChevronDownIcon`) |
| `image/` | `Image` + `NATIVE_IMAGE_SIZE_PX` (`2xs` 24, `xs` 40, `sm` 64, `md` 80, `lg` 96, `xl` 128, `2xl` 256) |

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
2. **Docs antigas divergentes.** `docs/` ainda tem `Title1.md`, `Title2.md`, `Title3.md` e `InputToolbar.md` de componentes que não existem mais, e não tem doc para `Toggle`, `Divider`, `Tag`, `FAB`, `Card`, `Text`, `Subtitle`, `SwipeableListItem`, `ProfileAvatar` e `Message*` parcialmente. Este `CONTEXT.md` é a fonte canônica; `docs/` é histórico.
3. **`checklist.md` obsoleto.** Lista quase tudo como não implementado e cita componentes inexistentes (`TabBar`, `OrderList`, `OfferCard`).
4. **Dois sistemas de cor paralelos.** `Constants.styles` (hex, usado por quase todos os componentes) e a paleta semântica NativeWind/gluestack (CSS vars, usada por `src/ui/*`) não conversam. Por isso `Button variant="default"` é grafite enquanto o azul da marca está em `textColor.PRIMARY`.
   - Efeito colateral no `Button`: o compound variant `outline + positive` do gluestack usa `text-primary-500`, então `success-outline` tem borda verde e **texto grafite** `#333333`. `danger-outline` escapa disso porque o componente sobrescreve a cor do texto explicitamente.
5. **Dark mode parcial.** `MainTitle`, `Subtitle`, `Tag`, `FAB`, `Stepper`, `Stars`, `StarRating`, `Gallery`, `Alert`, `List`, `Message*` e `InputChat` não reagem a `darkMode`; `FAB` e `Image` aceitam a prop e a descartam explicitamente (`void darkMode`).
6. **`UserCardHorizontal` não é horizontal** — empilha os dados em coluna e não mostra avatar.
7. **`UserCardBio` não renderiza a `bio`**, embora o campo seja obrigatório no tipo.
8. **`OfferList` e `UserList` não passam `key`** no `GridItem` mapeado (o `key` do `OfferList` está no `Offer` interno, não no item da lista) e `OfferList` não repassa `amountLabel` nem `totalRatings`.
9. **`UserList` tem o `Divider` entre itens comentado** no código.
10. **`Grid.gap` não é pixel.** É convertido em faixas para classes Tailwind, então valores intermediários são arredondados para baixo na faixa.
11. **`GluestackUIProvider` aninhado.** Vários componentes criam o próprio provider, gerando `View`s extras e múltiplos `OverlayProvider`/`ToastProvider` na árvore quando se aninham (ex.: `Select` dentro de `Grid` dentro de `Input`).
12. **`Alert` importa `Constants` e `Dimensions` sem usar**; `Modal` importa `Dimensions` via `useWindowDimensions` (ok) mas `Order` importa `Constants` para poucos usos.
13. **Pin por branch.** Os apps consomem `#main`, então qualquer merge aqui muda o pacote dos apps sem bump controlado.
14. **`HelloWorld`** permanece no repositório sem uso nem export.
15. **`StarRating` não é controlado** — ignora mudanças de `initialRating` após a montagem.
18. **Hover/active mortos em cinco variantes do `Button`.** `primary`, `secondary`, `secondary-outline`, `danger` e `danger-outline` definem `backgroundColor` por `style` inline, que vence o `className`; os estados `data-[hover]`/`data-[active]` do gluestack não têm efeito nelas.
19. **`npm run build` falha.** O `tsc` acusa 52 erros `TS2307` ("Cannot find module") em `src/ui/*` e em `src/components/Input/Input.tsx`, porque o `tsconfig.json` usa `moduleResolution: "node"`, que não entende os subpath exports dos pacotes `@gluestack-ui/*` (`@gluestack-ui/utils/nativewind-utils`, `@gluestack-ui/core/*/creator`). Passa despercebido porque nada no repositório roda o build e os apps compilam `src/` pelo Metro. Correção provável: `moduleResolution: "bundler"`.

---

## 13. Como manter este documento

Atualize o `CONTEXT.md` **no mesmo commit/branch** da alteração sempre que:

- criar, renomear ou remover um componente ou ícone;
- adicionar, remover ou mudar o default de uma prop;
- mudar a aparência (cor, raio, borda, espaçamento, tipografia, tamanho) ou o comportamento de um componente;
- alterar `src/constants/constants.ts`, `tailwind.config.js` ou `src/ui/gluestack-ui-provider/config.ts`;
- adicionar ou remover dependência;
- criar ou quitar uma dívida técnica.

Descreva sempre o **código real**, não a intenção: comportamento indesejado vai documentado como é e registrado na seção de dívidas. Texto em pt-BR; nomes de código em inglês.

Se a mudança atravessa repositórios (ex.: componente novo consumido pelo `app-client-lavex`), atualize o `CONTEXT.md` de cada repositório tocado.
