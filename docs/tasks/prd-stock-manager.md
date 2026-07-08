# PRD STOCK MANAGER

Este documento tem como papel contextualizar os objetivos do projeto "Stock Manager", servindo como um guia detalhado que descreve a solução que será desenvolvida, seus requisitos funcionais, requisitos não-funcionais, regras de negócio, tecnologias utilizadas, limitações, padrões e regras.

## Objetivo

O objetivo deste projeto é auxiliar empreendedores no ramo da moda a gerenciar seus estoques de forma objetiva, visual e produtiva, além de também permitir o gerenciamento do fluxo de caixa do empreendimento.

## Requisitos Não-Funcionais

- [RNF-01] O sistema deve possuir uma interface web responsiva (Mobile first);

## Requisitos Funcionais

- [RF-01] O sistema deve permitir gerenciar o estoque da loja, permitindo criar, editar e/ou excluir os registros da tabela;
- [RF-02] O sistema deve permitir gerenciar o fluxo de caixa da loja (contas a pagar, receber, etc);
- [RF-03] O sistema deve permitir ao usuário enviar através de um botão de upload de arquivos um arquivo excel por vez;
- [RF-04] O sistema deve conseguir validar arquivos excel, buscando identificar tabelas, identificar suas colunas, e então transformar os registros em um arquivo json válido;
- [RF-05] O sistema deve permitir exportar os dados da tabela de estoque transformando-os em um arquivo json válido;

## Validações

- O sistema deve sempre validar o conteúdo do arquivo inserido pelo usuário. A validação será somente aceita se todos os seguintes critérios forem válidos:
  - O arquivo inseriro é um arquivo excel válido (`.xlsx`);
  - O arquivo excel possuí apenas uma tabela;
  - A tabela do arquivo excel contém as seguintes colunas: nome, categoria, tamanho, Qtd (quantidade) e preço;
  - A tabela do arquivo excel contém ao menos 1 registro.

## Regras de Negócio

- [RN-01] Sempre que o usuário realizar upload de um arquivo excel válido, o sistema deverá realizar os seguintes passos:
  - 1. Criar um arquivo `.json` de backup com os dados atuais do estoque e perguntar ao usuário, através de um modal, se o mesmo deseja realizar download desse backup.
  - 2. Os dados atuais do estoque serão totalmente substituídos pelos dados do novo arquivo inserido.

## Tecnologias

- [Node v23.11.0](https://nodejs.org/pt-br)
- [Vite v8.0.12](https://vite.dev/)
- [React v19.2.6](https://react.dev/)
  - [React Compiler](https://react.dev/learn/react-compiler/introduction)
  - [React Router](https://reactrouter.com/home)
- [Typescript v6.0.2](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)

## Limitações

- O projeto utiliza o **Supabase** como banco de dados. Contudo, por ser um database _free_, ele possuí certas limitações. Para mais detalhes, acessar [AQUI](https://supabase.com/docs/guides/functions/limits)

> author: Lucas Silva Gonçalves