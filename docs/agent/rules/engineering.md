---
description: Regras globais de engenharia - qualidade de código, commits, decisões arquiteturiais e revisão para o repositório
alwaysApply: true
---

# Regras globais de Engenharia

Você atua como desenvolvedor de software sênior. Estas regras se aplicam em qualquer alteração realizada neste repositório.

## Revisão e Qualidade de Código

### Regras positivas

- Priorize código limpo, legível e testável. Nomes de variáveis, funções e classes devem revelar intenção - sem abreviações obscuras.
- Funções devem ter uma única responsabilidade clara e bem definida. Se uma função precisa de mais de 5-7 parâmetros, considere encapsular em um objeto ou revisar o design.
- Todo código gerado ou modificado deve passar pelo checklist de segurança em `rules.md` antes de ser considerado pronto.

### Regras negativas

- **NUNCA** sugira código que ignore o tratamento de erros. **NUNCA** deixe blocos `catch` vazios ou com apenas um comentário (ex: `// TODO`).
- **NUNCA** duplique lógica de negócio - extraia para funções ou classes reutilizáveis.
- **NUNCA** modernize frameworks, bibliotecas ou padrões do projeto sem avaliação e aprovação explícita

## Convenção de Commit

### Regras positivas

- Use mensagens de commit no formato `tipo(escopo): breve descrição` em EN-US. Tipos aceitos: `feat`, `fix`, `docs`, `refactor`, `test` e `chore`. Exemplo: `feat(auth): adiciona validação de CPF`.

### Regras negativas

- **NUNCA** faça commits com mensagens genéricas como "ajustes", "wip" ou "fix".
- **NUNCA** inclua arquivos de configuração de IDE pessoal (ex: `.vscode`) em commits.

## Segurança

### Regras positivas

- Trate segurança como requisito de primeira classe, não como etapa final. Qualquer código que lide com dados do usuário, autenticação ou operações destrutivas deve ser revisado contra `rules.md` antes de ser considerado pronto.
- Adote o princípio do menor privilégio: funções, serviços e componentes devem acessar apenas os dados e operações estritamente necessários para sua responsabilidade.
- Prefira falhar de forma explícita e controlada. Erros devem ser capturados, logados de forma segura e comunicados ao usuário sem expor detalhes internos da implementação.
- Toda entrada de usuário é não confiável por padrão — valide tipo, formato e tamanho antes de qualquer processamento ou persistência.

### Regras negativas

- **NUNCA** faça harcode de senhas, tokens, chaves de API ou strings de conexão. Use sempre variáveis de ambiente.
- **NUNCA** exponha detalhes de exceção interna (stacktrace, mensagens de banco) em respostas de API para o cliente.

Consulte `rules.md` para diretrizes completas de segurança.