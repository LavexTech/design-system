# CONTEXT — design-system (`lavex-design-system`)

Contexto técnico e de negócio do design system da Lavex, escrito para quem desenvolve aqui, humano ou agente de código. Descreve **o código atual** do repositório `LavexTech/design-system` (versão `1.16.x`, outubro de 2026), não a intenção.

Este arquivo é o ponto de entrada. O detalhe está em `context/`, dividido para que cada arquivo fique abaixo de 100 kB:

| Arquivo | Leia quando for… |
|---|---|
| [`CONTEXT.md`](./CONTEXT.md) (este) | entender o produto, a estrutura, os padrões e o fluxo de trabalho |
| [`context/tokens-e-tema.md`](./context/tokens-e-tema.md) | mexer em cor, tema claro/escuro, tamanhos, raios, fontes, `tailwind.config.js` |
| [`context/componentes-base.md`](./context/componentes-base.md) | usar ou alterar textos, campos, botões, steppers, `TopHeader`, `NavigationBar`, `CountBadge` |
| [`context/componentes-estrutura-e-dominio.md`](./context/componentes-estrutura-e-dominio.md) | usar ou alterar contêineres, `Modal`, listas, caixas de status, `Timeline`, imagens, cards de usuário, estrelas, pedido, oferta e chat |
| [`context/icones-e-utils.md`](./context/icones-e-utils.md) | usar ou criar ícones; utilitários internos |
| [`context/consumidores.md`](./context/consumidores.md) | medir o impacto de uma mudança nos apps; protótipos 2.0 |
| [`context/dividas-tecnicas.md`](./context/dividas-tecnicas.md) | saber o que está torto de propósito antes de "consertar" |

