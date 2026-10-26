# Dívidas técnicas conhecidas

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md).

Comportamento indesejado é documentado como está no código e registrado aqui. Ao quitar uma dívida, remova a linha (ou risque com `~~…~~` e diga a versão) no mesmo PR.

## Processo e distribuição

1. **Sem testes e sem CI.** Não há runner, arquivo de teste nem workflow. A única verificação automática possível é `npm run typecheck`; o resto é manual no `demo/` ou no app.
2. **Pin divergente entre os apps.** O cliente fixa um commit (`#42b3b38`, 1.14.2); o Lavexer acompanha `#main`. Merge na `main` muda o app do Lavexer no próximo install, sem bump controlado. Não há tags de versão.
3. **`package.json` com lixo e metadados errados.** `dependencies` inclui `init` e `npx` (não usados); `babel-plugin-module-resolver`, `expo`, `tailwindcss` e `react-native-worklets` também estão em `dependencies`. `repository`/`bugs`/`homepage` apontam para `github.com/lavex/lavex-design-system`, que não é o repositório real (`LavexTech/design-system`). `.npmignore` exclui `src/`, mas `files` inclui `src/` e prevalece.
4. **Documentação legada desatualizada.** `README.md` usa `Title1` (não existe) e aponta "a pasta `/docs`" para documentação por componente; `DesignSystemUsage.md` fala de `GluestackUIProvider` e de props antigas. A fonte canônica é o `CONTEXT.md` e a pasta `context/`.
5. **`demo/package.json` ainda lista `@gluestack-ui/*`, `@legendapp/motion` e `@react-aria/*`**, removidos do pacote na 1.0.1.

## Tema e aparência

6. **Componentes que não leem o tema** (sempre claros): `FAB`, `Stepper`, `Stars`, `StarRating`, `CheckButton`, `Image` (moldura). O token `star` existe e não é lido.
7. **`Accordion`/`AccordionItem` usam o tema legado** (`Constants.styles.theme`) pela prop `darkMode`, não o `LavexThemeProvider`.
8. **Negrito sintético** em `Card` (título Regular + `fontWeight` 700) e `NavigationBar` (rótulos Regular + 700/500). `Message`, `CheckButton` e `FAB` fixam `fontFamily` sem `useResolvedFontFamily`.
9. **`Tag` tem 14 px** (`fontSize.SMALL`), não os 13 px da especificação 2.0; os nomes `*-outline` não correspondem mais à aparência preenchida.
10. **Escalas Tailwind antigas apontam para a paleta 2.0** (`primary-500` é `#3CDBC0`). Nenhum componente usa classes.
11. **Tokens legados sem uso** em `Constants.styles` (`textColor.PRIMARY` azul, `color.BLUE`, `SOFT_BLUE`, `MEDIUM_GRAY`, `PRIMARY_LIGHT`, `PRIMARY_DARK`, `BACKGROUND_LIGHT`, `textColor.WARNING`).

## Contratos e comportamento

12. **`UserCardHorizontal` não é horizontal** e não mostra avatar.
13. **`UserCardBio` não renderiza a `bio`**, embora o campo seja obrigatório no tipo.
14. **`OfferList` e `UserList` não passam `key` no `GridItem` mapeado** (o `key` do `OfferList` está no `Offer`). `OfferList` não repassa `amountLabel` nem `totalRatings` e importa `List` sem usar. `UserList` tem o `Divider` comentado.
15. **`Grid.gap` não é pixel** (faixas de 4 a 48 px; `5` vira 24). O `Grid` não renderiza filhos até medir a largura.
16. **`StarRating` não é controlado**: ignora mudanças de `initialRating` após montar.
17. **`Offer` formata o valor com `String(amount)`** (`R$ 45.5`). O app precisa mandar `amountLabel`.
18. **`Message`**: `userType` não muda nada; `senderName` padrão em inglês (`"You"`/`"Contact"`).
19. **`QuantityStepper.accessibilityLabel`** é declarada e não usada.
20. **`PaymentButton` trunca título e subtítulo em 1 linha**, única exceção à regra "nada trunca".
21. **`Alert` importa `Constants` e `Dimensions` sem usar.**
22. **`Stepper`, `CheckButton`, `Alert`, `Order` seguem o desenho antigo.** Equivalentes 2.0: `QuantityStepper`, `CheckboxListItem` (ou `Tag` + `Button`), `StatusBanner`, telas próprias do app.
23. **Tipos de domínio duplicados**: cada card/lista declara seu `User`; só `UserCardHorizontal` exporta o tipo, e nenhum sai pelo `index.ts`. `SelectOption`, `TagVariant`, `OrderItem` também não são exportados.
