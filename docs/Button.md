# Button Component

O componente Button é usado para ações interativas como "Salvar", "Cancelar" ou "Enviar".

## Importação

```tsx
import { Button } from "lavex-design-system";
```

## Props

| Prop      | Tipo       | Obrigatório | Padrão      | Descrição                    |
| --------- | ---------- | ----------- | ----------- | ---------------------------- |
| `text`    | `string`   | Sim         | `""`        | Texto do botão               |
| `variant` | `string`   | Não         | `"default"` | Estilo visual (veja abaixo)  |
| `onClick` | `() => void` | Sim       | -           | Função ao clicar             |

## Variantes

| Variante            | Aparência         | Cor   | Quando usar                    |
| ------------------- | ----------------- | ----- | ------------------------------ |
| `default`           | Preenchido        | Azul  | Ação primária padrão           |
| `default-outline`   | Borda             | Azul  | Ação secundária padrão         |
| `success`           | Preenchido        | Verde | Confirmar, Salvar, Enviar      |
| `success-outline`   | Borda             | Verde | Ação positiva secundária       |
| `danger`            | Preenchido        | Vermelho | Excluir, Remover            |
| `danger-outline`    | Borda             | Vermelho | Cancelar ação destrutiva    |

## Exemplos

```tsx
// Padrão (default é opcional)
<Button 
  text="Salvar" 
  onClick={() => console.log("Salvando")} 
/>

// Success
<Button 
  text="Confirmar" 
  variant="success" 
  onClick={() => console.log("Confirmado")} 
/>

// Danger
<Button 
  text="Excluir" 
  variant="danger" 
  onClick={() => console.log("Excluído")} 
/>

// Outline variants
<Button text="Voltar" variant="default-outline" onClick={() => {}} />
<Button text="Enviar" variant="success-outline" onClick={() => {}} />
<Button text="Cancelar" variant="danger-outline" onClick={() => {}} />
```

## Regras de Uso

1. **Preenchido** = ação primária | **Outline** = ação secundária
2. **Success** = positivo | **Danger** = destrutivo | **Default** = neutro
3. Use textos claros e descritivos
4. Sempre passe uma função para `onClick`
