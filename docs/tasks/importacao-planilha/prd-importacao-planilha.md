# PRD: Página de Configuração — Importação de Planilha

## Introdução / Objetivo

Criar uma nova área de **Configuração** no Stock Manager, acessível por um terceiro item na navegação principal, e implementar dentro dela o primeiro item de configuração: **Importação** de planilha.

Esta feature entrega a **interface e a validação de tipo de arquivo** do [RF-03] do `docs/tasks/prd-stock-manager.md` ("o sistema deve permitir ao usuário enviar através de um botão de upload de arquivos um arquivo excel por vez"), que foi explicitamente deixado fora do escopo da migração visual (ver `prd-migracao-visual.md`, seção "Fora do Escopo").

O processamento do conteúdo da planilha ([RF-04] e [RN-01]) **não** faz parte desta entrega — será uma feature separada.

## Contexto

- O projeto possui hoje duas rotas (`/estoque` e `/caixa`) e um `AppLayout` com header desktop (≥md) e bottom navigation mobile (<md), ambos alimentados pela constante `NAV_ITEMS` (`src/util/constants.ts`) e pelo mapa `navIcons` (`src/components/AppLayout/AppLayout.tsx`).
- Os ícones do projeto usam o componente `<Icon>` do MUI com **ligatures** do Material Icons (a fonte já está carregada em `index.html`). O pacote `@mui/icons-material` **não** está instalado.
- O projeto ainda **não possui** nenhum componente de Snackbar ou notificação. Esta feature introduz o primeiro.
- Não há nenhuma biblioteca de leitura de planilhas (SheetJS/`xlsx`, `exceljs`) instalada, e o `AGENTS.md` proíbe adicionar dependências sem aprovação explícita.

## Decisões Tomadas

Decisões confirmadas com o Product Owner antes da redação deste documento:

| Tema | Decisão | Justificativa |
|---|---|---|
| Extensões aceitas | **Apenas `.xlsx`** | Alinha com a seção "Validações" do `prd-stock-manager.md`, que define `.xlsx` como o formato Excel válido |
| Escopo da entrega | **Somente UI + validação de tipo** | Evita adicionar dependência de parsing sem aprovação; permite entregar e validar a tela isoladamente |
| Feedback de erro | **Snackbar + Alert do MUI** | Consistente com a stack (MUI); não bloqueia a interação como `alert()` ou `Dialog` |
| Navegação mobile | **Configuração entra na bottom nav** (3 colunas) | Respeita o [RNF-01] (mobile first); sem isso `/config` só seria acessível por URL direta |

### Desvio aprovado do `AGENTS.md`

O `AGENTS.md` determina que o agente **nunca** modifique `WebRouter.tsx` sem solicitação explícita, e que **pergunte antes** de criar uma rota não mapeada no PRD principal. Ambas as condições foram satisfeitas: a alteração do `WebRouter.tsx` foi solicitada nominalmente e a rota `/config` foi aprovada pelo Product Owner nesta demanda.

## Escopo

### Incluído

- Terceiro item de navegação "Configuração" (ícone `settings`) no header desktop e na bottom nav mobile
- Nova página `ConfigurationPage` na rota `/config`
- Card centralizado com layout de duas colunas: menu lateral + painel de conteúdo
- Menu lateral com uma única linha: "Importação" (ícone `upload`)
- Área de upload (dropzone) com seleção por clique e por arrastar-e-soltar
- Validação de tipo de arquivo: aceita exclusivamente `.xlsx`, um arquivo por vez
- Componente reutilizável de Snackbar para avisos ao usuário
- Responsividade mobile-first da nova tela

### Fora do Escopo

