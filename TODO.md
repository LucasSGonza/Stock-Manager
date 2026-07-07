# TODO

- [] Criar documentação informativa sobre o projeto e adicionar em `README.MD`;
- [OK] Finalizar IA docs (rules, guides, ...)
    - [OK] docs sobre padroes de desenvolvimento React (criacao de componentes, routes, useState, ...)
- [OK] Finalizar arquivo `AGENTS.MD`;
- [OK] Definir visual base do projeto, testando a IA `Lovable`;
- [] Trazer base visual criada pelo Lovable para o projeto atual;
- [] Adicionar opções para busca e filtragem na aba "Caixa" (busca por nome da cliente, ordenação por data de compra, ordenação por data limite de pagamento)
    - Sanitizar a busca para "lower-cased", impedir SQL Injection, não diferenciar acentos ou caracteres especiais; 
    - Para colunas de data, ordenação segue sequência lógica de tempo;
    - Para colunas numéricas (quantidade, preço e código do produto), ordenação segue sequência lógica numeral;
    - Para colunas textuais (nome, categoria e tamanho do produto), ordenação segue sequência lógica alfabética;
- [] Adicionar opções de ordenação na tabela em "Estoque" clicando diretamente na coluna (alternando em ASCENDENTE E DESCENDENTE).
    - Para colunas de data, ordenação segue sequência lógica de tempo;
    - Para colunas numéricas (quantidade, preço e código do produto), ordenação segue sequência lógica numeral;
    - Para colunas textuais (nome, categoria e tamanho do produto), ordenação segue sequência lógica alfabética;
- [] Adicionar opção de paginação (permitir alterar a quantidade de itens exibidos por página, exibir número da página atual e número de itens total, permitir avançar ou voltar a página) das tabelas em "Estoque" e "Caixa".
- [] Adicionar forma de realizar "Login" na aplicação (2FA).