# 📦 Stock Manager

Aplicação web para empreendedores do ramo da moda gerenciarem estoque e fluxo de caixa de forma objetiva, visual e produtiva.

---

## 🎯 Funcionalidades

- **Gestão de estoque** — criação, edição e exclusão de itens
- **Fluxo de caixa** — controle de contas a pagar e a receber
- **Importação via Excel** — upload de arquivos `.xlsx` com validação automática de estrutura e dados
- **Exportação JSON** — exportação dos dados do estoque em formato `.json`
- **Backup automático** — geração de backup dos dados atuais antes de qualquer importação

---

## 🛠️ Stack

| Tecnologia | Versão |
|---|---|
| Node.js | v23.11.0 |
| Vite | v8.0.12 |
| React | v19.2.6 |
| TypeScript | v6.0.2 |
| React Router | — |
| React Compiler | — |
| Supabase | — |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js `v23.11.0`
- Conta no [Supabase](https://supabase.com/) com projeto criado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/stock-manager.git
cd stock-manager/Front-End

# Instale as dependências
npm install
```

### Configuração de ambiente

Crie um arquivo `.env` na raiz de `Front-End/` com base no `.env.example`:

```env
VITE_API_BASE_URL=https://sua-url-supabase.supabase.co
```

> ⚠️ Nunca comite o arquivo `.env`. Apenas `.env.example` deve ser versionado.

### Execução

```bash
# Ambiente de desenvolvimento
npm run dev

# Build de produção
npm run build
```

---

## 📁 Estrutura do Projeto

```
└── 📁 Front-End
    └── 📁 src
        ├── 📁 assets        # Imagens e arquivos estáticos
        ├── 📁 components    # Componentes reutilizáveis
        ├── 📁 css           # Estilos globais
        ├── 📁 pages         # Componentes de página (um por rota)
        ├── 📁 routes        # Definição de rotas (WebRouter.tsx)
        ├── 📁 service       # Camada de comunicação com a API
        ├── 📁 store         # Estado global (Redux)
        ├── 📁 types         # Interfaces e tipos TypeScript
        ├── 📁 util          # Helpers e constantes
        ├── App.tsx
        └── main.tsx
```

---

## 📄 Documentação

| Arquivo | Descrição |
|---|---|
| `docs/prd-stock-manager.md` | Requisitos, regras de negócio e tecnologias |
| `docs/guides/react-development-guide.md` | Padrões de desenvolvimento React do projeto |
| `docs/rules/engineering.md` | Regras de qualidade de código e commits |
| `docs/rules/rules.md` | Diretrizes de segurança |
| `AGENTS.md` | Instruções para agentes de IA |

---

## ⚠️ Limitações

O projeto utiliza o plano gratuito do Supabase, que possui limites de uso. Consulte a [documentação oficial](https://supabase.com/docs/guides/functions/limits) para detalhes.

---

> Desenvolvido por **Lucas Silva Gonçalves**