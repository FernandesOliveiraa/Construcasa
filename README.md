# ConstruCasa

Marketplace que conecta clientes a profissionais de construção e reforma. O cliente descreve o serviço que precisa, encontra profissionais qualificados e solicita orçamentos diretamente pela plataforma.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript 5 + Vite |
| Estilização | Tailwind CSS v4 |
| Backend | NestJS + TypeScript |
| Banco de dados | PostgreSQL 16 (Docker) |
| ORM | Prisma |
| Autenticação | JWT (access 15m + refresh 7d) |
| IA | Google Gemini 1.5 Flash |
| Containerização | Docker + Docker Compose |

---

## Pré-requisitos

- Node.js 20+
- Docker Desktop
- npm 10+

---

## Configuração inicial

### 1. Instalar dependências

```bash
# Dependências do frontend
npm install

# Dependências do backend
cd backend && npm install && cd ..
```

### 2. Variáveis de ambiente

**Frontend** — crie `.env.local` na raiz:
```env
VITE_API_URL=http://localhost:3333/api
```

**Backend** — o arquivo `backend/.env` já existe no repositório com valores para desenvolvimento local:
```env
DATABASE_URL=postgresql://construcasa:construcasa123@localhost:5432/construcasa_db
JWT_SECRET=change-this-in-production
JWT_REFRESH_SECRET=change-this-refresh-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3333
```

> `GEMINI_API_KEY` é opcional. Sem ele, a busca inteligente usa fallback local.

### 3. Subir o banco de dados

```bash
npm run db:up
```

### 4. Aplicar migrations e popular o banco

```bash
npm run backend:migrate
npm run backend:seed
```

### 5. Iniciar os servidores

**Terminal 1 — Backend:**
```bash
npm run backend:dev
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Acesse: **http://localhost:3000**  
API: **http://localhost:3333/api**  
Swagger: **http://localhost:3333/api/docs**

---

## Contas de demonstração

| Tipo | E-mail | Senha |
|------|--------|-------|
| Cliente | `cliente@demo.com` | `demo123456` |
| Profissional | `profissional@demo.com` | `demo123456` |
| Admin | `admin@demo.com` | `demo123456` |

---

## Scripts disponíveis

```bash
# Frontend
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run preview      # preview do build

# Backend
npm run backend:dev      # backend em modo watch
npm run backend:migrate  # aplica migrations Prisma
npm run backend:seed     # popula o banco com dados de demonstração

# Banco de dados
npm run db:up        # sobe o container PostgreSQL
npm run db:down      # derruba o container PostgreSQL
```

---

## Arquitetura

O projeto segue arquitetura **feature-based**. Cada feature encapsula seus próprios componentes e hooks. Comunicação entre features via tipos compartilhados em `src/types/`.

```
src/
  features/
    auth/           → autenticação JWT
    professionals/  → listagem e perfis de profissionais
    quotes/         → solicitação e gestão de orçamentos
    dashboard/      → dashboards de cliente e profissional
    chat/           → sistema de mensagens
  components/
    layout/         → NavBar, BottomNav, Footer
    shared/         → Hero, FAQ, Testimonials
  lib/
    api.ts          → cliente axios com interceptors JWT
  services/
    geminiService.ts → integração com Gemini AI
  types/
    index.ts        → contratos de dados globais

backend/
  src/
    auth/           → registro, login, refresh, logout
    professionals/  → CRUD de profissionais
    quotes/         → CRUD de orçamentos
    chat/           → sessões e mensagens
    ai/             → parse de busca e análise de reputação
    prisma/         → serviço de conexão com o banco
```

---

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/register` | Cadastro |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/refresh` | Renovar token |
| `GET` | `/api/auth/me` | Perfil autenticado |
| `GET` | `/api/professionals` | Listar profissionais |
| `GET` | `/api/professionals/:id` | Perfil do profissional |
| `GET` | `/api/quotes` | Orçamentos do usuário |
| `POST` | `/api/quotes` | Solicitar orçamento |
| `POST` | `/api/ai/parse-search` | Análise de busca com IA |

Documentação completa: `http://localhost:3333/api/docs`