- Leitura e parsing do conteúdo da planilha ([RF-04])
- Validação de estrutura da tabela — tabela única, colunas obrigatórias (nome, categoria, tamanho, qtd, preço), mínimo de 1 registro (seção "Validações" do PRD principal)
- Criação do backup `.json`, modal de download e substituição dos dados do estoque ([RN-01])
- Aceitar arquivos `.xls` (Excel legado) ou `.csv`
- Upload de múltiplos arquivos simultâneos
- Envio do arquivo ao backend / Supabase, barra de progresso ou estado de carregamento
- Exportação dos dados para JSON ([RF-05])
- Qualquer outro item no menu lateral além de "Importação"
- Validação de tamanho máximo de arquivo
- Testes automatizados

## Requisitos Funcionais

- **RF-CFG-01**: O header desktop (≥md) deve exibir um terceiro item de navegação com o rótulo "Configuração" e o ícone `settings`, que ao ser clicado navega para a rota `/config`.
- **RF-CFG-02**: A bottom navigation mobile (<md) deve exibir o mesmo item "Configuração", passando de um grid de 2 para 3 colunas de largura igual.
- **RF-CFG-03**: O item "Configuração" deve ser destacado como ativo (mesmo tratamento visual dos demais itens) quando a rota atual iniciar com `/config`.
- **RF-CFG-04**: A rota `/config` deve renderizar o componente `ConfigurationPage`.
- **RF-CFG-05**: A `ConfigurationPage` deve exibir um card centralizado composto por um menu lateral à esquerda e um painel de conteúdo à direita.
- **RF-CFG-06**: O menu lateral deve conter o título "CONFIGURAÇÕES" e exatamente uma linha clicável: ícone `upload` + rótulo "Importação", pré-selecionada por padrão.
- **RF-CFG-07**: O painel de conteúdo deve exibir o título "Importação", o subtítulo "Importe registros de estoque e de caixa a partir de uma planilha." e a área de upload.
- **RF-CFG-08**: Ao clicar na área de upload, o sistema deve abrir o seletor de arquivos do sistema operacional.
- **RF-CFG-09**: Arrastar e soltar um arquivo sobre a área de upload deve ter exatamente o mesmo comportamento e as mesmas validações da seleção por clique.
- **RF-CFG-10**: O sistema deve aceitar **apenas** arquivos com extensão `.xlsx`, e **apenas um arquivo por vez**.
- **RF-CFG-11**: A validação do arquivo deve verificar a extensão (case-insensitive) e, quando o MIME type estiver disponível, também o MIME type `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.
- **RF-CFG-12**: Ao receber um arquivo de tipo inválido, o sistema deve descartá-lo e exibir um Snackbar de erro com a mensagem "Apenas arquivos Excel (.xlsx) são aceitos.".
- **RF-CFG-13**: Ao receber um arquivo válido, o sistema deve exibir o nome do arquivo abaixo da área de upload. **Nenhum processamento do conteúdo deve ocorrer** nesta entrega.
- **RF-CFG-14**: O Snackbar deve poder ser dispensado manualmente pelo usuário e desaparecer automaticamente após aproximadamente 5 segundos.
- **RF-CFG-15**: Após uma tentativa de upload (válida ou inválida), o valor do input de arquivo deve ser resetado, permitindo que o usuário selecione o mesmo arquivo novamente.

## Requisitos Não-Funcionais

- **RNF-CFG-01**: A tela deve ser mobile-first, usando os breakpoints do MUI. No mobile (<md) o menu lateral empilha acima do painel de conteúdo.
- **RNF-CFG-02**: Toda estilização deve usar a prop `sx` do MUI. Nenhum uso de `style={{}}`.
- **RNF-CFG-03**: Layout deve usar `<Box>` do MUI; todo texto deve usar `<Typography>`.
- **RNF-CFG-04**: Cores, sombras e bordas devem vir de `COLORS` / `SHADOWS` (`src/util/constants.ts`) ou do tema MUI — nenhum valor hexadecimal solto.
- **RNF-CFG-05**: A estrutura de pastas e os barrel exports (`index.ts`) devem seguir o `react-development-guide.md`.
- **RNF-CFG-06**: Todos os componentes devem usar named export, interface de Props declarada no mesmo arquivo, e importações com o alias `@/`.
- **RNF-CFG-07**: Nenhum uso de `any` no TypeScript.
- **RNF-CFG-08**: **Nenhuma nova dependência** deve ser adicionada ao `package.json`.
- **RNF-CFG-09**: O estado da tela (arquivo selecionado, Snackbar aberto) deve ser local via `useState` — não deve ir para o Redux.
- **RNF-CFG-10**: Áreas de toque no mobile devem ter no mínimo 44px.
- **RNF-CFG-11**: Event handlers devem seguir o prefixo `handle`.

## User Stories

### US-001: Item "Configuração" na navegação
**Descrição:** Como usuário, quero um botão "Configuração" na barra de navegação para que eu possa acessar as configurações da aplicação de qualquer tela.

**Critérios de Aceitação:**
- [ ] `NAV_ITEMS` em `src/util/constants.ts` recebe a entrada `{ to: "/config", label: "Configuração" }`
- [ ] O mapa `navIcons` em `AppLayout.tsx` recebe `"/config": <Icon fontSize="medium">settings</Icon>`
- [ ] O item aparece no header desktop (≥md) com ícone `settings` + rótulo
- [ ] O `gridTemplateColumns` da bottom nav mobile muda de `"1fr 1fr"` para 3 colunas iguais
- [ ] O item é destacado como ativo ao navegar para `/config`, nas duas navegações
- [ ] Nenhum outro comportamento do `AppLayout` é alterado
- [ ] `npm run build` e `npm run lint` passam
- [ ] Verificar no browser em viewport mobile (360px) e desktop (1280px)

### US-002: Rota `/config` e página `ConfigurationPage`
**Descrição:** Como usuário, quero que a rota `/config` renderize uma página dedicada para que o botão de navegação leve a um destino real.

**Critérios de Aceitação:**
- [ ] Criar `src/pages/ConfigurationPage/ConfigurationPage.tsx` com named export `ConfigurationPage`
- [ ] Criar `src/pages/ConfigurationPage/index.ts` reexportando o componente
- [ ] `src/pages/index.ts` reexporta `ConfigurationPage`
- [ ] `src/routes/WebRouter.tsx` recebe `<Route path="/config" element={<ConfigurationPage />} />`
- [ ] Nenhuma outra rota é alterada; `/` continua redirecionando para `/estoque`
- [ ] Sem uso de `any`; importações com alias `@/`
- [ ] `npm run build` e `npm run lint` passam
- [ ] Verificar no browser: navegar para `/config` renderiza a página

### US-003: Card centralizado com menu lateral
**Descrição:** Como usuário, quero ver um card de configurações com um menu lateral para que eu possa escolher qual configuração ajustar.

**Critérios de Aceitação:**
- [ ] Card centralizado com `borderRadius: 2`, borda `COLORS.border`, `bgcolor: "background.paper"` e `SHADOWS.card`
- [ ] Coluna esquerda com o título "CONFIGURAÇÕES" em uppercase, `letterSpacing` aumentado e cor `text.secondary`
- [ ] Coluna esquerda com uma única linha "Importação" exibindo ícone `upload` + rótulo
- [ ] A linha "Importação" está no estado ativo por padrão: fundo `COLORS.primary` e texto `COLORS.contrastText`
- [ ] Coluna direita com o título "Importação" e o subtítulo "Importe registros de estoque e de caixa a partir de uma planilha."
- [ ] No mobile (<md) o menu empilha acima do painel de conteúdo
- [ ] Altura de toque da linha do menu ≥44px
- [ ] Nenhum `style={{}}`; todo texto em `<Typography>`
- [ ] `npm run build` e `npm run lint` passam
- [ ] Verificar no browser em mobile e desktop

### US-004: Área de upload (dropzone)
**Descrição:** Como usuário, quero arrastar um arquivo ou selecioná-lo do meu dispositivo para que eu possa importar minha planilha.

**Critérios de Aceitação:**
- [ ] Área com borda tracejada (`border: "1px dashed"`), conteúdo centralizado e ícone `upload`
- [ ] Texto principal: "Arraste um arquivo ou selecione do seu dispositivo"
- [ ] Legenda: "Formato aceito: XLSX"
- [ ] `<input type="file" hidden>` com `accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`, sem o atributo `multiple`
- [ ] Clique em qualquer ponto da área abre o seletor de arquivos
- [ ] `onDragOver` e `onDrop` chamam `preventDefault()`; a área muda visualmente durante o arraste
- [ ] Se mais de um arquivo for solto, apenas o primeiro é considerado
- [ ] O nome do arquivo aceito é exibido abaixo da área
- [ ] Todos os handlers usam o prefixo `handle`
- [ ] `npm run build` e `npm run lint` passam
- [ ] Verificar no browser: selecionar por clique e por arrastar-e-soltar

### US-005: Bloqueio de arquivo inválido com Snackbar
**Descrição:** Como usuário, quero ser avisado quando eu tentar enviar um arquivo que não seja Excel para que eu entenda por que o upload não funcionou.

**Critérios de Aceitação:**
- [ ] Criar `src/components/AppSnackbar/AppSnackbar.tsx` + `index.ts`, reexportado em `src/components/index.ts`
- [ ] `AppSnackbar` usa `Snackbar` + `Alert` do MUI, com interface de Props tipada no mesmo arquivo
- [ ] Validação por extensão (case-insensitive) e, quando presente, por MIME type
- [ ] Arquivo `.pdf`, `.png`, `.txt`, `.csv` ou `.xls` é bloqueado e não aparece como selecionado
- [ ] Arquivo bloqueado dispara Snackbar `severity="error"` com "Apenas arquivos Excel (.xlsx) são aceitos."
- [ ] O bloqueio funciona igualmente na seleção por clique e no arrastar-e-soltar
- [ ] O input de arquivo é resetado após cada tentativa
- [ ] A mensagem de erro **não** expõe o nome nem o conteúdo do arquivo (conforme `rules.md`)
- [ ] Snackbar dispensável por clique e com auto-hide (~5s)
- [ ] `npm run build` e `npm run lint` passam
- [ ] Verificar no browser: testar `.xlsx` (aceito) e ao menos dois tipos inválidos (bloqueados)

## Fluxo de Implementação Sugerido

```
Fase 1 — Navegação e rota
├── US-001: Item "Configuração" na nav (constants.ts + AppLayout.tsx)
└── US-002: Rota /config + ConfigurationPage vazia (WebRouter.tsx + pages/)

