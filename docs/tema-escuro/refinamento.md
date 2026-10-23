# Refinamento — tema escuro (#280)

> Cópia da seção do design system do planejamento "app do Lavexer no padrão do app do cliente, em tema escuro" (2026-10-22). A issue [#280](https://github.com/LavexTech/design-system/issues/280) é a fonte da verdade.


### Contexto

O app do Lavexer (`app-provider-lavex`) é o app do cliente com um visual de "dark mode" por cima. O mesmo usuário pode ser cliente e Lavexer, e o tema escuro mostra em qual app ele está. Hoje o DS 2.0 **ignora** a prop `darkMode` nos componentes reescritos (`Button`, `Input`, `TextArea`, `Message`, `InputChat`, `Tag`, `Heading`, `IconButtonLarge` e outros; ver `CONTEXT.md` §8.10 e dívida 5). Por isso o provider não consegue usar a versão atual do DS.

Esta issue cria um tema escuro de verdade no DS e acrescenta os ícones que a Conta do Lavexer usa.

Issue que consome: LavexTech/app-provider-lavex#18

### Regras

1. **Tema por contexto, não por prop.** Novo `LavexThemeProvider` (`mode: "light" | "dark"`, padrão `"light"`) e hook `useLavexTheme()`, que devolve `{ mode, colors }`. Os componentes leem as cores do hook. A prop `darkMode` continua aceita e ignorada (não quebrar a assinatura).
2. **Sem provider na árvore, o tema é `light`, com os mesmos hex de hoje.** O app do cliente não pode mudar um pixel. Esse é o critério mais importante desta issue.
3. **Tokens semânticos** em `src/theme/tokens.ts`. Abaixo, a coluna `light` com os valores atuais e a coluna `dark` com a proposta (validar no demo, ver Commit 4):

| Token | Uso | light | dark (proposta) |
|---|---|---|---|
| `background` | fundo de tela | `#FFFFFF` | `#1B252A` |
| `surface` | cards, campos, caixas com borda | `#FFFFFF` | `#24323A` |
| `surfaceSubtle` | listas, fundo de linha (`#FAF9FA`) | `#FAF9FA` | `#24323A` |
| `surfaceMuted` | cinza-claro de preenchimento, botão desabilitado | `#E5E1E6` | `#34444C` |
| `surfaceAccent` | pílula ativa, caixa verde clara | `#E2FAF6` | `#14433D` |
| `surfaceDanger` | caixa de erro | `#FDECEC` | `#4A2326` |
| `border` | divisores, bordas suaves | `#E5E1E6` | `#34444C` |
| `borderInteractive` | borda de campo e de stepper | `#869199` | `#6E7E86` |
| `text` | texto padrão, `h2`, `h3` | `#2D3B42` | `#F2F5F6` |
| `textMuted` | apoio, `Info`, ícone inativo | `#5A6A72` | `#A9B6BC` |
| `accent` | links, `h4`, ícone ativo, foco | `#0B7566` | `#3CDBC0` |
| `accentDeep` | link `#08706D` | `#08706D` | `#3CDBC0` |
| `primary` | fundo do botão principal, `h1` | `#3CDBC0` | `#3CDBC0` |
| `onPrimary` | texto sobre `primary` | `#2D3B42` | `#1B252A` |
| `danger` | erro, lixeira | `#C62828` | `#FF6B6B` |
| `inverseSurface` | `DarkInformationBox(Large)`, bolha enviada | `#2D3B42` | `#E2FAF6` |
| `onInverse` | texto sobre `inverseSurface` | `#FFFFFF` | `#1B252A` |
| `star` | estrela preenchida | `#FFD700` | `#FFD700` |

4. **Componentes a converter.** São os que o app do cliente usa e que o Lavexer vai herdar:
   - Textos: `Heading`, `Text`, `Info`, `Title`, `Subtitle`, `MainTitle`
   - Campos: `Input` (e `InputEmail`, `InputPhone`, `InputPassword`, `InputName`, `InputCPF`, `InputNumber`), `TextArea`, `Select`, `SearchInput`, `Toggle`
   - Ações e navegação: `Button` (todas as variantes), `NavigationBar`, `TopHeader`, `CountBadge`, `Tag`
   - Estrutura: `Modal`, `Divider`, `Card`, `List`, `Grid`, `SimpleTable`, `EmptyState`, `StatusBanner`, `ErrorBox`, `RadioCard`, `CheckboxListItem`, `QuantityStepper`, `SwipeableListItem`
   - Perfil e Conta: `IconButtonLarge`, `UserCardBio`, `UserInfo`, `ProfileAvatar`, `ShortStarRating`
   - Pedido e mídia: `DarkInformationBox`, `DarkInformationBoxLarge`, `Timeline`, `ImageUploader`, `PhotoSkeleton`, `PaymentButton`
   - Chat: `Message`, `InputChat`
   - Ícones: a cor padrão `#2D3B42` vira `colors.text`, só quando `color`/`fill` não vierem.
5. **Ícones novos no `IconButtonLarge`:** `truck`, `qr-code` e `message-square-text`, além de `credit-card` e `message-square`. Novo `IconTruck` (lucide `truck`).

### Commits

Branch `feat/280-tema-escuro` a partir de `main`.

**Commit 1: `feat: tokens de tema e LavexThemeProvider`**
- `src/theme/tokens.ts`: tipo `ThemeColors` e objetos `lightColors` e `darkColors` com a tabela da regra 3.
- `src/theme/LavexThemeProvider.tsx`: contexto com `mode` e `colors`, `LavexThemeProvider` e `useLavexTheme()`. Sem provider na árvore, `useLavexTheme()` devolve o tema `light`.
- Exportar `LavexThemeProvider`, `useLavexTheme`, `ThemeColors`, `lightColors` e `darkColors` no `index.ts` (seção nova `// Theme`).
- `npm run typecheck`.

**Commits 2 a N: `refactor: <Componente> lê cores do tema`.** Um commit por grupo da regra 4 (textos, campos, ações e navegação, estrutura, perfil e Conta, pedido e mídia, chat, ícones).
- Em cada componente, `const { colors } = useLavexTheme()`. Troque **só** os hex que estão na coluna `light` da tabela pelo token correspondente. O `StyleSheet.create` fica com o que não é cor; a cor entra como estilo inline ou via `useMemo`.
- Hex que não está na tabela fica como está. Liste esses casos no PR.
- Não mude tamanho, raio nem espaçamento.

**Commit: `feat: ícones truck, qr-code e message-square-text no IconButtonLarge`**
- `src/components/Icons/IconTruck.tsx`: cópia de `IconQrCode.tsx` com import de `lucide-react-native/icons/truck`. Exportar no `index.ts`.
- `IconButtonLarge`: ampliar o tipo de `icon` e o mapa nome → componente.

**Commit: `docs: demo com alternância de tema`**
- No `demo/`, um toggle "Tema escuro" que envolve a vitrine em `LavexThemeProvider mode="dark"`.
- Tirar prints de todos os componentes da regra 4 nos dois temas e anexar ao PR. **O PR só é mergeado depois que o dono do produto aprovar a paleta escura pelos prints.** Ajustes de cor entram em `darkColors`.

**Commit final: `docs: CONTEXT do tema escuro` + bump `1.14.2` → `1.15.0`**
- `CONTEXT.md`:
  - seção nova "Tema" com a tabela de tokens
  - §4 Props: `darkMode` é ignorada; o tema vem do provider
  - dívida 5 marcada como quitada
  - tabela do `IconButtonLarge` e tabela de ícones atualizadas
  - adendo 1.15.0

### Critérios de aceite

- [ ] Sem `LavexThemeProvider`, todos os componentes têm exatamente as cores de hoje. Conferir o demo no tema claro contra a `main`, e o app do cliente com o DS novo sem diferença visual.
- [ ] Com `mode="dark"`, todos os componentes da regra 4 usam a paleta escura, sem texto escuro sobre fundo escuro.
- [ ] Paleta escura aprovada pelo dono do produto com os prints do PR.
- [ ] `IconButtonLarge` aceita `truck`, `qr-code` e `message-square-text`. `IconTruck` exportado.
- [ ] `CONTEXT.md` e `package.json` (`1.15.0`) atualizados.
- [ ] `npm run typecheck` passa.

### Como testar

`demo/`: alternar o tema e percorrer todos os componentes. No `app-client-lavex`, apontar o DS para a branch (`npm install github:LavexTech/design-system#feat/280-tema-escuro`, parar o Metro e subir com `--clear`) e abrir login, novo pedido, pedido, histórico e Conta. Nada pode mudar. Desfazer a troca de versão no cliente depois do teste.
