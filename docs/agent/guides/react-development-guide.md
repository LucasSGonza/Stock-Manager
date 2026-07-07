---
description: Guia de desenvolvimento React - estrutura de projeto, criação de componentes, hooks, serviços, roteamento e padrões adotados.
alwaysApply: true
---

# React Development Guide

Este documento serve como guia técnico de desenvolvimento para o projeto **Stock Manager**. Ele define os padrões, convenções e restrições que devem ser seguidos em toda e qualquer contribuição ao front-end.

Consulte também os documentos relacionados:
- `web-interface-guide.md` — orientações visuais sobre o projeto
- `engineering.md` — regras globais de engenharia e qualidade de código
- `rules.md` — diretrizes de segurança
- `prd-stock-manager.md` — requisitos e regras de negócio do projeto

---

## Stack e Versões

As versões abaixo são fixas e **não devem ser alteradas sem aprovação explícita** (ver `engineering.md`):

| Tecnologia       | Versão     |
|------------------|------------|
| Node.js          | v23.11.0   |
| Vite             | v8.0.12    |
| React            | v19.2.6    |
| TypeScript       | v6.0.2     |
| React Router     | latest compatível com React 19 |
| React Compiler   | habilitado |
| Supabase         | client SDK |

> **NUNCA** atualize versões de dependências sem avaliação e aprovação explícita.

---

## Estrutura do Projeto

```
└── 📁Front-End
    └── 📁src
        └── 📁assets          # Imagens, fontes e arquivos estáticos
        └── 📁components      # Componentes reutilizáveis e utilitários
            └── 📁[ComponentName]
                ├── ComponentName.tsx
                ├── index.ts
            ├── index.ts      # Barrel export de todos os componentes
        └── 📁css
            ├── index.css     # Estilos globais
        └── 📁pages           # Componentes de página (um por rota)
            └── 📁[PageName]
                ├── PageName.tsx
                ├── index.ts
            ├── index.ts      # Barrel export de todas as páginas
        └── 📁routes
            ├── WebRouter.tsx # Definição central de rotas
        └── 📁service         # Camada de comunicação com APIs externas
            ├── api.ts        # Instância base do cliente HTTP
            ├── [domain]Service.ts
            ├── index.ts
        └── 📁store           # Estado global (Redux)
            └── 📁[domain]
                ├── [domain]Slice.ts
            ├── hooks.ts      # useAppDispatch e useAppSelector tipados
            ├── index.ts
        └── 📁types
            ├── types.ts      # Interfaces e tipos globais do projeto
            ├── index.ts
        └── 📁util            # Utilitários, helpers e constantes
            ├── constants.ts
            ├── index.ts
        ├── App.tsx
        ├── main.tsx
        └── vite-env.d.ts
```

### Regras de estrutura

- Cada componente, página ou utilitário visual **deve ter sua própria pasta** com um `index.ts` de re-exportação (barrel export).
- O `index.ts` raiz de cada diretório (`components/index.ts`, `pages/index.ts`, etc.) deve re-exportar todos os membros públicos do diretório.
- **NUNCA** crie arquivos soltos dentro de `src/` fora das pastas definidas acima.
- **NUNCA** coloque lógica de negócio dentro de componentes de página — extraia para hooks ou serviços.

---

## Inicialização do Projeto

### `main.tsx`

O ponto de entrada da aplicação deve seguir exatamente este padrão:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
```

A ordem dos providers deve ser respeitada: `BrowserRouter` > `Provider` (Redux) > `App`.

### `App.tsx`

`App.tsx` é responsável por:
- Renderizar o layout estrutural da aplicação (NavBar + área de conteúdo principal)
- Orquestrar o carregamento inicial de dados globais via `useEffect`
- Exibir um estado de loading global enquanto os dados iniciais não estão prontos
- Renderizar o `WebRouter`

```tsx
function App() {
  // 1. Hooks de estado e store
  // 2. useEffect para carregamento inicial de dados
  // 3. Render condicional de loading
  // 4. Render do layout principal com <WebRouter />
}

export default App;
```

> `App.tsx` usa `export default`. Todos os outros componentes e páginas usam **named export**.

---

## Roteamento

### `WebRouter.tsx`

Todas as rotas da aplicação são definidas em um único arquivo `src/routes/WebRouter.tsx`:

```tsx
import { Routes, Route } from "react-router-dom";
import { HomePage, StockPage } from "@/pages";

const WebRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  );
};

export default WebRouter;
```

### Regras de roteamento

- **NUNCA** defina rotas fora de `WebRouter.tsx`.
- Cada rota deve corresponder a exatamente um componente de página dentro de `src/pages/`.
- Use `React Router` para toda navegação — **NUNCA** manipule `window.location` diretamente.

---

## Componentes

### Tipagem e assinatura

Todo componente deve ser tipado com `React.FC<Props>` e ter sua interface de Props declarada no mesmo arquivo:

```tsx
import { Box } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  padding?: CSSProperties["padding"];
}

