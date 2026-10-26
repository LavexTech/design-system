# Instruções para agentes — design-system

Antes de mudar qualquer coisa, leia [`CONTEXT.md`](./CONTEXT.md). Ele explica o produto, a estrutura, os padrões e aponta para o arquivo de `context/` que cobre o assunto (tokens e tema, catálogo de componentes, ícones, consumidores, dívidas).

Regras curtas:

- Descreva e respeite o **código real**; os valores do contexto foram conferidos no código.
- Cor que acompanha o tema vem de `useLavexTheme()`; o resto de `Constants.styles`. Sem Tailwind/`className` nos componentes.
- Componente novo: `src/components/<Nome>/<Nome>.tsx`, export no `index.ts`, exemplo no `demo/`.
- Verifique com `npm run typecheck` (não há testes nem CI).
- No mesmo PR: atualize `CONTEXT.md`/`context/*.md` e faça bump de `version` no `package.json`.
- Antes de mudar aparência ou contrato, veja quem usa em `context/consumidores.md`.
