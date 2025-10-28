# Como utilizar - InputPhone

O componente `InputPhone` é uma caixa de texto especializada para captura de números de telefone brasileiros. Ele oferece validação automática para celulares e telefones fixos, máscara de formatação e teclado otimizado para melhor experiência do usuário.

## Importação

```typescript
import { InputPhone } from "lavex-design-system";
```

## Props

| Prop           | Tipo       | Obrigatório | Descrição                                                     |
| -------------- | ---------- | ----------- | ------------------------------------------------------------- |
| `value`        | `string`   | Sim         | O valor atual do campo de telefone                            |
| `onChange`     | `function` | Sim         | Função chamada quando o valor muda                            |
| `label`        | `string`   | Não         | Texto do rótulo (padrão: "Telefone")                          |
| `placeholder`  | `string`   | Não         | Texto de placeholder (padrão: "(00) 00000-0000")              |
| `errorMessage` | `string`   | Não         | Mensagem de erro (padrão: "Telefone deve ter formato válido") |

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

## Boas Práticas

1. **Use para captura de telefone**: Reserve este componente especificamente para campos de telefone
2. **Validação específica**: O componente já valida formatos brasileiros automaticamente
3. **Feedback visual**: Fornece feedback visual para estados de erro
4. **Acessibilidade**: Mantenha labels descritivos para melhor acessibilidade
5. **Teste com telefones válidos**: Use números de teste para desenvolvimento
6. **Limite de dígitos**: Confie na limitação automática de 11 dígitos do componente
