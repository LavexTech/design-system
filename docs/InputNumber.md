# InputNumber

Campo de texto especializado para captura de números com validação de valor mínimo, máximo, restrição de comprimento e máscara automática com espaços a cada 4 dígitos.

## Importação

```typescript
import { InputNumber } from "lavex-design-system";
```

## Props

| Prop           | Tipo                          | Obrigatório | Descrição                                                  |
| -------------- | ----------------------------- | ----------- | ---------------------------------------------------------- |
| `value`        | `string`                      | Sim         | Valor atual do campo numérico                              |
| `onChange`     | `(value: string) => void`     | Sim         | Função chamada quando o valor muda                         |
| `label`        | `string`                      | Não         | Texto do rótulo (padrão: "Número")                        |
| `placeholder`  | `string`                      | Não         | Texto placeholder (padrão: "Digite um número")            |
| `errorMessage` | `string`                      | Não         | Mensagem de erro (padrão: "Número inválido")              |
| `darkMode`     | `boolean`                     | Não         | Ativa o modo escuro (padrão: false)                       |
| `fontScale`    | `number`                      | Não         | Escala da fonte (padrão: 1)                               |
| `min`          | `number`                      | Não         | Valor mínimo permitido (validado apenas na validação)     |
| `max`          | `number`                      | Não         | Valor máximo permitido (validado apenas na validação)     |
| `length`       | `number`                      | Não         | Quantidade máxima de dígitos (restrito durante digitação) |

## O que faz

- Campo de texto especializado para entrada de números
- Aceita apenas dígitos numéricos (0-9)
- **Máscara automática**: Adiciona espaços a cada 4 dígitos (ex: 1234 5678 9012)
- Validação automática de valor mínimo e máximo
- Restrição de comprimento durante a digitação
- Teclado numérico otimizado para mobile
- Mensagens de erro específicas para cada tipo de validação
- Estilos consistentes com o design system

## Exemplo Básico

```tsx
import { InputNumber } from "lavex-design-system";
import { useState } from "react";

const [quantity, setQuantity] = useState("");

<InputNumber
  label="Quantidade"
  value={quantity}
  placeholder="Digite a quantidade"
  onChange={setQuantity}
/>
```

## Exemplo com Valor Mínimo e Máximo

```tsx
const [age, setAge] = useState("");

<InputNumber
  label="Idade"
  value={age}
  placeholder="Digite sua idade"
  onChange={setAge}
  min={0}
  max={120}
  errorMessage="Idade deve estar entre 0 e 120 anos"
/>
```

## Exemplo com Restrição de Comprimento

```tsx
const [code, setCode] = useState("");

<InputNumber
  label="Código"
  value={code}
  placeholder="Digite o código de 6 dígitos"
  onChange={setCode}
  length={6}
/>
// Resultado: "1234 56" (máscara aplicada automaticamente)
```

## Exemplo Completo

```tsx
const [price, setPrice] = useState("");

<InputNumber
  label="Preço"
  value={price}
  placeholder="Digite o preço"
  onChange={setPrice}
  min={1}
  max={9999}
  length={4}
/>
```

## Exemplo com Validação Personalizada

```tsx
const [score, setScore] = useState("");

<InputNumber
  label="Pontuação"
  value={score}
  placeholder="0 a 100"
  onChange={setScore}
  min={0}
  max={100}
  length={3}
  errorMessage="Pontuação deve estar entre 0 e 100"
/>
// Resultado: "100" (sem espaços pois tem apenas 3 dígitos)
```

## Exemplo para Cartão de Crédito

```tsx
const [cardNumber, setCardNumber] = useState("");

<InputNumber
  label="Número do Cartão"
  value={cardNumber}
  placeholder="0000 0000 0000 0000"
  onChange={setCardNumber}
  length={16}
  errorMessage="Número do cartão inválido"
/>
// Resultado: "1234 5678 9012 3456" (máscara aplicada automaticamente)
```

## Como funciona

1. **Filtragem de entrada**: Remove automaticamente caracteres não numéricos durante a digitação
2. **Máscara automática**: Adiciona espaços a cada 4 dígitos conforme o usuário digita
3. **Restrição de comprimento**: Limita o número de dígitos conforme a prop `length`
4. **Validação de intervalo**: Verifica se o valor está dentro do intervalo `min` e `max`
5. **Mensagens dinâmicas**: Exibe mensagens de erro específicas para cada tipo de validação
6. **Teclado otimizado**: Usa `mobileKeyboard="number"` para facilitar entrada em dispositivos móveis

## Validações

- **Formato**: Aceita apenas números (0-9)
- **Valor mínimo**: Valida se o número é maior ou igual ao `min` especificado
- **Valor máximo**: Valida se o número é menor ou igual ao `max` especificado
- **Comprimento**: Restringe a quantidade de dígitos durante a digitação

## Mensagens de Erro

O componente gera mensagens de erro específicas:

- Valor menor que o mínimo: "Valor deve ser maior ou igual a {min}"
- Valor maior que o máximo: "Valor deve ser menor ou igual a {max}"
- Formato inválido: Usa a `errorMessage` personalizada ou padrão

## Estilos

Herda todos os estilos do componente `Input` base:

- **Background**: Branco (modo claro) / Cinza escuro (modo escuro)
- **Border**: Padrão do design system
- **Border error**: Vermelho quando validação falha
- **Teclado**: Numérico no mobile

## Observações

- O valor é sempre retornado como string, incluindo os espaços da máscara
- A máscara adiciona espaços automaticamente a cada 4 dígitos durante a digitação
- A restrição de `length` é aplicada aos dígitos (sem contar os espaços)
- As validações de `min` e `max` são aplicadas apenas aos números (ignorando espaços)
- Caracteres não numéricos são automaticamente removidos (exceto espaços da máscara)
- Campo é sempre controlado (precisa de `value` e `onChange`)
- Para obter apenas os números sem espaços, use: `value.replace(/\s/g, "")`