Outros documentos: `docs/migracao-2.0.md` (impacto da linguagem 2.0 nos apps), `docs/prototipos/` (especificação visual 2.0 em HTML), `docs/tema-escuro/refinamento.md` (planejamento da issue #280). `README.md` e `DesignSystemUsage.md` estão desatualizados (ver dívida 4).

---

## 1. O produto e o papel deste repositório

A **Lavex** conecta pessoas que precisam lavar e/ou passar roupas a prestadores que fazem isso como renda extra.

### 1.1 Personas

| Persona | Nome no código e na UI | App | Tema |
|---|---|---|---|
| Cliente: quem pede lavagem/passadoria | `client` | `app-client-lavex` | claro (linguagem 2.0) |
| Prestador: quem lava e passa | `provider`, na UI **"Lavexer"** | `app-provider-lavex` | escuro planejado (#280); hoje ainda na linguagem antiga |
| Suporte Lavex | `support` | chat dentro dos apps | — |

O mesmo usuário pode ser cliente e Lavexer; o tema escuro existe para deixar claro em qual app ele está. Os dois apps falam com a `lavex-api`. Este repositório não tem backend, banco nem chamadas HTTP: é só UI.

### 1.2 Ciclo de vida do pedido (regras de negócio que a UI representa)

```
(novo) ──POST /orders──▶ PENDING ──cliente escolhe──▶ OFFER_CHOSEN ──Lavexer topa──▶ PROVIDER_ACCEPTED ──cliente paga──▶ ACCEPTED ──Lavexer inicia──▶ STARTED ──▶ READY ──cliente confirma retirada──▶ COMPLETED ──▶ avaliação obrigatória
                           ▲                        │                                │
                           └── "Não consigo" / "Escolher outra oferta" ──────────────┘   (cliente cancela até ACCEPTED ──▶ CANCELLED)
```

- O cliente tem **um pedido ativo por vez** (`PENDING`, `OFFER_CHOSEN`, `PROVIDER_ACCEPTED`, `ACCEPTED`, `STARTED` ou `READY`). Sem pedido ativo, a aba Pedido abre o assistente de novo pedido; com pedido `COMPLETED` sem nota, exige a avaliação antes de outro pedido.
- **Novo pedido**: o cliente escolhe peças de um catálogo (Roupa, Cama, Mesa, Banho), define quantidade e serviço por peça (Lavar e/ou Passar), anexa fotos opcionais e escolhe a entrega: `CLIENT` (leva e busca), `FLEX` (avalia pagar coleta) ou `PROVIDER` (a Lavexer busca e entrega).
- **Ofertas**: Lavexers enviam ofertas (valor + taxa de coleta, distância, nota). O cliente ordena (menor/maior valor, distância, melhor avaliação), vê as avaliações da Lavexer numa `Drawer`, escolhe uma e conversa com ela no chat. Depois que a Lavexer topa, o cliente confirma e paga com **Pix** ou **cartão** salvo. A oferta só vale quando o pagamento é aprovado.
- **Acompanhamento**: linha do tempo do pedido, chat com a Lavexer e com o suporte, aviso quando está pronto para retirada/entrega.
- **Avaliação**: nota de 1 a 5 e comentário. A nota média aparece no perfil (`ShortStarRating`, "Nota média dada pelos Lavexers").
- **Conta**: perfil com foto e bio, contato, endereço, carteira de cartões, mensagem de boas-vindas (Lavexer), chave Pix (Lavexer), excluir conta.

Rótulos de status no app do cliente: `PENDING` "Pendente", `ACCEPTED` "Aguardando sua entrega", `STARTED` "Em execução", `COMPLETED` "Concluído" (`Tag success-outline`), `CANCELLED` "Cancelado" (`Tag danger-outline`). Detalhes de fluxo, endpoints e regras ficam no `CONTEXT.md` de `app-client-lavex` e da `lavex-api`.

### 1.3 Fluxos de usuário e os componentes que os servem

| Fluxo | Componentes principais |
|---|---|
| Entrar, cadastrar, recuperar senha | `TopHeader`/`MainTitle`, `Input`, `InputEmail`, `InputPassword`, `InputName`, `InputCPF`, `InputPhone`, `Button`, `Modal` |
| Navegação por abas (Pedido, Histórico, Conta) | `NavigationBar` + `IconHome`/`IconReceipt`/`IconUserRound`, `CountBadge` |
| Novo pedido: peças | `SearchInput`, `Accordion`, `CheckboxListItem`, `QuantityStepper`, `SwipeableListItem`, `Tag`, `Button` |
| Novo pedido: fotos e entrega | `ImageUploader`, `PhotoSkeleton`, `TextArea`, `RadioCard` |
| Aguardando e escolhendo ofertas | `DarkInformationBoxLarge` (`animated`), `Offer`/card do app, `ShortStarRating`, `ProfileAvatar`, `RadioCard`, `Toggle` |
| Pagamento | `SimpleTable`, `PaymentButton`, `ErrorBox`, `Input` (código Pix), `Button` |
| Pedido em andamento / pronto | `DarkInformationBox`, `Timeline`, `Button` (`secondary`, `link`), `Modal` (`stackedButtons`) |
| Concluído, cancelado, avaliação | `DarkInformationBoxLarge`, `TextArea`, estrelas |
| Chat | `Message`, `InputChat` (o cliente hoje usa componentes próprios), `IconMessageSquare`, `IconHeadset` |
| Histórico | `Tag`, `Subtitle`, `EmptyState` |
| Conta | `UserCardBio`, `UserInfo`, `IconButtonLarge`, `Heading`, `ProfileAvatar`, `Input` (`disabled`), `CheckboxListItem` (carteira) |

O mapa arquivo-a-arquivo de cada app está em [`context/consumidores.md`](./context/consumidores.md).

---

## 2. O que é o pacote

Biblioteca de componentes **React Native** (os apps também rodam na web via react-native-web), publicada como `lavex-design-system` e instalada direto do GitHub:

```json
"lavex-design-system": "github:LavexTech/design-system#<branch-ou-sha>"
```

- **Entrypoint único:** `index.ts` na raiz (`main` e `react-native` apontam para ele). Componente fora do `index.ts` não existe para os apps.
- **Distribuído como código-fonte TS/TSX.** O Metro do app compila `src/`. `npm run build` (`tsc`) gera `dist/` com `.d.ts`, mas os apps não usam.
- **Arquivos publicados** (`files`): `src/`, `docs/`, `context/`, `CONTEXT.md`, `README.md`, `index.ts`, `babel.config.js`, `tailwind.config.js`, `nativewind-env.d.ts`, `react-native.config.js`, `metro.config.js`.
- **O que o `index.ts` exporta:** 67 componentes (contando `GridItem` e `AccordionItem`), 45 ícones, o tema (`LavexThemeProvider`, `useLavexTheme`, `lightColors`, `darkColors` + tipos) e `useFonts`. `Constants` e `src/utils/*` **não** são exportados.

### 2.1 Stack

| Item | Valor |
|---|---|
| Base | React `19.1.0`, React Native `0.81.4` (peers) |
| Expo | `expo ^54`, `expo-font >=14` (peer) |
| Estilo | `StyleSheet` nativo + `Constants` + `useLavexTheme()`. NativeWind 4 / Tailwind 3 só na toolchain (`babel.config.js`, `demo/`) |
| Ícones | `lucide-react-native ^1.31.0` (import por subpath) + `react-native-svg ^15` (peer) |
| Animação | `Animated` da RN; `react-native-reanimated ~4.1` (peer) + `react-native-worklets` (`ImageUploader`, `AnimatedStatusIndicator`) |
| Gestos | `PanResponder` da RN (não usa `react-native-gesture-handler`) |
| Safe area | `react-native-safe-area-context` (só o `Modal`) |
| Linguagem | TypeScript `~5.9`, `strict`, `jsx: react-native`, `moduleResolution: bundler` |
| Testes / CI | **nenhum** |

---

## 3. Estrutura de pastas

```
design-system/
  index.ts                          # barrel ÚNICO de exportação pública, por seções
  CONTEXT.md                        # este arquivo (entrada do contexto)
  context/                          # contexto detalhado, um arquivo por assunto
  CLAUDE.md, AGENTS.md              # ponteiros para agentes de código
  .cursor/rules/design-system-context.mdc   # regra do Cursor: manter o contexto atualizado
  package.json                      # versão, peers; scripts build/typecheck/dev
  tsconfig.json                     # rootDir src/, strict, alias @/*
  babel.config.js                   # babel-preset-expo + nativewind/babel + module-resolver + worklets
  metro.config.js, react-native.config.js, nativewind-env.d.ts
  tailwind.config.js                # paleta em hex (sem uso pelos componentes)
  src/
    components/<Nome>/<Nome>.tsx    # 1 pasta por componente, arquivo com o mesmo nome
    components/Message/MessageSent.tsx, MessageReceived.tsx   # partes internas do Message
    components/Icons/Icon*.tsx      # wrappers de lucide-react-native
    components/Icons/iconProps.ts   # contrato e resolução de cor/tamanho dos ícones
    constants/constants.ts          # Constants.styles: tokens de tamanho, fonte e cores fixas
    theme/tokens.ts                 # ThemeColors, lightColors, darkColors
    theme/LavexThemeProvider.tsx    # LavexThemeProvider, useLavexTheme
    utils/                          # helpers internos (reduceMotion, profileImage, ordersCountLabel)
    fontSetup.ts                    # useFonts, useGlobalFonts, useResolvedFontFamily
    assets/fonts/PlusJakartaSans/static/  # TTF Regular, Medium, SemiBold, Bold
    global.css                      # 3 diretivas @tailwind
  docs/
    migracao-2.0.md                 # impacto da 2.0 nos apps
    prototipos/                     # 21 telas HTML do app do cliente (especificação visual)
    tema-escuro/                    # refinamento da #280 e prints do demo
  demo/                             # app Expo (expo-router) de vitrine e teste manual
    app/index.tsx                   # vitrine de todos os componentes, toggle "Tema escuro"
```

Não há camadas de backend (repositories, services, entidades, endpoints) neste repositório. A "arquitetura" é: **tokens → tema → componentes primitivos → componentes compostos → `index.ts`**. Componentes compostos importam outros componentes por caminho relativo (`../Card/Card`), nunca pelo `index.ts`.

---

## 4. Padrões do código

### 4.1 Estrutura e exportação

1. Um componente por pasta: `src/components/<Nome>/<Nome>.tsx`, export **nomeado** (`export const <Nome>: React.FC<Props>`). Exceções históricas: `Text` é o componente `TextBox` exportado com alias; `InputChat` é `function`.
2. Props declaradas como `type <Nome>Props` (ou `interface`) no próprio arquivo. Tipos que os apps precisam são exportados no `index.ts` com `export type`.
3. Todo componente público entra no `index.ts`, na seção certa (`// Texts`, `// Inputs`, `// User Cards`, `// Lists`, `// Others`, `// Theme`, `// Fonts`, `// Icons`).

### 4.2 Estilo

4. `const C = Constants.styles` no topo; `StyleSheet.create` no fim do arquivo para tudo que não é cor.
5. Cor que acompanha o tema: `const { colors } = useLavexTheme()` e estilo inline (`{ backgroundColor: colors.surface }`). Cor fixa nos dois temas: `Constants.styles.*`. Ver [`tokens-e-tema.md`](./context/tokens-e-tema.md) §1.
6. Fonte: `useResolvedFontFamily(C.fontFamily.BOLD)` e `fontWeight: font ? "normal" : "700"`.
7. Sem `className`, sem Tailwind, sem gluestack, sem biblioteca de UI de terceiros.
8. Interação visual pelo callback `style={({ pressed }) => …}` do `Pressable` (sem `useState` de pressionado). Pressionado = opacidade 0,85 (ou `surfaceMuted` em fundo transparente).
9. Na web, campos desligam o outline nativo (`outlineStyle: "none"`) e pintam o foco com a borda `accent`.

### 4.3 Texto e dimensão

10. **Nada trunca.** Texto longo quebra linha e o componente cresce em altura. Única exceção: `PaymentButton`.
11. Plus Jakarta Sans é a única família (400/500/600/700).
12. Tamanhos mínimos de toque: 44 px (`TOUCH_TARGET`).

### 4.4 Props

13. Texto entra por prop (`text`, `label`, `title`), não por `children`. `children` é para composição (`Card`, `List`, `Modal`, `Accordion`, `RadioCard`, `SwipeableListItem`, `Grid`).
14. Callback principal é `onClick` em componentes "de alto nível" (`Button`, `Card`, `IconButtonLarge`); primitivos e componentes 2.0 usam nomes específicos (`onPress`, `onSelect`, `onChange`, `onSend`, `onAdd`, `onBack`, `onNavigate`).
15. Componentes de formulário são **controlados** (`value` + `onChange`). Exceções com estado interno: `StarRating`, `PaymentButton` (sem `selected`), `Accordion` (item aberto), `SwipeableListItem` (sem `isOpen`).
16. `darkMode?: boolean` continua na assinatura dos componentes antigos e é ignorada (exceto `Accordion`). Não acrescente `darkMode` em componente novo: use o tema.
17. `fontScale?: number = 1` multiplica `fontSize`/`lineHeight` (em `SearchInput`, também a altura).
18. Acessibilidade: `accessibilityRole` e `accessibilityState` coerentes (`button`, `checkbox`, `radio`, `tab`, `header`, `alert`, `progressbar`); `accessibilityLabel` em pt-BR.

### 4.5 Idioma

19. Identificadores em inglês. Textos visíveis padrão e comentários para humanos em pt-BR. Commits no padrão `tipo: descrição em pt-BR (#issue)` (`feat`, `fix`, `refactor`, `docs`).

### 4.6 Largura natural

| Comportamento | Componentes |
|---|---|
| **Largura total** (`width: 100%` ou `alignSelf: stretch`) | `Card`, `List`, `TextList`, `UserList`, `OfferList`, `Grid`, `Divider`, `Toggle`, `Stepper`, `QuantityStepper` com `label`, `NavigationBar`, `TopHeader`, `SwipeableListItem`, `InputChat`, `Message`, `Order`, `Info`, `Text` (com `fill`), `Button` (exceto `link`), `Input` e derivados, `SearchInput`, `TextArea`, `Select`, `Accordion`, `RadioCard`, `CheckboxListItem`, `SimpleTable`, `IconButtonLarge`, `PaymentButton`, `StatusBanner`, `EmptyState`, `ErrorBox`, `Timeline`, `ImageUploader`, `DarkInformationBox(Large)`, `UserCardBio` |
| **Mede pelo conteúdo** | `CountBadge`, `Tag`, `FAB`, `CheckButton`, `ProfileAvatar`, `Image`, `Button` `link`/`link-gray`, `QuantityStepper` sem `label`, `Text` com `fill={false}`, `Heading` e títulos (seguem o `alignItems` do pai) |
| **Cobre a tela** | `Modal`, zoom do `ImageUploader` |

---

## 5. Como trabalhar neste repositório

### 5.1 Comandos

```bash
npm install
npm run typecheck        # tsc --noEmit — única checagem automática
cd demo && npm install && npx expo start   # vitrine para teste visual (web, iOS, Android)
```

### 5.2 Criar ou alterar um componente

1. Leia a entrada do componente no catálogo (`context/componentes-*.md`) e veja em [`consumidores.md`](./context/consumidores.md) quem o usa.
2. Se há protótipo 2.0, os valores do `style` do HTML em `docs/prototipos/` são a especificação.
3. Siga os padrões da §4 (tokens, tema, fonte, `Pressable`). Prefira compor componentes existentes.
4. Componente novo: pasta própria, export no `index.ts`, exemplo no `demo/app/index.tsx`.
5. Não quebre contrato usado pelos apps (renomear prop, mudar default, remover variante). Se precisar, mantenha o antigo e documente em `docs/migracao-2.0.md` ou numa nota de migração.
6. `npm run typecheck`.
7. **Atualize o contexto no mesmo PR** (§6) e faça bump de `version` no `package.json`.

### 5.3 Ao usar o DS num app

- Envolva o app do Lavexer em `<LavexThemeProvider mode="dark">`; o app do cliente não precisa de provider.
- Carregue as fontes com `useFonts([...])` no layout raiz.
- O `Modal` exige `SafeAreaProvider`.
- `TopHeader` e `NavigationBar` não aplicam a safe area do topo/base por completo: a tela cuida disso.
- A altura da `NavigationBar` é 76 px; conteúdo rolável precisa desse respiro.

---

## 6. Manutenção deste contexto

Atualize `CONTEXT.md` e o arquivo certo de `context/` **no mesmo PR** sempre que:

- criar, renomear ou remover componente, ícone ou export;
- mudar prop, tipo, default ou variante;
- mudar aparência (cor, raio, borda, espaçamento, tipografia, tamanho, sombra) ou comportamento (estado, gesto, animação, foco, validação);
- alterar `src/constants/constants.ts`, `src/theme/*`, `tailwind.config.js`, `src/utils/*` ou dependências;
- criar ou quitar uma dívida técnica;
- mudar a forma como um app consome o pacote (atualize `consumidores.md`).

Regras de escrita:

- Descreva o **código real**, com valores resolvidos (hex, px). Comportamento indesejado entra como é e vai para [`dividas-tecnicas.md`](./context/dividas-tecnicas.md).
- Cada componente tem: para que serve, tabela de props (tipo, default, obrigatória), aparência, comportamento e, se for composto, um esqueleto ASCII curto.
- Edite a entrada do componente; **não** acrescente "adendos" no fim do arquivo.
- Mantenha cada arquivo abaixo de 100 kB (`wc -c CONTEXT.md context/*.md`). Se um passar de ~80 kB, divida por assunto e atualize a tabela do topo.
- Texto em pt-BR; nomes de código em inglês.
- Mudança que atravessa repositórios (ex.: componente novo adotado pelo `app-client-lavex`) atualiza o `CONTEXT.md` de cada repositório tocado.

Em review de PR, contexto desatualizado em mudança que toca componente, token, ícone ou export é achado **bloqueante**.