export const Card: React.FC<CardProps> = ({
  children,
  width = "auto",
  height = "auto",
  padding = "24px",
}) => {
  return (
    <Box
      sx={{
        bgcolor: "#ffff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgb(0,0,0,0.4)",
        padding,
        width,
        height,
      }}
    >
      {children}
    </Box>
  );
};
```

### Regras de componentes

- Use **named export** para todos os componentes, exceto `App.tsx`.
- A interface de Props deve ser declarada **no mesmo arquivo** do componente, acima da definição do componente.
- Props obrigatórias não devem ter valor default; props opcionais (`?`) devem ter valor default sempre que possível.
- Prefixe handlers de evento com `handle`: `handleClick`, `handleSubmit`, `handleCloseModal`.
- Prefixe booleanos de estado com `is` ou `open` quando aplicável: `isLoading`, `openModal`.
- **NUNCA** use componentes `class` — use apenas **functional components**.
- **NUNCA** passe objetos `sx` inline complexos repetidos em múltiplos componentes — extraia para uma constante ou componente dedicado.

### Barrel exports (`index.ts`)

Cada pasta de componente deve ter um `index.ts` de re-exportação:

```ts
// src/components/Card/index.ts
export { Card } from "./Card";
```

E o `index.ts` raiz de `components/` deve re-exportar tudo:

```ts
// src/components/index.ts
export { Card } from "./Card";
export { NavBar } from "./NavBar";
// ...
```

Isso permite importações limpas como `import { Card, NavBar } from "@/components"`.

---

## Estilização

O projeto utiliza **Material UI (MUI)** como biblioteca de componentes e sistema de estilização via prop `sx`.

### Regras de estilização

- Use sempre o sistema `sx` do MUI para estilização inline — **NUNCA** use `style={{}}` do React.
- Componentes de layout devem ser construídos com `<Box>` do MUI.
- Use `<Typography>` do MUI para todos os textos — **NUNCA** use tags HTML nuas como `<p>`, `<h1>`, `<span>` diretamente.
- Valores de espaçamento, cores e bordas recorrentes devem ser extraídos para constantes em `src/util/constants.ts`.
- O projeto é **Mobile First** (ver `prd-stock-manager.md`, RNF-01) — use breakpoints do MUI para responsividade.

```tsx
// ✅ Correto
<Box sx={{ display: "flex", gap: "16px" }}>

// ❌ Incorreto
<div style={{ display: "flex", gap: "16px" }}>
```

---

## Hooks

### Hooks do Redux

Sempre use os hooks tipados do projeto, **nunca** os hooks genéricos do `react-redux` diretamente:

```tsx
// ✅ Correto
import { useAppDispatch, useAppSelector } from "@/store/hooks";

// ❌ Incorreto
import { useDispatch, useSelector } from "react-redux";
```

### Hooks customizados

- Crie hooks customizados quando uma lógica de estado/efeito for reutilizada em mais de um componente.
- Hooks customizados devem residir dentro da pasta do componente que os utiliza, ou em `src/util/` se forem globais.
- Nomes devem seguir o prefixo `use`: `useStockFilter`, `useFileUpload`.

### Regras de hooks

- **NUNCA** chame hooks dentro de condicionais, loops ou funções aninhadas — siga as [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).
- `useEffect` deve sempre declarar todas as suas dependências no array. **NUNCA** omita dependências para suprimir warnings.
- **NUNCA** deixe um `useEffect` sem tratamento de erro em operações assíncronas:

```tsx
// ✅ Correto
useEffect(() => {
  SomeService.fetchData()
    .then((data) => dispatch(updateList(data)))
    .catch((e) => console.error(e))
    .finally(() => setLoading(false));
}, [dispatch]);

// ❌ Incorreto — sem tratamento de erro
useEffect(() => {
  SomeService.fetchData().then((data) => dispatch(updateList(data)));
}, []);
```

---

## Camada de Serviço

### `src/service/api.ts`

A instância do cliente HTTP é criada uma única vez e exportada para uso pelos demais serviços:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

> `VITE_API_BASE_URL` deve estar definida no arquivo `.env`. **NUNCA** hardcode URLs de API no código-fonte.

### Serviços de domínio

Cada domínio da aplicação deve ter seu próprio arquivo de serviço em `src/service/`:

```ts
// src/service/stockService.ts
import api from "./api";
import { StockItem } from "@/types/types";

