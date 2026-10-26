# Consumidores — quem usa o quê

Parte do contexto do design system. Índice em [`../CONTEXT.md`](../CONTEXT.md).

Use este arquivo para medir o **impacto** de uma mudança: antes de alterar a aparência ou o contrato de um componente, veja aqui quais telas dos apps o usam. Levantamento feito por busca de `import { … } from "lavex-design-system"` nos repositórios em outubro de 2026. Refaça a busca antes de uma mudança grande:

```bash
grep -rnE "from ['\"]lavex-design-system['\"]" app components --include=*.tsx --include=*.ts
```

---

## 1. Como os apps instalam o pacote

| App | Pin no `package.json` | Efeito |
|---|---|---|
| `app-client-lavex` (cliente) | `github:LavexTech/design-system#42b3b38…` (commit da 1.14.2, antes do tema escuro) | Só recebe mudanças quando o pin é trocado |
| `app-provider-lavex` (Lavexer) | `github:LavexTech/design-system#main` | Qualquer merge na `main` chega no próximo `npm install` |

O pacote é distribuído como **código-fonte TS/TSX**; o Metro do app compila `src/`. Para testar uma branch no app: `npm install github:LavexTech/design-system#<branch-ou-sha>` com o Metro parado e `npm run dev -- --clear`.

---

## 2. `app-client-lavex` (cliente, linguagem 2.0, tema claro)

| Arquivo do app | Componentes do DS |
|---|---|
| `app/_layout.tsx` | `useFonts` |
| `app/login/index.tsx` | `Button`, `InputEmail`, `InputPassword`, `MainTitle`, `Modal`, `Text` |
| `app/recover-password.tsx` | `Button`, `Info`, `InputEmail` |
| `app/register/index.tsx` | `Button`, `Divider`, `Heading`, `Info`, `Input`, `InputCPF`, `InputEmail`, `InputName`, `InputPassword`, `InputPhone`, `Modal`, `Text` |
| `app/error/index.tsx` | `Button`, `Card`, `Grid`, `Text`, `Title` |
| `app/home/history/index.tsx` | `IconChevronRight`, `Subtitle`, `Tag` |
| `app/home/order/index.tsx`, `orderAccepted/index.tsx` | `Button`, `Title` |
| `app/home/order/orderNew/NewOrderItemsStep.tsx` | `Button`, `Heading`, `IconArrowRight`, `IconCheck`, `IconTrash`, `QuantityStepper`, `SwipeableListItem`, `Tag`, `Text`, `TopHeader` |
| `app/home/order/orderNew/AddPiecesScreen.tsx` | `Button`, `Heading`, `IconArrowDown`, `IconArrowRight`, `IconCheck`, `IconChevronDown`, `SearchInput` |
| `app/home/order/orderNew/OrderPiecesScreen.tsx` | `Button`, `IconArrowRight`, `IconCheck`, `IconChevronDown`, `IconTrash`, `QuantityStepper`, `Tag` |
| `app/home/order/orderNew/NewOrderPhotosStep.tsx` | `Button`, `IconArrowRight`, `IconShieldCheck`, `ImageUploader` |
| `app/home/order/orderNew/NewOrderDeliveryStep.tsx` | `Button`, `IconArrowRight`, `TextArea` |
| `app/home/order/orderPending/index.tsx` | `Button`, `DarkInformationBoxLarge`, `Heading`, `List`, `Offer`, `RadioCard`, `Text` |
| `app/home/order/orderDetails/index.tsx` | `Heading` |
| `app/home/order/orderPayment/index.tsx` | `Button`, `Heading`, `IconLock`, `IconPlus`, `IconQrCode`, `PaymentButton`, `SimpleTable` |
| `app/home/order/orderPayment/pix.tsx` | `Button`, `IconLoader`, `Input` |
| `app/home/order/orderPayment/failure.tsx` | `Button`, `ErrorBox`, `Heading`, `IconCheck` |
| `app/home/account/index.tsx` | `Button`, `CountBadge`, `Divider`, `Heading`, `IconArrowRight`, `IconButtonLarge`, `IconLogOut`, `IconPencil`, `Info`, `UserCardBio`, `UserInfo` |
| `app/home/account/edit-profile.tsx` | `Button`, `IconCamera`, `Input`, `ProfileAvatar` |
| `app/home/account/edit-profile-list.tsx` | `List`, `Subtitle` |
| `app/home/account/edit-contact.tsx`, `Edit/ContactData.tsx` | `Button`, `Input`, `InputEmail`, `InputPhone` |
| `app/home/account/edit-address.tsx`, `Edit/Address.tsx` | `Button`, `Input` |
| `app/home/account/Edit/PersonalData.tsx` | `Button`, `Input`, `InputCPF`, `InputName` |
| `app/home/account/Edit/Bio.tsx`, `Edit/WelcomeMessage.tsx` | `Button`, `Text`, `TextArea` |
| `app/home/account/wallet.tsx` | `Button`, `CheckboxListItem`, `DarkInformationBoxLarge`, `Grid`, `GridItem`, `Heading`, `IconCircleCheck`, `IconCreditCard`, `IconPlus`, `IconShieldCheck`, `Input`, `InputNumber`, `Text` |
| `app/home/account/delete-account.tsx` | `Button`, `IconCheck`, `IconReceipt`, `IconUserRound` |
| `app/home/provider/[id].tsx` | `Card`, `IconChevronLeft`, `Info`, `ProfileAvatar`, `Text`, `Title`, `TopHeader` |
| `components/AppTabBar.tsx` | `IconHome`, `IconReceipt`, `IconUserRound`, `NavigationBar` |
| `components/StartedOrderContent.tsx` | `Button`, `CountBadge`, `DarkInformationBox`, `Heading`, `IconMessageSquare`, `Modal`, `ProfileAvatar`, `Timeline` |
| `components/AcceptedOrderContent.tsx` | `Button`, `CountBadge`, `DarkInformationBoxLarge`, `Heading`, `IconChevronRight`, `IconMapPin`, `IconMessageSquare` |
| `components/CancelledOrderContent.tsx`, `CompletedOrderContent.tsx` | `Button`, `DarkInformationBoxLarge`, `Heading` |
| `components/PendingRatingContent.tsx` | `Button`, `IconCheck`, `ProfileAvatar`, `TextArea` |
| `components/OfferCard.tsx`, `ProviderUserCard.tsx` | `IconStar`, `Info`, `ProfileAvatar`, `ShortStarRating` |
| `components/ProviderRatingsScreen.tsx` | `Button`, `Heading`, `IconChevronLeft`, `ProfileAvatar`, `ShortStarRating`, `Text` |
| `components/OfferAcceptModal.tsx` | `Button`, `Divider`, `Toggle` |
| `components/PaymentCardsModal.tsx` | `Button`, `Heading`, `PaymentButton` |
| `components/CreditCardItem.tsx` | `Button`, `IconTrash`, `Tag` |
| `components/OrderSummary.tsx` | `IconChevronDown`, `IconPlus`, `ImageUploader`, `Tag` |
| `components/OrderDetailsAccordion.tsx` | `Card`, `IconChevronLeft`, `Info`, `List`, `Modal`, `Subtitle`, `Tag`, `Text`, `Title` |
| `components/OrderPhotosSection.tsx`, `OrderPhotoViewer.tsx` | `Modal`, `PhotoSkeleton`, `Text` |
| `components/DialogHost.tsx`, `AccountExcludedScreen.tsx` | `Button`, `Modal`, `Text` |
| `components/Chat/*` | `Heading`, `IconChevronLeft`, `IconMessageSquareText`, `IconSend`, `Info`, `ProfileAvatar`, `Text`, `Title` |
| outros (`PaymentSuccess`, `LightBox`, `EmphasizedList`, `DisplayStars`, `OrderStarRating`, `RadioButtonGroup`, `CardGraphic`, `CardBrandImage`, `BackTitle`, `ChatComposer`, `MapPinNotice`, `LoadingOverlay`, `EditScreenLayout`, `ForcedUpdateGate`, `OrderReadOnlyChatButton`) | ícones soltos, `Heading`, `Info`, `Text`, `Button` |

