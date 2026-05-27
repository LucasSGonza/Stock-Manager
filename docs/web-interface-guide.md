
# Plano de Execução — Interface visual do projeto

## Visão geral
App web mobile-first para empreendedores da moda gerenciarem estoque de roupas e fluxo de caixa (compras/pagamentos), usando a identidade visual definida.

## Identidade visual (tokens em `src/styles.css`)
- `--primary`: #741614 (vinho — ações principais, header, destaques)
- `--secondary` / `--accent`: #e7cdbb (areia clara — superfícies, cards)
- `--muted`: #bbaa9a (taupe — bordas, textos secundários)
- `--background`: tom off-white derivado de #e7cdbb a ~97% L
- Fonte: **Tenor Sans** (Google Fonts) para títulos e corpo
- Tokens semânticos para status de pagamento:
  - `--status-ok`: #FFED29 (>1 mês)
  - `--status-warn`: #FF991C (≤1 mês)
  - `--status-danger`: #FF2C2C (≤1 semana)
- Border-radius suave, sombras discretas, estilo editorial/elegante coerente com moda

## Estrutura de rotas (TanStack Start)
```
src/routes/
  __root.tsx        layout com header + bottom nav (mobile-first)
  index.tsx         redireciona para /estoque
  estoque.tsx       tabela de roupas + modal criar/editar
  caixa.tsx         tabela de compras/fluxo de caixa
```
Navegação inferior (mobile) e lateral simplificada (desktop) com 2 abas: **Estoque** e **Caixa**.

## Página Estoque (`/estoque`)
Tabela responsiva com colunas:
- Código (ID único numérico)
- Nome da roupa
- (extensões úteis para realismo: Categoria, Tamanho, Quantidade, Preço)
- Ações: Editar / Excluir

Componentes:
- Botão "Nova roupa" abre `ClothingModal` (shadcn Dialog)
- `ClothingModal` cria/edita: nome, categoria, tamanho, quantidade, preço
- Confirmação de exclusão (AlertDialog)
- ~8 registros fictícios

Mobile: cartões empilhados; ≥md: tabela tradicional.

## Página Caixa (`/caixa`)
Tabela com colunas:
- Código da compra
- Cliente
- Roupa comprada
- Preço
- Data da compra
- Status (Pago / Pendente / Atrasado) — Badge
- Data limite de pagamento — Badge colorido conforme proximidade:
  - `>1 mês` → fundo `--status-ok` (#FFED29)
  - `≤1 mês` → fundo `--status-warn` (#FF991C)
  - `≤1 semana` → fundo `--status-danger` (#FF2C2C)

Helper `getDeadlineLevel(date)` calcula o nível e devolve a classe semântica. ~8 registros fictícios cobrindo os três níveis e diferentes status.

Resumo no topo (cards): Total recebido, Pendente, Atrasado.

## Dados fictícios
Em `src/data/mock.ts` (arrays tipados) — sem backend nesta etapa, estado local via `useState`. Persistência pode ser adicionada depois com Lovable Cloud, se desejado.

## Mobile-First
- Layout base 360–414px; breakpoints `md` e `lg` para tabela completa
- Bottom navigation fixa no mobile; topbar no desktop
- Tipografia fluida, áreas de toque ≥44px
- Modais ocupam quase toda a tela em mobile (shadcn Dialog já se adapta)

## Detalhes técnicos
- Tailwind v4 via `src/styles.css`: adicionar `@theme` tokens + `@font-face`/`<link>` para Tenor Sans no `__root.tsx` head
- shadcn: Dialog, AlertDialog, Button, Input, Select, Table, Card, Badge
- Tipos em `src/types/index.ts` (`Clothing`, `Sale`, `SaleStatus`)
- Função utilitária `src/lib/deadline.ts` para classificação de cor
- SEO: cada rota com `head()` próprio (title/description únicos), H1 único
- Substituir o placeholder de `src/routes/index.tsx`

## Entregáveis (mapeados aos critérios de aceite)
1. Visual alinhado à identidade (paleta + Tenor Sans) ✅
2. Mobile-first com adaptação desktop ✅
3. Tabela de roupas com editar/excluir ✅
4. Modal criar/editar roupa ✅
5. Tabela de compras com colunas exigidas + cores na data limite ✅
