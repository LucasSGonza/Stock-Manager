# PRD: Migração Visual — style-inventory-mate → Stock-Manager

## Introdução / Objetivo

Migrar a camada visual do projeto de referência `style-inventory-mate` para o projeto principal `Stock-Manager`, reproduzindo fielmente a identidade visual, layouts, páginas e componentes, sem alterar a arquitetura, padrões ou stack tecnológica do Stock-Manager.

O resultado final é um Stock-Manager visualmente idêntico ao style-inventory-mate, construído inteiramente sobre MUI, Redux, React Router e os padrões documentados em `docs/`.

## Contexto

- **Stock-Manager** é o projeto principal. Stack: React 19 + Vite 8 + TypeScript 6 + MUI 9 + React Router + Redux + Supabase. Atualmente possui apenas o scaffold padrão do Vite (counter demo).
- **style-inventory-mate** é o projeto de referência visual, gerado via Lovable. Stack: TanStack Start + Tailwind v4 + shadcn/ui (Radix). Possui duas páginas funcionais (Estoque e Caixa), layout responsivo mobile-first e identidade visual completa.
- A documentação do Stock-Manager (`docs/agent/`) define rigorosamente os padrões de código, estrutura de pastas, estilização (MUI `sx`), tipagem, roteamento e estado global.

## Motivação

O style-inventory-mate representa o design validado da aplicação — paleta de cores, tipografia, layout, componentes e experiência do usuário. Porém, sua stack (TanStack + Tailwind + shadcn) diverge da arquitetura escolhida para o produto final (MUI + React Router + Redux). A migração é necessária para:

1. Preservar o investimento de design já realizado.
2. Construir sobre a arquitetura escalável e documentada do Stock-Manager.
3. Evitar manter dois projetos paralelos com stacks incompatíveis.

## Escopo

### Incluído

- Configuração do tema MUI com os design tokens da identidade visual (cores, tipografia, espaçamento, border-radius)
- Importação da fonte Tenor Sans (Google Fonts)
- Implementação do layout principal (AppLayout): header com navegação desktop, bottom navigation mobile
- Página Estoque (`/estoque`): tabela desktop, cards mobile, busca, modal criar/editar, diálogo de confirmação de exclusão
- Página Caixa (`/caixa`): summary cards (Recebido/Pendente/Atrasado), tabela desktop, cards mobile, badges de status, badges de deadline coloridos
- Componentes reutilizáveis adaptados ao padrão MUI/Stock-Manager
- Dados mock para visualização (sem backend)
- Funções utilitárias: `getDeadlineLevel`, `formatBRL`, `formatDateBR`, `deadlineClasses`
- Tipos TypeScript: `Clothing`, `Sale`, `SaleStatus`, `DeadlineLevel`
- Roteamento via React Router (rota `/` redireciona para `/estoque`)
- Responsividade mobile-first

### Fora do Escopo

- Dark mode (tema `.dark`)
- Integração com Supabase (backend)
- Upload de arquivo Excel (RF-03, RF-04 do PRD principal)
- Exportação para JSON (RF-05 do PRD principal)
- Componentes shadcn/ui que não são usados nas páginas implementadas (calendar, carousel, chart, command, resizable, sidebar, etc.)
- SEO/meta tags (o Stock-Manager não usa TanStack Start head)
- Autenticação e autorização
- Testes automatizados (serão cobertos em uma feature separada)

## Requisitos Funcionais