Observações:

- O chat do cliente **não** usa `Message` nem `InputChat`: monta bolhas e compositor próprios (`components/Chat/*`) com `IconSend`.
- As estrelas de avaliação do cliente (`OrderStarRating`, `DisplayStars`) são montadas no app com `IconStar`/`IconStarHalf`, não com `StarRating`/`Stars`.

## 3. `app-provider-lavex` (Lavexer, ainda na linguagem antiga)

| Arquivo do app | Componentes do DS |
|---|---|
| `app/login/index.tsx` | `Button`, `InputEmail`, `InputPassword` |
| `app/register/index.tsx` | `Button`, `InputCPF`, `InputEmail`, `InputName`, `InputPassword`, `InputPhone` |
| `app/home/index.tsx` | `IconHistory`, `IconMessage`, `IconProfile`, `NavigationBar` |
| `app/home/Orders/index.tsx` | `Button`, `Card`, `Grid`, `GridItem`, `Input`, `Modal`, `Title`, `UserCardHorizontal` |
| `app/home/Orders/OrderDetail/index.tsx` | `Button`, `Card`, `Grid`, `GridItem`, `Input`, `Title` |
| `app/home/History/index.tsx` | `Button`, `Card`, `Grid`, `GridItem`, `Title` |
| `app/home/Account/index.tsx` | `Button`, `Grid`, `GridItem`, `Title`, `UserCardBio`, `UserInfo` |
| `app/home/Account/edit-profile.tsx` | `Accordion`, `AccordionItem`, `Button`, `Grid`, `GridItem`, `Input`, `InputCPF`, `InputEmail`, `InputName`, `InputPhone`, `TextArea` |
| `app/home/Account/configuracoes.tsx` | `Button`, `Grid`, `GridItem`, `Info`, `Input`, `Title`, `Toggle` |
| `app/home/Account/pix-key.tsx`, `support.tsx` | `Button`, `Card`, `Grid`, `GridItem`, `Input`, `Title` |
| `app/home/Account/welcome-message.tsx` | `Button`, `TextArea`, `Title` |