Fase 2 — Tela
├── US-003: Card centralizado + menu lateral
└── US-004: Área de upload (dropzone)

Fase 3 — Validação
└── US-005: AppSnackbar + bloqueio de tipo inválido
```

## Considerações de Design

- **Referência visual:** mockup fornecido pelo Product Owner — card centralizado sobre o fundo da aplicação, menu lateral com fundo levemente diferenciado, item ativo em vinho (`COLORS.primary`) com texto claro, e dropzone tracejada ocupando a largura do painel.
- **Divergência intencional em relação ao mockup:** o mockup exibe "Formatos aceitos: CSV ou XLSX". O texto implementado será **"Formato aceito: XLSX"**, por decisão do Product Owner e alinhamento com a seção "Validações" do PRD principal.
- **Reutilizar:**
  - `COLORS` e `SHADOWS` — `src/util/constants.ts`
  - Tema MUI — `src/theme/theme.ts`
  - Padrão de ícone via ligature `<Icon fontSize="medium">nome</Icon>` — já usado em `src/components/AppLayout/AppLayout.tsx` e `src/pages/CaixaPage/CaixaPage.tsx`
  - Padrão de header de página (título + subtítulo) — `src/pages/CaixaPage/CaixaPage.tsx`

## Considerações Técnicas

- **Ícones:** o projeto usa `<Icon>` do MUI com ligatures do Material Icons, cuja fonte já está carregada no `index.html`. Os nomes `settings` e `upload` existem no conjunto Material Icons. **Não** instalar `@mui/icons-material`.
- **Tipagem:** `NAV_ITEMS` e `navIcons` são declarados com `as const`; adicionar a terceira entrada em ambos mantém a tipagem coerente e o acesso `navIcons[item.to]` continua válido.
- **MIME type do `.xlsx`:** `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. Em operações de arrastar-e-soltar o MIME pode vir vazio dependendo do sistema operacional — por isso a **extensão é a validação primária** e o MIME é uma verificação de reforço quando disponível.
- **Segurança (`rules.md`):** tipo e formato devem ser validados antes de qualquer processamento; mensagens de erro não devem expor nome ou conteúdo do arquivo enviado.
- **Arquivos impactados:**
  - `src/util/constants.ts` — nova entrada em `NAV_ITEMS`
  - `src/components/AppLayout/AppLayout.tsx` — novo ícone e grid de 3 colunas
  - `src/components/AppSnackbar/` — **novo** (`AppSnackbar.tsx`, `index.ts`)
  - `src/components/index.ts` — reexport do `AppSnackbar`
  - `src/pages/ConfigurationPage/` — **novo** (`ConfigurationPage.tsx`, `index.ts`)
  - `src/pages/index.ts` — reexport da `ConfigurationPage`
  - `src/routes/WebRouter.tsx` — nova rota `/config`

