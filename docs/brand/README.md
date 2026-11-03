# Marca

Arquivos da logo da Lavex e das animações feitas a partir dela. Todos os SVGs animados usam SMIL (`<animate>`/`<animateTransform>`), rodam sozinhos no navegador e têm fundo transparente.

## Cores

| Uso | Cor |
|---|---|
| Traço claro, para fundo escuro (app Lavexer) | `#2FB5AF` |
| Traço escuro, para fundo claro (app client) | `#0A7370` |

## Arquivos

| Arquivo | O que é |
|---|---|
| `logo-lavex.svg` | Logo original completa (símbolo, escrita "lavex" e ®). |
| `animacoes/lavex-giro-verde-*-transparente.svg` | **Loading oficial.** O tambor da máquina, desconectado da casa, gira uma volta no sentido horário, pausa, gira uma volta no anti-horário e pausa, em loop. Ciclo de 3 s (1,3 s por volta, 0,2 s de pausa). É a base do componente `Loading`/`LoadingIcon`. |
| `animacoes/lavex-logo-animada-verde-*-transparente.svg` | Abertura usada na splash dos apps: o traço se desenha a partir do gancho do cabide, a escrita "lavex" entra da esquerda para a direita e o ® pisca 0,5 s depois. |
| `animacoes/lavex-ondas-verde-*-transparente.svg` | Alternativa com as ondinhas do meio ondulando como água: senoide com o eixo oscilando em gangorra. Guardada como opção, não está em uso. |

## No código

O loading de uso geral é o componente `Loading` (overlay em tela cheia) ou `LoadingIcon` (só o ícone), em `src/components/Loading/`. Ele mostra só o símbolo, sem a escrita e sem o ®, e reproduz a animação "giro" com Reanimated. A geometria fica em `lavexIconGeometry.ts`, gerada a partir de `logo-lavex.svg`.
