# Migração 2.0 — o que muda para quem consome o design system

Documento de acompanhamento do épico [#205](https://github.com/LavexTech/design-system/issues/205). Destinado a quem mantém o `app-client-lavex` e o `app-provider-lavex`.

A migração leva o design system da linguagem visual atual (Roboto, paleta azul/grafite herdada do gluestack-ui) para a **linguagem 2.0** dos protótipos em `docs/prototipos/`: Plus Jakarta Sans, verde-água `#3CDBC0` e verde escuro `#0B7566` sobre grafite `#2D3B42`, cantos de 12 a 16 px, campos de 52 px e botões de 48 a 56 px.

> Este documento é atualizado por **toda** sub-issue do épico que gerar impacto novo. Se você encontrou um impacto que não está aqui, ele é um bug de documentação — abra a correção junto com o achado.

---

## 1. Como a mudança chega nos apps

Os dois apps consomem o design system por pin de GitHub:

```json
"lavex-design-system": "github:LavexTech/design-system#main"
```

Não há tag nem versão congelada. **Toda PR mergeada na `main` do design system chega no app no próximo `npm install`.** Isso foi uma decisão consciente do épico: o visual novo entra em produção à medida que fica pronto, e as issues de adaptação dos apps andam logo atrás das issues do design system.

Consequências práticas:

- Rode `npm install github:LavexTech/design-system#main` para forçar a atualização; o pin de branch não revalida sozinho.
- **Depois de qualquer `npm install` com o Metro aberto, pare o Metro e suba com `npm run dev -- --clear`.** Instalar dependência com o bundler rodando deixa o cache inconsistente; o sintoma é tela branca ou `Unable to resolve module lavex-design-system`.
- Se precisar travar temporariamente numa versão conhecida, troque o pin para um commit: `github:LavexTech/design-system#<sha>`.

---

## 2. O que muda sozinho (nenhuma linha de código no app)

Estes itens trocam a aparência sem tocar em nome de componente, prop, variante ou assinatura de callback. O TypeScript do app continua compilando sem alteração.

| O que | Detalhe |
|---|---|
| **Tipografia** | Roboto sai, Plus Jakarta Sans entra, nos pesos 400/500/600/700. Nenhum app carrega fonte por conta própria — `useFonts` e `useGlobalFonts` não aparecem no código de nenhum dos dois apps, todo o carregamento acontece dentro dos componentes do DS. `useFonts(["Roboto-Regular"])` continua funcionando por alias durante a migração. |
| **Tokens e paleta** | `src/constants/constants.ts` e `tailwind.config.js` ganham a paleta 2.0. `Constants` **não é exportado** no `index.ts` e nunca foi acessível aos apps. |
| **Saída do gluestack-ui** | `Button`, `Input`, `TextArea`, `Select`, `Modal`, `Grid` e `Accordion` deixam de embrulhar primitivos do gluestack. `src/ui/*` sempre foi interno e nunca esteve no `index.ts`. Efeito colateral bom: somem as `View` extras do `GluestackUIProvider` aninhado. |
| **Componentes repintados** | `Button`, `Input` e família, `TextArea`, `Select`, `Tag`, `Accordion`, `NavigationBar`, `Message`, `InputChat` e `Gallery` mudam de cor, raio, altura e tipografia mantendo a API. |
| **Componentes novos** | `SearchInput`, `TopHeader`, `RadioCard`, `CheckboxListItem`, `QuantityStepper`, `StatusBanner`, `EmptyState`, `Timeline`, `ImageUploader` e `AnimatedStatusIndicator` entram sem afetar nada que já existe. |

Mesmo sendo transparente no código, **repintura muda pixel**: telas com altura fixa, espaçamento calculado à mão ou cor própria precisam de uma passada visual. É esse o escopo das issues de revalidação ([app-client-lavex#145](https://github.com/LavexTech/app-client-lavex/issues/145) e [app-provider-lavex#7](https://github.com/LavexTech/app-provider-lavex/issues/7)).

---

## 3. O que exige trabalho no app

Nenhum item desta seção quebra compilação. Todos exigem decisão ou ajuste humano.

### 3.1 Altura do `Button` cresce

**O que muda:** a escala de tamanhos passa a ser `xs` 36, `sm` 40, `md` 48, `lg` 52, `xl` 56 px. O default continua `md`, que sobe de **40 para 48 px**. O raio vai de 4 para 14–16 px.

**Por quê:** o botão principal dos protótipos tem 56 px e raio 16; manter o `md` em 40 deixaria a hierarquia visual inconsistente.

**Quebra compilação?** Não. Nenhum nome de tamanho ou variante muda.

**O que fazer no app:** revisar telas com `height` fixo em volta de botão, rodapés de formulário e pares de botões lado a lado. Quem quiser o botão principal dos protótipos passa a usar `size="xl"`.

**Como validar:** percorrer as telas de formulário e os rodapés de ação comparando com `docs/prototipos/app-client-14-entrega-e-pagamento.html`.

### 3.2 Variantes do `Button` mudam de cor

**O que muda:**

| Variante | Antes | Depois |
|---|---|---|
| `default`, `primary`, `success` | grafite `#333333` / verde `#348352` | verde-água `#3CDBC0` com texto `#2D3B42` |
| `default-outline` | contorno grafite | contorno 1.5 px `#869199` com texto `#2D3B42` |
| `success-outline` | contorno verde, texto grafite | fundo `#E2FAF6`, texto e borda `#0B7566` |
| `danger` / `danger-outline` | `#DC2626` | `#C62828` |
| desabilitado | o botão normal com 40% de opacidade | fundo `#F4F2F5`, texto `#5A6A72` |

`default`, `primary` e `success` ficam idênticas de propósito: no 2.0 existe um único botão de ação principal. `primary` passa a ser o nome preferido.

**Quebra compilação?** Não. As 9 variantes continuam existindo com os mesmos nomes, e `ghost` e `ghost-danger` são adicionadas.

**O que fazer no app:** nada obrigatório. Onde a escolha da variante dependia da cor (ex.: `success` escolhida por ser verde escuro), reavalie a intenção.

### 3.3 Campos ficam mais altos e com texto menor

**O que muda:** `Input` e derivados vão de 48 para **52 px**; o texto digitado cai de 18 para **16 px**; a borda vira 1.5 px `#869199` e o raio vai de 8 para 12. O rótulo deixa de ser um `Text size="small"` (15 px regular) e vira um bloco de 14 px **peso 600**. `TextArea` segue o mesmo padrão, com altura mínima de 120 px.

**Quebra compilação?** Não. Todas as props continuam iguais, incluindo máscara, validação e `rightElement`.

**O que fazer no app:** revalidar formulários longos (cadastro, editar perfil, editar endereço, editar contato). Formulários ficam alguns pixels mais altos no total.

### 3.4 `NavigationBar` cresce de 64 para 76 px

**O que muda:** altura fixa de 76 px, borda superior de 1 px `#E5E1E6`, aba ativa com pílula `#E2FAF6` de 56 × 30 px atrás do ícone e rótulo `#0B7566` de 13 px. A aba ativa deixa de ser azul. O token `Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT` passa a valer 76.

**Quebra compilação?** Não — mas é o item com maior chance de defeito visível.

**O que fazer no app:** o `app-client-lavex` mantém uma cópia local da altura em `constants/layout.ts`:

```ts
/** Altura do NavigationBar do design system. */
export const TAB_BAR_HEIGHT = 64;
```

Esse valor **precisa** virar 76, junto com todo cálculo derivado (padding de `ScrollView`, posição do `FAB`, `FAB_SCROLL_CLEARANCE`). Desatualizado, ele esconde conteúdo atrás do menu. No `app-provider-lavex`, procure por qualquer constante equivalente.

**Como validar:** rolar até o fim de cada lista e conferir que o último item aparece inteiro acima do menu.

### 3.5 `Tag` deixa de ser contorno

**O que muda:** a tag passa a ser preenchida (fundo claro, texto escuro), raio 12, texto 13 px peso 700. Os nomes de variante continuam com o sufixo `-outline` por compatibilidade, apesar de não haver mais contorno — é uma inconsistência assumida e registrada como dívida no `CONTEXT.md`.

**Quebra compilação?** Não.

**O que fazer no app:** conferir contraste onde a tag está sobre fundo colorido ou dentro de card colorido (3 usos no app do cliente).

### 3.6 `darkMode` passa a ser aceita e ignorada

**O que muda:** os protótipos 2.0 definem apenas o tema claro. Componentes reescritos continuam **aceitando** a prop `darkMode` e passam a não fazer nada com ela. Isso já acontece hoje com `FAB`, `Image`, `Tag` e vários outros (dívida nº 5 do `CONTEXT.md`); a migração só generaliza.

**Por que não remover a prop:** o `app-client-lavex` passa `darkMode` em dezenas de chamadas. Remover quebraria o TypeScript de tudo isso de uma vez, sem ganho real.

**Quebra compilação?** Não.

**O que fazer no app:** confirmar que nenhuma tela depende do tema escuro para ser legível. A limpeza das chamadas é opcional e pode virar uma issue de ajustes gerais depois.

### 3.7 `Stepper` → `QuantityStepper`

**O que muda:** o `Stepper` atual é uma linha completa com botões quadrados de 40 px colados por uma borda compartilhada. O 2.0 usa dois círculos independentes de 44 px com o número entre eles. A diferença de layout é grande demais para repintar o componente existente sem bagunçar quem já o usa, então entra um componente novo.

**Quebra compilação?** Não — os dois coexistem. O `Stepper` só sai depois que os apps migrarem, em issue própria.

**O que fazer no app:** trocar na tela de edição de itens do pedido. As props equivalem quase 1:1: `text` vira `label`; `value`, `min`, `max`, `onChange`, `valueSuffix` e `onDelete` são iguais.

### 3.8 `ScreenHeader` local → `TopHeader` do design system

**O que muda:** o cabeçalho de tela entra no design system. O `app-client-lavex` mantém hoje um `components/ScreenHeader.tsx` próprio, usado em 8 telas.

**Diferenças na troca:**

| | `ScreenHeader` (app) | `TopHeader` (DS) |
|---|---|---|
| Safe area | recebe `insets` e aplica `paddingTop` por dentro | **não** aplica; a tela assume |
| Borda inferior | 1 px `#E5E5E5` | nenhuma (é assim no protótipo) |
| Título | `Title` do DS, 24 px | 28 px, peso 700, `letterSpacing: -0.4` |
| Subtítulo | não tem | `subtitle` opcional, 15 px `#5A6A72` |
| `leading` / `trailing` / `titleAccessory` | existem | existem, mesmo papel |
| Voltar | montado pela tela | `onBack` desenha o botão circular de 44 px |

**Quebra compilação?** Não — o componente local continua existindo até ser removido.

**O que fazer no app:** trocar nas 8 telas, mover o safe area para o container da tela e remover `components/ScreenHeader.tsx` e as constantes de layout que ficarem sem uso.

### 3.9 Seleção em chips → `CheckboxListItem`

**O que muda:** a seleção de peças de roupa deixa de ser `CheckButton` em chips e passa a ser lista com checkbox agrupada por categoria, dentro de `AccordionItem` com a contagem no `trailingAccessory` e `contentBackground="#FAF9FA"`.

**Quebra compilação?** Não — o `CheckButton` continua existindo (ele também é usado internamente pelo `Select`).

**O que fazer no app:** migrar a tela de seleção de itens. Protótipo: `docs/prototipos/app-client-11-selecao-itens.html`.

### 3.10 `react-native-reanimated` vira peer dependency

**O que muda:** sai de `dependencies` do design system e entra em `peerDependencies` (`~4.1.0`), para não existirem duas cópias da biblioteca na árvore do app — no caso do reanimated, isso causa crash de worklet.

**Quebra compilação?** Não. Os dois apps já declaram `react-native-reanimated: ~4.1.1`.

**O que fazer no app:** nada. Um app novo que consuma o design system precisará instalar.

### 3.11 Chat muda de contraste

**O que muda:** a bolha enviada passa de azul claro `#D7E7FA` com texto escuro para **grafite `#2D3B42` com texto branco**; a recebida passa de branco com borda para **cinza `#F4F2F5` sem borda**. Raio vai de 12 para 18, com um único canto de 4. O `InputChat` ganha campo de raio 24 e botão de enviar circular verde-água de 48 px.

**Quebra compilação?** Não.

**O que fazer no app:** se a tela de chat pinta o fundo da lista com cor própria, revisar o contraste com a bolha recebida `#F4F2F5`.

---

## 4. Tabela de equivalência

| Situação | Antes | A partir do 2.0 |
|---|---|---|
| Cabeçalho de tela | `ScreenHeader` local do app | `TopHeader` |
| Busca | `Input` com ícone improvisado | `SearchInput` |
| Escolha de opção única em card | `Select` ou montagem manual | `RadioCard` |
| Seleção múltipla em lista | `CheckButton` em chips | `CheckboxListItem` |
| Contador de quantidade | `Stepper` | `QuantityStepper` |
| Aviso em faixa | `Alert` (card com ícone grande) | `StatusBanner` |
| Lista vazia | montagem manual | `EmptyState` |
| Rastreio de pedido | montagem manual | `Timeline` |
| Grid de fotos com adicionar/remover | montagem manual | `ImageUploader` |
| Indicador de espera animado | montagem manual | `AnimatedStatusIndicator` |

`Alert`, `Select`, `CheckButton`, `Stepper` e `Gallery` continuam existindo e funcionando. A remoção de qualquer um deles exige issue própria, depois de os apps migrarem.

---

## 5. Props aceitas e ignoradas no 2.0

| Prop | Componentes | Situação |
|---|---|---|
| `darkMode` | todos que a aceitam hoje | aceita, ignorada. O 2.0 não tem tema escuro. |
| `fontScale` | todos que a aceitam hoje | **continua funcionando** — multiplica `fontSize` e `lineHeight`. |
| `variant` da `Tag` | `Tag` | nomes mantidos com sufixo `-outline`, aparência preenchida. |

---

## 6. Ordem de adoção recomendada

1. Espere as fundações (tipografia e tokens) e os primitivos (`Button`, família `Input`) entrarem na `main` do design system.
2. Faça a revalidação visual do app — em especial o `TAB_BAR_HEIGHT` e as telas de formulário.
3. Adote os componentes novos por tela, um commit por componente, conforme cada sub-issue do design system for mergeada.
4. Só depois disso o design system remove o legado e publica a `1.0.0` (sub-issue de fechamento).

---

## 7. Checklist rápido antes de dar o app por migrado

- [ ] `npm install github:LavexTech/design-system#main` feito com o Metro parado, e `npm run dev -- --clear` depois.
- [ ] Nenhuma constante local de altura do menu com 64.
- [ ] Nenhum conteúdo escondido atrás da `NavigationBar`.
- [ ] Formulários validados com campo de 52 px e botão de 48 px.
- [ ] Hexadecimais crus do app alinhados à paleta 2.0 (`#2D3B42`, `#5A6A72`, `#E5E1E6`, `#0B7566`, `#3CDBC0`) — o azul `#007AFF` não existe mais na linguagem nova.
- [ ] Contraste das `Tag` conferido.
- [ ] `CONTEXT.md` do app atualizado.
