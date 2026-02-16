# Política de branch para evitar conflitos de PR

Para evitar conflitos recorrentes no `index.html` e travamentos ao atualizar PR:

1. **Sempre criar uma branch nova por tarefa** a partir da branch base atualizada.
2. **Nunca reutilizar branch antiga** para tarefas diferentes.
3. **Manter PR pequeno e focado** (ideal: 1 objetivo, poucos arquivos).
4. Antes de abrir PR, executar:
   - `git fetch origin`
   - `git rebase origin/<branch-base>`
5. Se houver conflito, resolver localmente e fazer push do branch (evitar resolver no editor web em PRs longos).

## Fluxo recomendado

```bash
git fetch origin
git checkout <branch-base>
git pull --ff-only origin <branch-base>
git checkout -b chore/<tarefa-curta>
# ... mudanças ...
git add .
git commit -m "<mensagem>"
git push -u origin chore/<tarefa-curta>
```

## Regra prática para este repositório

- Mudanças de layout em `index.html` devem ser separadas de mudanças de infra (deploy/preview/workflows).
- Não misturar SEO, design e automação de deploy no mesmo PR.