- **RF-MV-01**: O sistema deve exibir um header fixo no topo com o nome da aplicação ("Atelier · Gestão de Moda") e navegação entre as abas Estoque e Caixa (visível apenas no desktop, ≥md).
- **RF-MV-02**: O sistema deve exibir uma barra de navegação inferior fixa no mobile (<md) com ícones e labels para Estoque e Caixa, destacando a aba ativa.
- **RF-MV-03**: A rota raiz (`/`) deve redirecionar automaticamente para `/estoque`.
- **RF-MV-04**: A página Estoque deve exibir uma tabela responsiva com colunas: Código, Nome, Categoria, Tamanho, Qtd, Preço e Ações (Editar/Excluir).
- **RF-MV-05**: No mobile (<md), a página Estoque deve exibir os registros como cards empilhados em vez da tabela.
- **RF-MV-06**: A página Estoque deve permitir busca textual por nome, categoria ou código, filtrando os resultados em tempo real.
- **RF-MV-07**: O botão "Nova" deve abrir um modal (Dialog) com formulário para criar um novo item de estoque (nome, categoria, tamanho, quantidade, preço).
- **RF-MV-08**: Ao clicar em "Editar" em um item, o mesmo modal deve abrir preenchido com os dados do item para edição.
- **RF-MV-09**: Ao clicar em "Excluir", um diálogo de confirmação deve ser exibido antes de remover o item.
- **RF-MV-10**: A página Caixa deve exibir 3 cards de resumo no topo: "Recebido", "Pendente" e "Atrasado", cada um com o valor total calculado e borda lateral colorida conforme o tom.
- **RF-MV-11**: A página Caixa deve exibir uma tabela com colunas: Código, Cliente, Roupa, Preço, Data da compra, Status (badge) e Data limite (badge colorido).
- **RF-MV-12**: No mobile (<md), a página Caixa deve exibir os registros como cards empilhados.
- **RF-MV-13**: Os badges de deadline devem seguir a regra de cores: >1 mês → `--status-ok` (#FFED29), ≤1 mês → `--status-warn` (#FF991C), ≤1 semana → `--status-danger` (#FF2C2C).
- **RF-MV-14**: Os badges de status devem diferenciar visualmente: "Pago" (primary suave), "Pendente" (secondary), "Atrasado" (danger).
- **RF-MV-15**: O contador de peças registradas deve ser exibido abaixo do título "Estoque".
- **RF-MV-16**: Todos os valores monetários devem ser formatados em Real (R$) com `toLocaleString("pt-BR")`.
- **RF-MV-17**: Todas as datas devem ser formatadas no padrão brasileiro (dd/mm/aaaa).

## Requisitos Não Funcionais

- **RNF-MV-01**: Interface mobile-first. Layout base 360–414px, com breakpoints para desktop.
- **RNF-MV-02**: Toda estilização deve usar MUI `sx` prop. Tailwind CSS NÃO deve ser adicionado ao projeto.
- **RNF-MV-03**: Componentes de layout devem usar `<Box>` do MUI. Textos devem usar `<Typography>`.
- **RNF-MV-04**: A estrutura de pastas deve seguir rigorosamente o padrão definido em `react-development-guide.md`.
- **RNF-MV-05**: Todos os componentes devem usar `React.FC<Props>` com interface tipada e named export.
- **RNF-MV-06**: Áreas de toque no mobile devem ter no mínimo 44px.
- **RNF-MV-07**: O tema MUI deve usar `createTheme()` com os design tokens extraídos do style-inventory-mate.
- **RNF-MV-08**: Nenhum uso de `any` no TypeScript.
- **RNF-MV-09**: Barrel exports (`index.ts`) em todas as pastas de componentes e páginas.
- **RNF-MV-10**: Ícones via `lucide-react` (compatível com ambos os projetos).
- **RNF-MV-11**: Estado local via `useState` para dados mock. Redux deve ser configurado mas utilizado apenas quando necessário para estado compartilhado entre páginas.

## Critérios de Aceitação

- [ ] O visual do Stock-Manager reproduz fielmente o style-inventory-mate em todas as páginas
- [ ] Header fixo com nome da aplicação e navegação desktop funcional
- [ ] Bottom navigation mobile funcional com destaque na aba ativa
- [ ] Página Estoque: tabela desktop com todas as colunas, cards mobile, busca funcional
- [ ] Modal criar/editar roupa funcional com validação de nome obrigatório
- [ ] Diálogo de confirmação de exclusão funcional
- [ ] Página Caixa: summary cards com valores calculados e bordas coloridas
- [ ] Tabela de caixa com badges de status e deadline coloridos corretamente
- [ ] Cards mobile na página Caixa com layout equivalente ao style-inventory-mate
- [ ] Fonte Tenor Sans carregada e aplicada em toda a aplicação
- [ ] Paleta de cores vinho/areia/taupe aplicada consistentemente
- [ ] Cores de status (ok/warn/danger) aplicadas conforme regra de deadline
- [ ] Responsividade: transição suave entre mobile (<md) e desktop (≥md)
- [ ] Build sem erros (`npm run build`)
- [ ] Lint sem erros (`npm run lint`)
- [ ] Nenhum padrão arquitetural do Stock-Manager violado
- [ ] Nenhuma dependência do Tailwind, shadcn ou TanStack adicionada
- [ ] Todos os componentes seguem a estrutura de pastas e barrel exports
- [ ] Verificação visual no browser via dev server

## User Stories

### US-001: Configuração do Tema MUI e Design Tokens
**Descrição:** Como desenvolvedor, preciso configurar o tema MUI com os design tokens do style-inventory-mate para que todos os componentes herdem a identidade visual automaticamente.

**Critérios de Aceitação:**
- [ ] Criar arquivo de tema MUI com `createTheme()` contendo paleta (primary: #741614, secondary: #e7cdbb, cores de status), tipografia (Tenor Sans) e shape (border-radius)
- [ ] Importar fonte Tenor Sans via Google Fonts no `index.html`
- [ ] Configurar `ThemeProvider` do MUI no `main.tsx` (antes do `BrowserRouter`)
- [ ] Extrair constantes de cores de status para `src/util/constants.ts`
- [ ] Typecheck passa

### US-002: Estrutura Base e Roteamento
**Descrição:** Como usuário, quero que a rota `/` me redirecione para `/estoque` e que as rotas `/estoque` e `/caixa` existam para que eu possa navegar entre as páginas.

**Critérios de Aceitação:**
- [ ] Criar `WebRouter.tsx` com rotas `/`, `/estoque` e `/caixa`
- [ ] Rota `/` redireciona para `/estoque` via `Navigate`
- [ ] Criar estrutura de pastas `src/pages/EstoquePage/` e `src/pages/CaixaPage/` com barrel exports
- [ ] Atualizar `App.tsx` para renderizar layout + `WebRouter`
- [ ] Typecheck passa
- [ ] Verificar no browser que as rotas funcionam

### US-003: Layout Principal (AppLayout)
**Descrição:** Como usuário, quero ver um header fixo no topo com o nome da aplicação e navegação, e uma barra inferior no mobile, para que eu possa navegar facilmente entre as seções.

**Critérios de Aceitação:**
- [ ] Criar componente `AppLayout` em `src/components/AppLayout/`
- [ ] Header fixo (`position: sticky`) com background primary (#741614), texto branco, nome "Atelier" e subtítulo "· Gestão de Moda"
- [ ] Navegação desktop (≥md) no header com links para Estoque e Caixa, usando ícones `Shirt` e `Wallet` do lucide-react
- [ ] Link ativo tem estilo diferenciado (fundo semitransparente)
- [ ] Bottom navigation mobile (<md): barra fixa, grid de 2 colunas, ícones + labels
- [ ] Aba ativa destacada com cor primary
- [ ] Conteúdo principal centralizado com `maxWidth: 1152px` (6xl) e padding responsivo
- [ ] Typecheck passa
- [ ] Verificar no browser: navegação funciona em mobile e desktop

### US-004: Tipos e Dados Mock
**Descrição:** Como desenvolvedor, preciso dos tipos TypeScript e dados fictícios para popular as telas de Estoque e Caixa.

**Critérios de Aceitação:**
- [ ] Criar tipos em `src/types/types.ts`: `Clothing`, `Sale`, `SaleStatus`, `DeadlineLevel` (com prefixo `D` para entidades de banco conforme guia)
- [ ] Criar dados mock em `src/util/mockData.ts`: 8 roupas e 8 vendas cobrindo os 3 status e 3 níveis de deadline
- [ ] Criar utilitários em `src/util/deadline.ts`: `getDeadlineLevel`, `formatBRL`, `formatDateBR`
- [ ] Re-exportar via barrel exports
- [ ] Typecheck passa

### US-005: Página Estoque — Tabela Desktop
**Descrição:** Como usuário no desktop, quero ver uma tabela com todas as roupas do estoque para que eu possa gerenciar os itens visualmente.

**Critérios de Aceitação:**
- [ ] Tabela MUI com colunas: Código, Nome, Categoria, Tamanho, Qtd, Preço, Ações
- [ ] Código exibido como `#1001`
- [ ] Preço formatado em BRL
- [ ] Botões de ação: Editar (outline) e Excluir (destructive) com ícones Pencil e Trash2
- [ ] Tabela envolta em card com bordas arredondadas e borda `border`
- [ ] Visível apenas em ≥md
- [ ] Typecheck passa
- [ ] Verificar no browser

### US-006: Página Estoque — Cards Mobile
**Descrição:** Como usuário no mobile, quero ver os itens do estoque como cards empilhados para facilitar a leitura em telas pequenas.

**Critérios de Aceitação:**
- [ ] Lista de cards visível apenas em <md
- [ ] Cada card exibe: código, nome, categoria + tamanho, preço e quantidade
- [ ] Botões Editar e Excluir em cada card
- [ ] Estado vazio: mensagem "Nenhuma peça encontrada."
- [ ] Cards com bordas arredondadas, borda sutil e sombra discreta
- [ ] Typecheck passa
- [ ] Verificar no browser em viewport mobile

### US-007: Página Estoque — Busca e Contagem
**Descrição:** Como usuário, quero buscar roupas por nome, categoria ou código e ver a contagem total de peças registradas.

**Critérios de Aceitação:**
- [ ] Input de busca com placeholder "Buscar por nome, categoria ou código…"
- [ ] Filtragem em tempo real (sem delay/debounce)
- [ ] Contagem exibida abaixo do título: "X peças registradas" (singular/plural)
- [ ] Botão "Nova" ao lado do input
- [ ] Layout responsivo: empilhado no mobile, lado a lado no desktop
- [ ] Typecheck passa
- [ ] Verificar no browser

### US-008: Página Estoque — Modal Criar/Editar Roupa
**Descrição:** Como usuário, quero criar ou editar uma roupa através de um modal com formulário para que eu possa gerenciar meu estoque.

**Critérios de Aceitação:**
- [ ] Modal MUI (Dialog) com título dinâmico: "Nova roupa" ou "Editar roupa"
- [ ] Campos: Nome (obrigatório), Categoria, Tamanho, Quantidade (number), Preço (number com step 0.01)
- [ ] Layout de campos: Nome em linha cheia, Categoria+Tamanho em grid 2 colunas, Quantidade+Preço em grid 2 colunas
- [ ] Botões: Cancelar (outline) e Adicionar/Salvar (primary)
- [ ] Ao criar: gera ID incremental e adiciona ao estado
- [ ] Ao editar: atualiza o item existente no estado
- [ ] Modal fecha ao salvar ou cancelar
- [ ] Typecheck passa
- [ ] Verificar no browser: criar e editar um item

### US-009: Página Estoque — Confirmação de Exclusão
**Descrição:** Como usuário, quero ser solicitado a confirmar antes de excluir uma roupa para evitar exclusões acidentais.

**Critérios de Aceitação:**
- [ ] Dialog de confirmação com título "Excluir esta peça?" e mensagem descritiva
- [ ] Botões: Cancelar e Excluir
- [ ] Ao confirmar: remove o item do estado e fecha o dialog
- [ ] Ao cancelar: fecha o dialog sem ação
- [ ] Typecheck passa
- [ ] Verificar no browser

### US-010: Página Caixa — Summary Cards
**Descrição:** Como usuário, quero ver cards de resumo com totais de Recebido, Pendente e Atrasado para ter uma visão rápida do fluxo de caixa.

**Critérios de Aceitação:**
- [ ] 3 cards em grid responsivo: 1 coluna mobile, 3 colunas ≥sm
- [ ] Cada card com label uppercase, valor em BRL e borda lateral esquerda colorida (4px)
- [ ] "Recebido": borda primary (#741614)
- [ ] "Pendente": borda `--status-warn` (#FF991C)
- [ ] "Atrasado": borda `--status-danger` (#FF2C2C)
- [ ] Valores calculados dinamicamente a partir dos dados mock
- [ ] Typecheck passa
- [ ] Verificar no browser

### US-011: Página Caixa — Tabela e Cards
**Descrição:** Como usuário, quero ver o histórico de compras com status e data limite coloridos para acompanhar os pagamentos.

**Critérios de Aceitação:**
- [ ] Tabela desktop (≥md) com colunas: Código, Cliente, Roupa, Preço, Data da compra, Status, Data limite
- [ ] Cards mobile (<md) com informações equivalentes
- [ ] Badge de status: "Pago" (primary suave), "Pendente" (secondary), "Atrasado" (danger)
- [ ] Badge de deadline colorido conforme `getDeadlineLevel`: ok (amarelo), warn (laranja), danger (vermelho)
- [ ] Datas formatadas em pt-BR (dd/mm/aaaa)
- [ ] Preço formatado em BRL
- [ ] Typecheck passa
- [ ] Verificar no browser

## Fluxo de Implementação Sugerido

A implementação deve seguir esta ordem para minimizar retrabalho e permitir validação incremental:

```
Fase 1 — Fundação
├── US-001: Tema MUI + Design Tokens
├── US-002: Roteamento
└── US-004: Tipos + Mock Data + Utilitários

Fase 2 — Layout
└── US-003: AppLayout (header + bottom nav)

Fase 3 — Página Estoque
├── US-005: Tabela Desktop
├── US-006: Cards Mobile
├── US-007: Busca + Contagem
├── US-008: Modal Criar/Editar
└── US-009: Confirmação de Exclusão

Fase 4 — Página Caixa
├── US-010: Summary Cards
└── US-011: Tabela + Cards + Badges

Fase 5 — Polimento
└── Revisão visual lado a lado com style-inventory-mate
```

## Estratégia de Migração

### Princípio geral

O style-inventory-mate serve **exclusivamente como referência visual**. Nenhum código será copiado diretamente. Cada elemento visual será **reimplementado** usando os componentes e padrões do Stock-Manager.

### Processo para cada componente

1. **Analisar** o componente no style-inventory-mate (layout, espaçamento, cores, comportamento)
2. **Identificar** o equivalente MUI (ver tabela abaixo)
3. **Implementar** no Stock-Manager seguindo a estrutura de pastas e convenções documentadas
4. **Comparar** visualmente no browser

## Estratégia de Adaptação dos Componentes

### Tabela de correspondência

| Elemento no style-inventory-mate | Adaptação no Stock-Manager |
|---|---|
| Tailwind utility classes | MUI `sx` prop com valores equivalentes |
| `<div>`, `<section>`, `<header>` | `<Box component="section">`, `<Box component="header">` |
| `<p>`, `<h1>`, `<span>` | `<Typography variant="...">` |
| shadcn `<Button>` | MUI `<Button>` com variant correspondente |
| shadcn `<Table>` | MUI `<Table>`, `<TableHead>`, `<TableBody>`, `<TableRow>`, `<TableCell>` |
| shadcn `<Dialog>` | MUI `<Dialog>`, `<DialogTitle>`, `<DialogContent>`, `<DialogActions>` |
| shadcn `<AlertDialog>` | MUI `<Dialog>` com botões Cancelar/Confirmar |
| shadcn `<Badge>` | MUI `<Chip>` com `size="small"` e cores customizadas via `sx` |
| shadcn `<Card>` | MUI `<Card>`, `<CardContent>` |
| shadcn `<Input>` | MUI `<TextField>` com variant `outlined` |
| shadcn `<Label>` | MUI `<TextField>` (label integrado) ou `<InputLabel>` |
| `cn()` (clsx + twMerge) | Não necessário — usar `sx` prop |
| `lucide-react` icons | `lucide-react` icons (manter — é compatível) |
| CSS variables (`--primary`, etc.) | MUI `createTheme()` palette |
| `@media` breakpoints Tailwind | MUI breakpoints via `sx={{ display: { xs: 'none', md: 'block' } }}` |

### Design Tokens — Mapeamento

```
Identidade Visual → MUI Theme
─────────────────────────────
Primary:    #741614 (vinho)     → palette.primary.main
Secondary:  #e7cdbb (areia)     → palette.secondary.main
Muted:      #bbaa9a (taupe)     → palette.text.secondary / custom
Background: off-white (~97% L)  → palette.background.default
Foreground: oklch(0.22 0.04 30) → palette.text.primary
Card BG:    oklch(0.99 0.008 60)→ palette.background.paper
Border:     oklch(0.80 0.02 60) → palette.divider
Status OK:  #FFED29             → custom token em constants.ts
Status Warn:#FF991C             → custom token em constants.ts
Status Danger:#FF2C2C           → custom token em constants.ts
Font:       Tenor Sans          → typography.fontFamily
Radius:     0.5rem (8px)        → shape.borderRadius: 8
```

## Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Diferença visual entre componentes shadcn e MUI (ex: Dialog, Table) | Alta | Médio | Customizar componentes MUI via `sx` e `createTheme()` para aproximar ao máximo. Aceitar pequenas diferenças que não comprometam a identidade visual |
| Tenor Sans não carregar ou causar FOUT (Flash of Unstyled Text) | Baixa | Baixo | Usar `display=swap` no import e declarar fallback (`system-ui, sans-serif`) |
| Responsividade com breakpoints MUI diferente do Tailwind | Média | Médio | MUI usa 600px para `sm` e 900px para `md`; Tailwind usa 640px e 768px. Ajustar breakpoints customizados no tema se necessário |
| MUI Chip vs shadcn Badge: comportamento visual diferente | Média | Baixo | Usar `sx` para customizar Chip e remover estilos default que não se encaixam |
| Performance: MUI pode ser mais pesado que Tailwind | Baixa | Baixo | Já é a escolha arquitetural definida — tree-shaking do MUI v9 minimiza o impacto |

## Dependências

### Já instaladas no Stock-Manager
- `@mui/material` v9.0.1
- `react` v19.2.6
- `react-dom` v19.2.6
- `react-router` v7.15.1

### A instalar
- `lucide-react` — ícones (Shirt, Wallet, Plus, Pencil, Trash2)
- `@mui/icons-material` — opcional, se necessário para ícones adicionais
- `@emotion/react` e `@emotion/styled` — peer dependencies do MUI (verificar se já estão)
- `@reduxjs/toolkit` e `react-redux` — para configuração da store (conforme guia)
- `@fontsource/tenor-sans` ou Google Fonts link — fonte tipográfica

### Externas
- Nenhuma dependência de backend necessária nesta fase (dados mock)

## Plano de Validação

### 1. Validação técnica (automatizada)
- `npm run build` — compilação sem erros
- `npm run lint` — sem warnings ou erros de lint
- TypeScript strict mode sem erros de tipo

### 2. Validação visual (manual)
- Abrir `npm run dev` e comparar lado a lado com style-inventory-mate
- Verificar em viewport mobile (360px) e desktop (1280px+)
- Conferir:
  - Cores do header, cards, badges, botões
  - Fonte Tenor Sans aplicada em títulos e corpo
  - Espaçamento e alinhamento dos elementos
  - Transição entre layout mobile (cards) e desktop (tabela)
  - Modal de criação/edição funcional
  - Diálogo de confirmação funcional
  - Summary cards com bordas coloridas
  - Badges de status e deadline com cores corretas
  - Busca filtrando resultados em tempo real
  - Bottom navigation mobile com aba ativa destacada

### 3. Validação de padrões
- Revisão da estrutura de pastas contra `react-development-guide.md`
- Verificar barrel exports em todos os diretórios
- Confirmar ausência de `any`, `style={{}}`, tags HTML nuas para texto/layout
- Confirmar ausência de dependências Tailwind/shadcn/TanStack

## Checklist de Conclusão

### Identidade Visual
- [ ] Paleta vinho/areia/taupe aplicada via tema MUI
- [ ] Fonte Tenor Sans carregada e aplicada
- [ ] Cores de status (ok/warn/danger) implementadas
- [ ] Border-radius suave consistente

### Layout
- [ ] Header fixo com background primary e navegação desktop
- [ ] Bottom navigation mobile com ícones e labels
- [ ] Conteúdo centralizado com max-width 1152px
- [ ] Transição responsiva mobile ↔ desktop

### Página Estoque
- [ ] Tabela desktop com 7 colunas
- [ ] Cards mobile empilhados
- [ ] Busca funcional por nome/categoria/código
- [ ] Contagem de peças registradas
- [ ] Modal criar/editar com todos os campos
- [ ] Diálogo de confirmação de exclusão
- [ ] Estado vazio com mensagem

### Página Caixa
- [ ] Summary cards com valores calculados
- [ ] Bordas laterais coloridas nos summary cards
- [ ] Tabela desktop com 7 colunas
- [ ] Cards mobile empilhados
- [ ] Badges de status (Pago/Pendente/Atrasado)
- [ ] Badges de deadline com cores dinâmicas
- [ ] Formatação de datas pt-BR e valores BRL

### Qualidade
- [ ] Build sem erros
- [ ] Lint sem erros
- [ ] Sem uso de `any`
- [ ] Estrutura de pastas conforme guia
- [ ] Barrel exports em todas as pastas
- [ ] Importações com alias `@/`
- [ ] Sem dependências Tailwind/shadcn/TanStack
- [ ] Sem lógica de negócio em páginas
- [ ] Sem URLs/tokens hardcoded

### Questões em Aberto
- Breakpoints MUI vs Tailwind: ajustar `md` para 768px no tema ou usar 900px padrão do MUI?
- Ícone do lucide-react `Shirt` disponível na versão compatível com React 19?
- `@emotion/react` e `@emotion/styled` já são peer deps do MUI 9 ou precisa instalar separadamente?
