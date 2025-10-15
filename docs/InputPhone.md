# Como utilizar - InputPhone

O componente `InputPhone` é uma caixa de texto especializada para captura de números de telefone brasileiros. Ele oferece validação automática para celulares e telefones fixos, máscara de formatação e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputPhone } from "lavex-design-system";
// ou
import { InputPhone, type InputPhoneProps } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                     |
| -------------- | ---------- | ----------- | ------------------------------------------------------------- |
| `value`        | `string`   | ✅          | O valor atual do campo de telefone                            |
| `onChange`     | `function` | ✅          | Função chamada quando o valor muda                            |
| `label`        | `string`   | ❌          | Texto do rótulo (padrão: "Telefone")                          |
| `placeholder`  | `string`   | ❌          | Texto de placeholder (padrão: "(00) 00000-0000")              |
| `errorMessage` | `string`   | ❌          | Mensagem de erro (padrão: "Telefone deve ter formato válido") |

## Uso Básico

```tsx
import React, { useState } from "react";
import { InputPhone } from "lavex-design-system";

const MyComponent = () => {
  const [phone, setPhone] = useState("");

  return <InputPhone value={phone} onChange={setPhone} />;
};
```

## Exemplos de Uso

### Uso Padrão

```tsx
<InputPhone value={phone} onChange={setPhone} />
```

### Com Label Customizada

```tsx
<InputPhone value={phone} onChange={setPhone} label="Número do Celular" />
```

### Com Placeholder Customizado

```tsx
<InputPhone value={phone} onChange={setPhone} placeholder="(11) 99999-9999" />
```

### Com Mensagem de Erro Customizada

```tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  errorMessage="Por favor, insira um telefone válido"
/>
```

### Configuração Completa

```tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  label="Telefone de Contato"
  placeholder="(00) 00000-0000"
  errorMessage="Telefone deve ser válido e ter 10 ou 11 dígitos"
/>
```

## Validação

O componente inclui validação específica para telefones brasileiros que verifica:

- **Formato**: Aplica máscara dinâmica que se adapta ao número de dígitos
- **Dígitos**: Deve ter 10 dígitos (DDD + 8) ou 11 dígitos (DDD + 9)

### Regras de Validação

1. **Telefone Fixo (10 dígitos)**:

   - Formato: `(XX) XXXX-XXXX`
   - DDD (2) + 8 dígitos
   - Exemplo: `(41) 9856-2124`

2. **Celular (11 dígitos)**:
   - Formato: `(XX) XXXXX-XXXX`
   - DDD (2) + 9 dígitos
   - Exemplo: `(41) 98234-1234`

### Comportamento da Validação

- **Campo vazio**: Considerado válido (não obrigatório)
- **Telefone inválido**: Mostra mensagem de erro e borda vermelha
- **Telefone válido**: Remove mensagem de erro e borda normal
- **Limitação de dígitos**: Automaticamente limita a entrada a 11 dígitos máximos
- **Reset de erro**: Quando um número inválido é truncado para um válido, o estado de erro é automaticamente resetado

## Máscara Automática

O componente aplica automaticamente uma máscara dinâmica que se adapta ao número de dígitos:

### Exemplos:

- **Digitação**: `4198562124` → `(41) 9856-2124`
- **Digitação**: `41982341234` → `(41) 98234-1234`
- **Backspace**: Remove caracteres da direita para esquerda
- **Paste**: Formata automaticamente números colados

## Limitação de Dígitos

O componente possui proteção contra entrada excessiva de dígitos:

### Comportamento:

- **Máximo 11 dígitos**: Automaticamente trunca valores acima de 11 dígitos
- **Validação inteligente**: Após o truncamento, revalida o número resultante
- **Reset automático**: Se o número truncado for válido, remove automaticamente o estado de erro
- **Experiência fluida**: O usuário não vê estados de erro incorretos ao digitar além do limite


## Teclado Otimizado

O componente automaticamente configura o teclado numérico (`keyboardType="phone-pad"`), proporcionando:

- Acesso rápido aos números
- Melhor experiência de digitação
- Redução de erros de entrada

### Implementação Técnica

O componente gerencia internamente seu estado de validação:

```typescript
// Validação executada após aplicar máscara
const handleChange = (text: string) => {
  const maskedValue = applyPhoneMask(text)
  onChange(maskedValue)
  
  // Valida o valor após aplicar a máscara
  const valid = validatePhone(maskedValue)
  setIsValid(valid)
};
```

## Boas Práticas

1. **Use para captura de telefone**: Reserve este componente especificamente para campos de telefone
2. **Validação específica**: O componente já valida formatos brasileiros automaticamente
3. **Feedback visual**: Fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste com telefones válidos**: Use números de teste para desenvolvimento
6. **Limite de dígitos**: Confie na limitação automática de 11 dígitos do componente

## Telefones de Teste

Para desenvolvimento e testes, você pode usar estes telefones válidos:

### Telefones Fixos

- `(11) 3333-4444`
- `(21) 3232-1234`
- `(85) 3456-7890`

### Celulares

- `(11) 99999-9999`
- `(21) 98765-4321`
- `(85) 91234-5678`

### Telefones Inválidos

- `(11) 333-444` (muito curto)
- `(11) 99999-99999` (muito longo)
