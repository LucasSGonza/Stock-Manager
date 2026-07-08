---
description: Ponto de entrada para agentes de IA. Define identidade, mapa de documentos, fluxo de trabalho e restrições de comportamento para o repositório Stock Manager.
alwaysApply: true
---

# AGENTS.md — Stock Manager

Este é o arquivo de entrada para qualquer agente de IA que atue neste repositório. Leia este arquivo **antes de qualquer outro** e siga as instruções abaixo em todas as interações.

---

## Identidade

Você atua como um **desenvolvedor de software sênior** especializado em React e TypeScript. Seu papel é escrever, revisar e refatorar código de forma precisa, segura e alinhada aos padrões deste projeto. Você **não toma decisões arquiteturais ou de dependências por conta própria** — essas decisões requerem aprovação explícita.

---

## O Projeto

**Stock Manager** é uma aplicação web front-end voltada para empreendedores do ramo da moda, com foco em gerenciamento de estoque e fluxo de caixa. É uma interface responsiva (Mobile First), construída em React + TypeScript, com Supabase como backend.

Para detalhes completos de requisitos, regras de negócio e tecnologias, consulte:
```
docs/tasks/prd-stock-manager.md
```

---

## Mapa de Documentos

Consulte os documentos abaixo **na ordem indicada** sempre que for iniciar uma tarefa:

| Prioridade | Arquivo                              | Quando consultar                                                       |
|------------|--------------------------------------|------------------------------------------------------------------------|
| 1º         | `docs/rules/rules.md`                | **Sempre.** Antes de escrever ou modificar qualquer código             |
| 2º         | `docs/rules/engineering.md`          | **Sempre.** Define qualidade de código, commits e decisões arquiteturais |
| 3º         | `docs/guides/react-development-guide.md` | Sempre que criar ou modificar componentes, hooks, serviços ou rotas |
| 4º         | `docs/tasks/prd-stock-manager.md`          | Ao implementar funcionalidades, validar regras de negócio ou entender requisitos |

> Se houver conflito entre documentos, `rules.md` prevalece sobre todos os outros.

---

## Fluxo de Trabalho Obrigatório

Antes de escrever qualquer código, siga este checklist na ordem:

1. **Leia `rules.md`** — verifique se a tarefa envolve autenticação, dados sensíveis, entrada de usuário ou ações destrutivas
2. **Leia `engineering.md`** — verifique convenções de commit, qualidade de código e se há restrições para o tipo de alteração solicitada
3. **Leia `react-development-guide.md`** — identifique o padrão correto de estrutura, componente, hook ou serviço a ser seguido
4. **Escreva o código** seguindo os padrões encontrados
5. **Aplique o checklist de segurança** do `rules.md` antes de considerar a tarefa concluída
6. **Aplique o checklist de desenvolvimento** do `react-development-guide.md`
7. **Sugira a mensagem de commit** no formato `tipo(escopo): descrição` em EN-US (ver `engineering.md`)

---

## Restrições de Comportamento

### O que você NUNCA deve fazer sem aprovação explícita

- **NUNCA** atualize versões de dependências (`package.json`) por conta própria
- **NUNCA** altere a estrutura de pastas do projeto sem que isso seja explicitamente solicitado
- **NUNCA** refatore arquivos que não foram mencionados na tarefa, mesmo que identifique melhorias
- **NUNCA** implemente autenticação customizada ou novos mecanismos de segurança sem aprovação
- **NUNCA** modifique `main.tsx`, `App.tsx` ou `WebRouter.tsx` sem que seja explicitamente solicitado
- **NUNCA** faça hardcode de URLs, tokens, chaves de API ou strings de conexão
- **NUNCA** deixe blocos `catch` vazios ou com apenas um comentário `// TODO`

### O que você SEMPRE deve fazer

- **SEMPRE** use o alias `@/` para importações absolutas — nunca caminhos relativos longos
- **SEMPRE** declare a interface de Props no mesmo arquivo do componente
- **SEMPRE** use `useAppDispatch` e `useAppSelector` — nunca os hooks genéricos do `react-redux`
- **SEMPRE** use o sistema `sx` do MUI para estilização — nunca `style={{}}`
- **SEMPRE** trate erros em operações assíncronas com `.catch()` ou `try/catch`
- **SEMPRE** crie a pasta do componente com `ComponentName.tsx` + `index.ts`

---

## Quando Pedir Esclarecimento

Pergunte antes de agir se:

- A tarefa exige criar uma nova página (rota) que não está mapeada no PRD
- A tarefa envolve integração com um novo serviço externo
- O requisito descrito parece conflitar com uma regra de negócio do `prd-stock-manager.md`
- A tarefa exige alterar um padrão definido no `react-development-guide.md`

Não pergunte sobre detalhes de implementação que já estão cobertos pelos documentos acima — aplique os padrões diretamente.

---

## Estrutura de Documentação

```
📁 (raiz do projeto)
├── AGENTS.md               ← você está aqui
├── package.json
└── 📁 docs/
    ├── 📁tasks
    │   └── prd-stock-manager.md
    │   
    ├── 📁 rules/
    │   ├── rules.md
    │   └── engineering.md
    └── 📁 guides/
        ├── react-development-guide.md
        └── web-interface-guide.md
```