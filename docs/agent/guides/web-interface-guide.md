---
description: Plano de Execução — Guia sobre a interface visual do projeto
alwaysApply: true
---

## Visão geral

App web mobile-first para empreendedores da moda gerenciarem estoque de roupas e fluxo de caixa (compras/pagamentos), usando a identidade visual definida.

## Identidade visual (tokens em `src/styles.css`)

- `--primary`: #741614 (vinho — ações principais, header, destaques)
- `--secondary` / `--accent`: #e7cdbb (areia clara — superfícies, cards)
- `--muted`: #bbaa9a (taupe — bordas, textos secundários)
- `--background`: tom off-white derivado de #e7cdbb a ~97% L
- Fonte: **Tenor Sans** (Google Fonts) para títulos e corpo
- Tokens semânticos para status de pagamento:
  - `--status-ok`: #7a8c5e (>1 mês — olive sage)
  - `--status-warn`: #b87a2e (≤1 mês — amber quente)
  - `--status-danger`: #FF2C2C (≤1 semana — vermelho)
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
  - `>1 mês` → fundo `--status-ok` (#7a8c5e com alpha)
  - `≤1 mês` → fundo `--status-warn` (#b87a2e com alpha)
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

## Regras do sistema de cores

Todas as cores do projeto DEVEM vir da constante `COLORS` (`src/util/constants.ts`) ou de tokens do tema MUI (ex: `"background.paper"`, `"text.secondary"`). Valores hex inline (`"#abc123"`) e literais `rgba()` sao proibidos em arquivos de componentes e paginas.

**Padroes permitidos:**
- Referencia direta: `COLORS.primary`
- Derivacao com alpha hex: `` `${COLORS.primary}1a` ``
- Token MUI: `"background.paper"`, `"text.secondary"`
- Keywords CSS: `"transparent"`, `"inherit"`
- Sombras via constante: `SHADOWS.card`

**Sufixos alpha hex de referencia:**
| Sufixo | Opacidade |
|--------|-----------|
| `0d`   | 5%        |
| `1a`   | 10%       |
| `25`   | ~15%      |
| `26`   | 15%       |
| `30`   | 19%       |
| `4d`   | 30%       |

**Para adicionar novas cores:** 
- Adicione primeiro ao objeto `COLORS` em `src/util/constants.ts`, depois referencie. Nunca insira um valor hex inline.
- Sombras (box-shadow) vao na constante `SHADOWS` (mesmo arquivo), nao em `COLORS`.

### Unificacao de estados visuais

| Estado | StatusBadge | DeadlineBadge | Familia de cor |
|--------|------------|---------------|----------------|
| Pago/paid | `primary` | `primary` | Burgundy |
| Pendente/warn | `statusWarn` | `statusWarn` | Amber |
| Atrasado/danger | `statusDanger` | `statusDanger` | Vermelho |
| ok (so deadline) | n/a | `statusOk` | Olive sage |

## Entregáveis (mapeados aos critérios de aceite)

1. Visual alinhado à identidade (paleta + Tenor Sans) ✅
2. Mobile-first com adaptação desktop ✅
3. Tabela de roupas com editar/excluir ✅
4. Modal criar/editar roupa ✅
5. Tabela de compras com colunas exigidas + cores na data limite ✅
