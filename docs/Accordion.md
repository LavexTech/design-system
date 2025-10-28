# Accordion Component

O componente Accordion permite criar seções expansíveis/colapsáveis para organizar conteúdo de forma compacta.

## Importação

```tsx
import { Accordion, AccordionItem } from "lavex-design-system";
```

## Props

### Accordion

| Prop      | Tipo              | Obrigatório | Descrição                    |
| --------- | ----------------- | ----------- | ---------------------------- |
| `children` | `React.ReactNode` | Sim         | Lista de AccordionItem       |

### AccordionItem

| Prop      | Tipo              | Obrigatório | Descrição                    |
| --------- | ----------------- | ----------- | ---------------------------- |
| `id`      | `string`          | Sim         | Identificador único do item  |
| `title`   | `string`          | Sim         | Texto do cabeçalho          |
| `children` | `React.ReactNode` | Sim         | Conteúdo expandível          |

## O que faz

- Container com múltiplos itens expansíveis
- Cada item pode ser expandido/colapsado independentemente
- Ícone + / - muda automaticamente conforme estado
- Divisor automático entre accordions
- Fundo branco com bordas arredondadas

## Exemplo Básico

```tsx
<Accordion>
  <AccordionItem id="item-1" title="Primeiro Item">
    <Text text="Conteúdo do primeiro item." />
  </AccordionItem>
  <AccordionItem id="item-2" title="Segundo Item">
    <Text text="Conteúdo do segundo item." />
  </AccordionItem>
</Accordion>
```

## Exemplos de Uso

```tsx
// FAQ simples
<Accordion>
  <AccordionItem id="faq-1" title="Como funciona?">
    <Text text="Explicação detalhada aqui." />
  </AccordionItem>
  <AccordionItem id="faq-2" title="Quanto custa?">
    <Text text="Informações sobre preços." />
  </AccordionItem>
</Accordion>

// Com conteúdo rico
<Accordion>
  <AccordionItem id="details" title="Detalhes do Produto">
    <Grid columns={1} gap={4}>
      <Title text="Especificações" />
      <Text text="• Material: Algodão 100%" />
      <Text text="• Tamanho: P, M, G, GG" />
    </Grid>
  </AccordionItem>
</Accordion>
```

## Como funciona

1. **Accordion**: Container principal que agrupa os itens
2. **AccordionItem**: Item individual com título e conteúdo
3. **Estado**: Cada item controla sua própria expansão
4. **Ícones**: + quando fechado, - quando aberto
5. **Divisor**: Linha separadora automática no final

## Observações

- Cada `id` deve ser único dentro do mesmo Accordion
- Itens começam fechados por padrão
- Suporta qualquer conteúdo React nos children
- Usa gluestack-ui internamente para acessibilidade