## Plano de Validação

### Validação técnica
- `npm run build` — compilação sem erros
- `npm run lint` — sem erros ou warnings

### Validação manual no browser
- Viewport mobile (360px) e desktop (1280px)
- Navegar para `/config` pelo header desktop e pela bottom nav mobile; confirmar destaque do item ativo
- Confirmar que `/estoque` e `/caixa` continuam funcionando normalmente
- Selecionar um `.xlsx` por clique → nome do arquivo aparece, sem erro
- Arrastar um `.xlsx` sobre a área → mesmo resultado
- Selecionar um `.pdf`, um `.png` e um `.csv` → Snackbar de erro em todos, nenhum arquivo selecionado
- Selecionar um `.xls` → Snackbar de erro (formato legado não é aceito)
- Selecionar o mesmo arquivo duas vezes seguidas → funciona nas duas tentativas
- Dispensar o Snackbar manualmente e aguardar o auto-hide

### Validação de padrões
- Estrutura de pastas e barrel exports conforme `react-development-guide.md`
- Ausência de `any`, `style={{}}` e tags HTML nuas para texto
- `package.json` inalterado

## Métricas de Sucesso

- 100% dos arquivos que não sejam `.xlsx` são bloqueados com aviso visível ao usuário
- A rota `/config` é alcançável em 1 clique a partir de qualquer página, em mobile e desktop
- Build e lint sem erros
- Nenhuma nova dependência adicionada ao projeto

## Questões em Aberto

- Deve haver um limite de tamanho máximo de arquivo (ex.: 5 MB)?
- O card de Configuração deve ter altura mínima fixa, como aparenta o mockup, ou acompanhar o conteúdo?
- Quando o [RF-04] for implementado, qual biblioteca de parsing será adotada — SheetJS (`xlsx`) ou `exceljs`?
- Ao selecionar um segundo arquivo, ele substitui o anterior automaticamente ou o usuário precisa remover o atual primeiro?
- O menu lateral deve permanecer com item único ou já prever a estrutura para futuros itens (ex.: "Exportação", do [RF-05])?

## Sugestão de Commit

```
docs(config): add PRD for spreadsheet import configuration page
```
