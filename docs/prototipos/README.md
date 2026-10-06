# Protótipos — linguagem visual 2.0

21 telas de alta fidelidade do app do cliente, em HTML estático. São a **especificação visual** da migração 2.0 do design system (épico [#205](https://github.com/LavexTech/design-system/issues/205)).

Para abrir, dê duplo clique no arquivo `.html` — ele roda em qualquer navegador, sem servidor. A fonte Plus Jakarta Sans vem do Google Fonts, então a primeira abertura precisa de internet. Os arquivos declaram uma moldura de 390 × 844 px (iPhone 14), que é a referência de layout.

Os valores de cor, raio, altura, espaçamento e tipografia nos atributos `style` **são** a especificação: ao implementar um componente, leia o `style` do elemento correspondente no protótipo em vez de medir a imagem.

Não edite os arquivos. Qualquer ajuste de design nasce de um protótipo novo, não de um `style` corrigido aqui.

## Telas

| Arquivo | Tela | Componentes do DS em destaque |
|---|---|---|
| `app-client-01-login.html` | Login | `TopHeader` centralizado, `Input`, `InputPassword`, `Button` primário, ação textual |
| `app-client-02-cadastro.html` | Cadastro | família `Input` completa, `Button` |
| `app-client-03-recuperacao-senha.html` | Esqueci minha senha | `TopHeader` centralizado, `InputEmail`, `Button` |
| `app-client-10-novo-pedido.html` | Novo pedido (vazio) | `TopHeader`, `EmptyState`, `Button` |
| `app-client-11-selecao-itens.html` | Adicionar peças | `SearchInput`, `Accordion` com contagem, `CheckboxListItem` |
| `app-client-12-edicao-itens.html` | Peças adicionadas | `QuantityStepper`, `List` |
| `app-client-13-add-fotos.html` | Fotos do pedido | `ImageUploader` |
| `app-client-14-entrega-e-pagamento.html` | Detalhes do pedido | `RadioCard`, `Button` primário e desabilitado |
| `app-client-20-historico.html` | Histórico | `SearchInput`, `Tag`, `EmptyState`, `NavigationBar` |
| `app-client-30-pedido-aguardando-ofertas.html` | Aguardando ofertas | `AnimatedStatusIndicator`, `StatusBanner` info |
| `app-client-31-pedido-ofertas-disponiveis.html` | Ofertas recebidas | `RadioCard` com conteúdo rico, `ProfileAvatar`, `Stars` |
| `app-client-32-pedido-oferta-escolhida-pendente-coleta.html` | Pedido confirmado | `Timeline`, `Tag`, `Button` |
| `app-client-33-pedido-iniciado.html` | Pedido em andamento | `Timeline` com etapa atual, `StatusBanner` escuro |
| `app-client-34-pedido-finalizado.html` | Avaliar o serviço | `Timeline` concluída, `StarRating`, `TextArea` |
| `app-client-35-pedido-cancelado.html` | Pedido cancelado | `StatusBanner`, `Tag` de erro |
| `app-client-36-pedido-chat.html` | Conversa com a Lavexer | `Message` enviada e recebida, `InputChat` |
| `app-client-40-conta.html` | Minha conta | `TopHeader`, `ProfileAvatar`, lista de ações, `Button` destrutivo |
| `app-client-41-conta-editar-perfil.html` | Editar perfil | `ProfileAvatar`, `Input`, `TextArea` com contador |
| `app-client-42-conta-editar-endereco.html` | Seu endereço | família `Input` |
| `app-client-43-conta-editar-contato.html` | Editar contato | `InputPhone`, `InputEmail` |
| `app-client-44-conta-carteira.html` | Carteira | `RadioCard`, `Card`, `Button` |

## Não cobertas por protótipo

O app do prestador (`app-provider-lavex`) ainda não tem telas 2.0. Até existirem, ele só acompanha a repintura dos componentes — ver `../migracao-2.0.md`.
