# Button Component

O componente Button é usado para ações interativas como "Salvar", "Cancelar" ou "Enviar".

## Importação

```tsx
import { Button } from "lavex-design-system";
```

## Props

| Prop                 | Tipo         | Obrigatório | Padrão      | Descrição                                                                 |
| -------------------- | ------------ | ----------- | ----------- | ------------------------------------------------------------------------- |
| `text`               | `string`     | Sim         | `""`        | Texto do botão                                                            |
| `variant`            | `string`     | Não         | `"default"` | Estilo visual (veja abaixo)                                               |
| `onClick`            | `() => void` | Sim         | -           | Função ao clicar (só dispara após confirmação se `needsConfirmation`)     |
| `needsConfirmation`  | `boolean`    | Não         | `false`     | Exige segundo clique para confirmar a ação                                |
| `confirmationText`   | `string`     | Se `needsConfirmation` | - | Texto exibido no estado de confirmação (obrigatório quando a prop acima é `true`) |

## Variantes

| Variante            | Aparência         | Cor   | Quando usar                    |
| ------------------- | ----------------- | ----- | ------------------------------ |
| `default`           | Preenchido        | Azul  | Ação primária padrão           |
| `default-outline`   | Borda             | Azul  | Ação secundária padrão         |
| `success`           | Preenchido        | Verde | Confirmar, Salvar, Enviar      |
| `success-outline`   | Borda             | Verde | Ação positiva secundária       |
| `danger`            | Preenchido        | Vermelho | Excluir, Remover            |
| `danger-outline`    | Borda             | Vermelho | Cancelar ação destrutiva    |
| `primary`           | Preenchido        | Personalizado | Ação primária customizada      |
| `secondary`         | Preenchido        | Personalizado | Ação secundária customizada    |
| `secondary-outline` | Borda             | Personalizado | Ação secundária com borda      |

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

// Primary e Secondary (estilos customizados)
<Button text="Ação Principal" variant="primary" onClick={() => {}} />
<Button text="Ação Secundária" variant="secondary" onClick={() => {}} />
<Button text="Secundária Outline" variant="secondary-outline" onClick={() => {}} />
```

## Confirmação em dois cliques

Quando `needsConfirmation={true}`, o primeiro clique **não** chama `onClick`: o botão anima (300ms) para estilo danger (fundo vermelho, texto branco) e troca o rótulo por `confirmationText`. O segundo clique confirma e dispara `onClick`. Sem segundo clique, após 8 segundos o botão volta ao estado original.

```tsx
<Button
  text="Excluir"
  variant="danger-outline"
  needsConfirmation
  confirmationText="Clique novamente para confirmar"
  onClick={() => console.log("Excluído")}
/>
```

## Regras de Uso

1. **Preenchido** = ação primária | **Outline** = ação secundária
2. **Success** = positivo | **Danger** = destrutivo | **Default** = neutro
3. Use textos claros e descritivos
4. Sempre passe uma função para `onClick`
5. Se `needsConfirmation` for `true`, `confirmationText` é obrigatório
