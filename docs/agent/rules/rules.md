---
description: Diretrizes de segurança transversais - autenticação, dados sensíveis, entrada de dados e guias de implementação de segurança.
alwaysApply: true
---

# Regras de Segurança

Diretrizes de segurança transversais aplicáveis e obrigatórias para o desenvolvimento neste repositório.

## Regras Obrigatórias

### Autenticação e Autorização

- **NUNCA** implemente autenticação customizada sem aprovação explícita - use os mecanismos já existentes no projeto
- **SEMPRE** valide permissões no servidor, nunca confie apenas em validações no cliente
- Sessões devem ter tempo de expiração definido; não use sessões sem TTL
- Tokens e credenciais **NUNCA** devem aparecer em logs, URLs, comentários ou mensagens de erro, sucesso ou aviso.

### Dados sensíveis

- **NUNCA** exponha CPF, senha, token ou dados pessoais em respostas de erro ou logs
- Dados sensíveis em trânsito devem usar HTTPS/TLS - sem exceções
- Senhas devem ser armazenadas com hash seguro (bcrypt, Argon2) - **nunca em texto plano ou MD5/SHA1**
- Variáveis de ambiente são a única forma aceita de guardar credenciais no código. **NUNCA** adicione variáveis de ambiente harcode

### Entrada de dados

- **SEMPRE** valide e sanitize toda entrada de usuário antes de usar em queries, comandos ou respostas
- Valide tipos, tamanhos e formatos antes de processar arquivos enviados por usuários

### Controle de Acesso

- Endpoints que retornam dados de outros usuários devem validar o vínculo entre o recurso e o usuário autenticado (IDOR)
- Ações destrutivas (delete, update ou post) devem exigir confirmação ou dupla validação

### Checklist para Code Review

- [] Nenhuma credencial harcoded (token, senha, chave de API)
- [] Validação de entrada presente e testada
- [] Dados sensíveis ausentes em logs e respostas de erro
- [] Permissões verificadas no servidor para operações restritas 