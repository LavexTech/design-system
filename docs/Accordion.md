# Accordion Component

O componente `Accordion` foi atualizado para usar o **gluestack-ui**, fornecendo uma implementação robusta, acessível e com melhor performance.

## Instalação

O componente Accordion agora depende do pacote `@gluestack-ui/accordion`:

```bash
npm install @gluestack-ui/accordion
```

## Estrutura

O Accordion foi implementado em duas camadas:

1. **Camada Base (ui-gluestack)**: Localizada em `src/ui-gluestack/accordion/`, contém a configuração do gluestack com componentes base do React Native.

2. **Camada de Componente**: Localizada em `src/components/Accordion/`, expõe uma interface simples e consistente mantendo a API original do componente.

## Uso Básico

```tsx
import { Accordion } from "lavex-design-system";

function MyComponent() {
  return (
    <Accordion text="Título do Accordion">
      <Text>Conteúdo que será exibido quando expandido.</Text>
    </Accordion>
  );
}
```

## Props

### AccordionProps

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `text` | `string` | Sim | Texto exibido no cabeçalho do accordion |
| `children` | `React.ReactNode` | Sim | Conteúdo que será mostrado quando o accordion estiver expandido |
| `onClick` | `() => void` | Não | Função callback chamada quando o accordion é clicado |

## Exemplos

### Accordion Simples

```tsx
<Accordion text="O que é um FAQ?">
  <Text>
    FAQ significa 'Perguntas Frequentes' e é usado para organizar 
    informações comuns.
  </Text>
</Accordion>
```

### Múltiplos Accordions

```tsx
<>
  <Accordion text="Pergunta 1">
    <Info text="Resposta para a primeira pergunta." />
  </Accordion>
  
  <Accordion text="Pergunta 2">
    <Info text="Resposta para a segunda pergunta." />
  </Accordion>
  
  <Accordion text="Pergunta 3" onClick={() => console.log("Clicado!")}>
    <Info text="Resposta para a terceira pergunta." />
  </Accordion>
</>
```

### Com Conteúdo Rico

```tsx
<Accordion text="Detalhes do Produto">
  <Grid columns={1} gap={8}>
    <Title text="Especificações" />
    <Text text="• Material: Algodão 100%" />
    <Text text="• Tamanho: P, M, G, GG" />
    <Text text="• Cores: Azul, Preto, Branco" />
    <Info text="Produto nacional com garantia de 90 dias." />
  </Grid>
</Accordion>
```

## Características

### Acessibilidade

O Accordion implementado com gluestack-ui segue as diretrizes ARIA e garante:

- Navegação por teclado completa
- Suporte a leitores de tela
- Estados adequados para foco e interação

### Performance

- Animações suaves nativas
- Renderização otimizada
- Gestão eficiente de estado

### Estilização

O componente usa as constantes de estilo do design system:

```tsx
{
  backgroundColor: Constants.styles.backgroundColor.WHITE,
  borderRadius: Constants.styles.borderRadius.MEDIUM,
  borderWidth: Constants.styles.borderWidth.THIN,
  borderColor: Constants.styles.borderColor.LIGHT,
  fontFamily: Constants.styles.fontFamily.REGULAR,
  fontSize: Constants.styles.fontSize.LARGE,
  color: Constants.styles.textColor.DEFAULT,
}
```

## Comportamento

1. **Estado Inicial**: O accordion começa fechado (colapsado)
2. **Ao Clicar**: Expande para mostrar o conteúdo
3. **Clicar Novamente**: Colapsa o conteúdo
4. **Callback**: Se fornecido, `onClick` é chamado em cada interação

## Implementação Técnica

O componente utiliza:

- **@gluestack-ui/accordion**: Para a lógica e estrutura base
- **React Native**: Para os componentes visuais
- **TypeScript**: Para type safety

### Componentes Internos (gluestack)

A implementação interna do gluestack usa os seguintes subcomponentes:

- `Accordion`: Container principal
- `Accordion.Item`: Item individual do accordion
- `Accordion.Header`: Cabeçalho clicável
- `Accordion.Trigger`: Área clicável que controla a expansão
- `Accordion.TitleText`: Texto do título
- `Accordion.Icon`: Ícone de estado (+ / -)
- `Accordion.Content`: Área de conteúdo expandível

## Migração da Versão Anterior

Se você estava usando a versão anterior do Accordion, não precisa alterar seu código! A API permanece a mesma:

```tsx
// Versão antiga e nova - mesma API
<Accordion text="Título" onClick={handleClick}>
  {children}
</Accordion>
```

A principal diferença é interna: agora usa gluestack-ui para melhor performance e acessibilidade.

## Notas

- O accordion suporta apenas um item por vez (type="single")
- É colapsável por padrão (isCollapsible={true})
- Mantém a consistência visual com outros componentes do design system
- Totalmente compatível com React Native e Expo

## Veja Também

- [Grid Component](./Grid.md)
- [Card Component](../src/components/Card/Card.tsx)
- [Info Component](./Info.md)