export const StockService = {
  getAll: async (): Promise<StockItem[]> => {
    const { data } = await api.get("/stock");
    return data;
  },

  create: async (item: Omit<StockItem, "id">): Promise<StockItem> => {
    const { data } = await api.post("/stock", item);
    return data;
  },

  update: async (id: string, item: Partial<StockItem>): Promise<StockItem> => {
    const { data } = await api.put(`/stock/${id}`, item);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/stock/${id}`);
  },
};
```

### Regras de serviço

- Serviços devem ser objetos com métodos nomeados pelo verbo da operação — **NUNCA** funções soltas.
- **NUNCA** chame `api` diretamente dentro de componentes ou páginas — sempre passe por um serviço.
- **NUNCA** exponha detalhes de erros internos (stacktrace, mensagem de banco) para o cliente (ver `rules.md`).
- Todo serviço deve ser re-exportado pelo `src/service/index.ts`.

---

## Estado Global (Redux)

### Estrutura de um Slice

Cada domínio de estado deve ter seu próprio slice em `src/store/[domain]/[domain]Slice.ts`:

```ts
// src/store/stock/stockSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockItem } from "@/types/types";

interface StockState {
  list: StockItem[];
}

const initialState: StockState = {
  list: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateStockList(state, action: PayloadAction<StockItem[]>) {
      state.list = action.payload;
    },
  },
});

export const { updateStockList } = stockSlice.actions;

export const selectStockList = (state: { stock: StockState }) => state.stock.list;

export default stockSlice.reducer;
```

### Regras de estado global

- **NUNCA** manipule estado global diretamente fora de um slice.
- Selectors devem ser exportados junto ao slice e usados com `useAppSelector`.
- Use o Redux apenas para estado **verdadeiramente global** (dados compartilhados entre múltiplas páginas). Estado local do componente (`useState`) é preferível quando o dado não precisa ser compartilhado.

---

## Tipagem

### `src/types/types.ts`

Todas as interfaces e tipos de domínio do projeto devem ser declaradas neste arquivo:

```ts
// Prefixo "D" para tipos que representam entidades do banco de dados
export interface DStockItem {
  id: string;
  name: string;
  category: string;
  size: string;
  quantity: number;
  price: number;
}
```

### Regras de tipagem

- **NUNCA** use `any` — prefira `unknown` quando o tipo não for determinado, e faça a validação adequada antes de usar.
- Entidades vindas do banco de dados devem ser prefixadas com `D` (ex: `DStockItem`).
- **NUNCA** declare tipos inline em componentes quando o mesmo tipo é usado em mais de um lugar — mova para `types.ts`.
- Use `CSSProperties["<propriedade>"]` para tipar props de estilo, conforme padrão estabelecido nos exemplos.

---

## Alias de Importação

O alias `@/` aponta para `src/`. Use-o **sempre** para importações absolutas, evitando caminhos relativos longos:

```tsx
// ✅ Correto
import { Card } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { DStockItem } from "@/types/types";

// ❌ Incorreto
import { Card } from "../../components";
import { useAppSelector } from "../../../store/hooks";
```

---

## Variáveis de Ambiente

- Todas as variáveis de ambiente devem ser prefixadas com `VITE_` para serem expostas ao cliente Vite.
- Acesse-as via `import.meta.env.VITE_NOME_DA_VARIAVEL`.
- **NUNCA** comite o arquivo `.env` — apenas `.env.example` com as chaves (sem valores) deve ser versionado.
- **NUNCA** hardcode URLs, tokens, chaves ou qualquer valor de configuração diretamente no código.

---

## Convenções de Nomenclatura

| Elemento              | Convenção             | Exemplo                      |
|-----------------------|-----------------------|------------------------------|
| Componentes           | PascalCase            | `StockTable`, `UploadModal`  |
| Páginas               | PascalCase + sufixo `Page` | `StockPage`, `HomePage` |
| Hooks customizados    | camelCase + prefixo `use` | `useStockFilter`         |
| Serviços              | PascalCase + sufixo `Service` | `StockService`      |
| Slices Redux          | camelCase + sufixo `Slice` | `stockSlice`            |
| Selectors             | camelCase + prefixo `select` | `selectStockList`    |
| Event handlers        | camelCase + prefixo `handle` | `handleOpenModal`    |
| Arquivos de componente | PascalCase.tsx        | `StockTable.tsx`             |
| Arquivos de serviço   | camelCase.ts          | `stockService.ts`            |
| Constantes globais    | UPPER_SNAKE_CASE      | `MAX_FILE_SIZE_MB`           |
| Variáveis de ambiente | VITE_UPPER_SNAKE_CASE | `VITE_API_BASE_URL`          |

---

## Checklist de Desenvolvimento

Antes de considerar qualquer tarefa concluída, verifique:

- [ ] A estrutura de pastas e barrel exports foi seguida
- [ ] O componente usa `React.FC<Props>` com interface tipada
- [ ] Não há uso de `any` no TypeScript
- [ ] Importações usam o alias `@/` ao invés de caminhos relativos longos
- [ ] Event handlers seguem o prefixo `handle`
- [ ] `useEffect` com operações assíncronas tem `.catch()` — sem blocos vazios
- [ ] Nenhuma URL, token ou credencial hardcoded
- [ ] Variáveis de ambiente acessadas via `import.meta.env.VITE_*`
- [ ] Nenhuma lógica de negócio dentro de componentes de página
- [ ] Checklist de segurança do `rules.md` foi aplicado