O app do Lavexer ainda **não** usa `LavexThemeProvider`; o tema escuro (#280) foi criado para a migração dele (issue `app-provider-lavex#18`). Ele usa o `DarkTheme` do React Navigation só para a navegação.

## 4. Exportados e não usados por nenhum app

`InputChat`, `Select`, `UserCardVertical`, `TextList`, `UserList`, `OfferList`, `Alert`, `CheckButton`, `FAB`, `Message`, `Image`, `Gallery`, `Stepper`, `StatusBanner`, `EmptyState`, `AnimatedStatusIndicator` (usado por dentro das caixas escuras), `Order`, `StarRating`, `Stars`, `LavexThemeProvider`, `useLavexTheme`, `lightColors`, `darkColors` e os ícones `IconHeadset`, `IconEye`, `IconEyeClosed`, `IconExclamation`, `IconImage`, `IconMinus`, `IconClose`, `IconCircleWaves`, `IconWaves`, `IconSearch`, `IconFilter`, `IconArrowLeft`, `IconHourglass`, `IconEdit`, `IconTruck`.

Vários são usados **dentro** do próprio DS (ex.: `Image` por `ProfileAvatar`, `Stars` por `Offer`). Remover um export exige issue própria e conferir os dois apps.

## 5. Protótipos 2.0 (`docs/prototipos/`)

21 telas HTML de alta fidelidade do app do cliente (moldura 390 × 844). Os valores nos atributos `style` **são** a especificação. Não edite esses arquivos.

| Arquivo | Tela | Componentes do DS em destaque |
|---|---|---|
| `app-client-01-login.html` | Login | `TopHeader` centralizado, `Input`, `InputPassword`, `Button` |
| `app-client-02-cadastro.html` | Cadastro | família `Input`, `Button` |
| `app-client-03-recuperacao-senha.html` | Esqueci minha senha | `TopHeader`, `InputEmail`, `Button` |
| `app-client-10-novo-pedido.html` | Novo pedido vazio | `TopHeader`, `EmptyState`, `Button` |
| `app-client-11-selecao-itens.html` | Adicionar peças | `SearchInput`, `Accordion` com contagem, `CheckboxListItem` |
| `app-client-12-edicao-itens.html` | Peças adicionadas | `QuantityStepper`, `List` |
| `app-client-13-add-fotos.html` | Fotos do pedido | `ImageUploader` |
| `app-client-14-entrega-e-pagamento.html` | Detalhes do pedido | `RadioCard`, `Button` |
| `app-client-20-historico.html` | Histórico | `SearchInput`, `Tag`, `EmptyState`, `NavigationBar` |
| `app-client-30-pedido-aguardando-ofertas.html` | Aguardando ofertas | `AnimatedStatusIndicator`, `StatusBanner` |
| `app-client-31-pedido-ofertas-disponiveis.html` | Ofertas recebidas | `RadioCard`, `ProfileAvatar`, `Stars` |
| `app-client-32-pedido-oferta-escolhida-pendente-coleta.html` | Pedido confirmado | `Timeline`, `Tag`, `Button` |
| `app-client-33-pedido-iniciado.html` | Em andamento | `Timeline`, `StatusBanner dark` |
| `app-client-34-pedido-finalizado.html` | Avaliar | `Timeline`, `StarRating`, `TextArea` |
| `app-client-35-pedido-cancelado.html` | Cancelado | `StatusBanner`, `Tag` de erro |
| `app-client-36-pedido-chat.html` | Chat | `Message`, `InputChat` |
| `app-client-40-conta.html` | Minha conta | `TopHeader`, `ProfileAvatar`, lista de ações, `Button` destrutivo |
| `app-client-41-conta-editar-perfil.html` | Editar perfil | `ProfileAvatar`, `Input`, `TextArea` |
| `app-client-42-conta-editar-endereco.html` | Endereço | família `Input` |
| `app-client-43-conta-editar-contato.html` | Contato | `InputPhone`, `InputEmail` |
| `app-client-44-conta-carteira.html` | Carteira | `RadioCard`, `Card`, `Button` |

As telas implementadas divergem dos protótipos em vários pontos (ex.: status do pedido usa `DarkInformationBox(Large)` em vez de `StatusBanner`). O `CONTEXT.md` de cada app descreve a tela real.
