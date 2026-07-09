# TODO

- [OK] Criar documentação informativa sobre o projeto e adicionar em `README.MD`;
- [OK] Finalizar IA docs (rules, guides, ...)
    - [OK] docs sobre padroes de desenvolvimento React (criacao de componentes, routes, useState, ...)
- [OK] Finalizar arquivo `AGENTS.MD`;
- [OK] Definir visual base do projeto, testando a IA `Lovable`;
- [OK] Trazer base visual criada pelo Lovable para o projeto atual;
- [OK] Adicionar botoes CRUD na aba "Caixa" para gerenciar o Fluxo de caixa (nova coluna "Acoes" + botao para adicionar nova compra);
    - Criar novo modal para adicionar/editar pagamentos
- [OK] Adicionar opcao para busca na aba "Caixa";
    - Sanitizar a busca para "lower-cased", impedir SQL Injection, não diferenciar acentos ou caracteres especiais; 
- [] Adicionar opções para filtragem na aba "Caixa" (ordenação por data de compra, ordenação por data limite de pagamento)
    - Para colunas de data, ordenação segue sequência lógica de tempo;
    - Para colunas numéricas (quantidade, preço e código do produto), ordenação segue sequência lógica numeral;
    - Para colunas textuais (nome, categoria e tamanho do produto), ordenação segue sequência lógica alfabética;
- [] Adicionar opções de ordenação na tabela em "Estoque" clicando diretamente na coluna (alternando em ASCENDENTE E DESCENDENTE).
    - Para colunas de data, ordenação segue sequência lógica de tempo;
    - Para colunas numéricas (quantidade, preço e código do produto), ordenação segue sequência lógica numeral;
    - Para colunas textuais (nome, categoria e tamanho do produto), ordenação segue sequência lógica alfabética;
- [] Adicionar opção de paginação (permitir alterar a quantidade de itens exibidos por página, exibir número da página atual e número de itens total, permitir avançar ou voltar a página) das tabelas em "Estoque" e "Caixa";
- [OK] Na aba "Caixa", adicionar coluna "Parcelas" no formato "pagas/total";
- [OK] Na aba "Caixa", definir valor em "Status" a partir das parcelas pagas/totais
- [OK] Transformar "Dialog de exclusao" em uma componente reutilizavel; 
- [OK] Padronizar `width` e centralizar texto do componente `Chip` utilizado na coluna **Status** na aba "Caixa";
- [] Adicionar `dark mode`;
- [] Adicionar lib `react-hook-form` + `yup` (validator);
- [] Adicionar validacoes e implementar funcionalidades na aba "Caixa"
    - [] Modal adicao novo registro
        - [] Valor em "Data limite" deve ser opcional. Se nao for fornecido, calcular automaticamente baseado no numero de parcelas totais;
        - [] Textfield para "Nome da roupa comprada" deve ser transformado em um componente `Select`, trazendo somente nomes de roupas registradas no **Estoque** (atualmente é um campo livre)
    - [] Edicao
        - [] ao editar um registro, "numero de parcelas pagas" nao pode ser superior ao "numero de parcelas totais"
        - [] ao editar um registro, caso atualizar o numero de parcelas pagas, criar funcao responsavel para verificar se todas as parcelas foram pagas e em caso positivo, atualizar coluna "Status" e, consequentemente, a cor do `Chip` em **data limite**. Esse comportamento deveria ser todo automatico, sempre baseado em "parcelas pagas/parcelas totais"

# v2 Stock Manager

- [] Adicionar forma de realizar "Login" na aplicação (2FA);