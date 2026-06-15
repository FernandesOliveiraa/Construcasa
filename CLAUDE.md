# ConstruCasa — Guia Técnico do Projeto

## Descrição do Projeto

ConstruCasa é um marketplace que conecta clientes a profissionais de construção e reforma. O cliente descreve o serviço que precisa, encontra profissionais qualificados e solicita orçamentos diretamente pela plataforma.

---

## Stack

| Tecnologia         | Versão / Observação                            |
|--------------------|------------------------------------------------|
| React              | 19                                             |
| TypeScript         | 5.x                                            |
| Vite               | Bundler e dev server                           |
| Tailwind CSS       | v4 — gerenciado pelo plugin `@tailwindcss/vite` |
| NestJS             | Backend API REST (autenticação, dados, AI)     |
| PostgreSQL         | Banco de dados relacional                       |
| Prisma             | ORM — acesso ao banco de dados                  |
| JWT                | Autenticação (access token + refresh token)     |
| Docker             | Containerização do banco e da API               |

---

## Arquitetura: Feature-Based (OBRIGATÓRIO)

Todo código novo deve seguir o padrão feature-based. Cada feature encapsula seus próprios componentes e hooks. Nenhuma feature importa diretamente de outra feature — comunicação via types compartilhados ou hooks globais.

---

## Estrutura de Pastas

```
src/
  features/
    auth/
      components/       → AuthModal
      hooks/            → useAuth
    professionals/
      components/       → ProfessionalCard, ProfessionalProfile, SearchFilters, JoinForm
      hooks/            → useProfessionals
    quotes/
      components/       → QuoteRequestForm, QuoteSuccessModal, ReviewModal
      hooks/            → useQuotes
    dashboard/
      components/       → ClientDashboard, ProfessionalDashboard
    chat/
      components/       → ChatSystem
      hooks/            → useChat
  components/
    layout/             → NavBar, BottomNav, Footer
    shared/             → Hero, BrandBar, Testimonials, FAQ
  lib/
    firebase.ts         → configuração e helpers do Firebase
  services/
    geminiService.ts    → chamadas às Cloud Functions
  types/
    index.ts            → todos os tipos TypeScript do projeto
  constants/
    professionals.ts    → dados mock (apenas dados, sem lógica)
  utils/
    professionals.ts    → funções utilitárias puras
  styles/
    colors.ts           → design tokens de cores
  App.tsx
  index.css
```

---

## Regras de Importação

- Sempre usar o alias `@/` para importar de `src/`
- Exemplos corretos:
  ```typescript
  import { db } from '@/lib/firebase';
  import type { Professional } from '@/types';
  import { useAuth } from '@/features/auth/hooks/useAuth';
  import { ProfessionalCard } from '@/features/professionals/components/ProfessionalCard';
  ```
- **Proibido**: caminhos relativos longos (`../../../lib/firebase`)
- Caminhos relativos dentro da mesma feature são aceitáveis (`./components/ProfessionalCard`)

---

## Regras de Código

### Tipagem
- Nunca usar `any` — sempre tipar explicitamente
- Tipos de dados ficam em `src/types/index.ts`
- Tipos locais (somente dentro de uma feature) podem ficar no próprio arquivo

### Responsabilidade por Camada

| Camada     | Responsabilidade                                              | Proibido                        |
|------------|---------------------------------------------------------------|---------------------------------|
| Componentes| UI e estado local (`useState`, `useRef`)                      | Lógica de negócio, Firebase     |
| Hooks      | Lógica de negócio, Firebase, side effects                     | Renderização JSX                |
| Services   | Chamadas externas (Cloud Functions, APIs externas)            | Estado, renderização            |
| Utils      | Funções puras sem side effects                                | Firebase, estado, side effects  |
| Types      | Contratos de dados (interfaces, types)                        | Qualquer lógica                 |
| Constants  | Dados estáticos e configurações                               | Lógica, imports de Firebase     |

### IDs e Identificadores
- **Proibido**: `Math.random()` para gerar IDs
- **Obrigatório**: `crypto.randomUUID()`

---

## Regras Firebase

- Sempre limpar listeners em `useEffect`:
  ```typescript
  useEffect(() => {
    const unsubscribe = onSnapshot(query, handler);
    return unsubscribe; // obrigatório
  }, []);
  ```
- Nunca logar PII (email, userId, nome) no `console`
- Sempre envolver operações Firestore em `try/catch`
- Dados de seed/mock apenas em scripts separados (`scripts/seed.ts`), nunca chamados em produção
- Variáveis de ambiente Firebase ficam em `.env.local` (nunca commitadas)

---

## Gerenciamento de Estado

- Estado global de autenticação: hook `useAuth` (consumir diretamente ou via Context)
- Não criar estado duplicado entre componentes que compartilham dados — elevar o estado ou usar o hook compartilhado
- Usar `useMemo` para listas derivadas passadas como props
- Usar `useCallback` para funções passadas como props a componentes filhos

---

## Cores e Design Tokens

- Tokens de referência definidos em `src/styles/colors.ts`
- No Tailwind v4, usar variáveis CSS definidas em `index.css`:
  ```css
  --color-brand: #ff6321;
  ```
- Usar classes semânticas do Tailwind: `bg-brand`, `text-brand`
- **Proibido**: hex hardcoded nos componentes — `bg-[#ff6321]` não é permitido

---

## Proibições

- Não criar helper wrappers de rota apenas para repassar props — usar hooks
- Não misturar lógica de negócio com renderização em componentes
- Não commitar `.env.local`
- Não usar `console.log` em código que vai para produção (remover antes de commitar)
- Não usar o pacote `motion` — não está em uso e deve ser removido do `package.json`
- Não usar caminhos relativos longos para importações fora da mesma feature

---

## Exceções Documentadas

| Exceção                                   | Justificativa                                                                        | Ação futura                                          |
|-------------------------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------|
| Vite em vez de Next.js                    | Projeto iniciado como MVP de marketplace sem requisito imediato de SSR/SEO           | Avaliar migração para Next.js para SEO em v2         |
| Sem React Hook Form + Zod                 | Formulários existentes foram construídos antes da padronização                       | Adotar em todos os novos formulários                 |

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Checagem de tipos
npx tsc --noEmit
```

---

## Padrão Onerent — Referência Técnica

Este projeto segue o **Documento Técnico de Padrão de Desenvolvimento da Onerent**. As regras abaixo complementam as seções anteriores deste CLAUDE.md.

### Stack aprovada (conforme padrão Onerent para MVP/Dashboard com Vite)

| Camada | Tecnologia |
|--------|-----------|
| Framework | Vite + React 19 + TypeScript 5.x |
| UI | Tailwind CSS v4 |
| Componentes | Lucide React (ícones) |
| Arquitetura | Feature-based |
| Tokens de cor | `src/styles/colors.ts` ✓ |
| Formulários novos | React Hook Form + Zod (obrigatório) |
| Backend | NestJS + PostgreSQL + Prisma + JWT |
| Validação | Zod |

### Regras adicionais do padrão Onerent aplicáveis aqui

**Cores:**
- `src/styles/colors.ts` já existe — NUNCA adicionar hex hardcoded nos componentes
- Usar classes Tailwind semânticas definidas em `index.css` (`bg-brand`, `text-navy`, etc.)
- Proibido: `bg-[#E85D26]`, `color: '#1B2B4B'`

**Formulários novos:**
- OBRIGATÓRIO: React Hook Form + Zod em qualquer formulário novo
- Formulários existentes (JoinForm, QuoteRequestForm): migrar progressivamente

**TypeScript:**
- Sem `any` — sem exceção
- Tipos de dados em `src/types/index.ts`
- Tipos locais (usados apenas dentro de um arquivo/feature) podem ficar no próprio arquivo

**Logs:**
- Proibido `console.log` em código React/Firebase (componentes, hooks, services)
- Permitido apenas em: scripts Node.js (`scripts/seed.ts`, `scripts/`)
- Firebase Functions: usar `functions.logger` em vez de `console.log`

**Separação por camada — resumo executivo:**
```
Componente → apenas UI + estado local
Hook       → lógica + Firebase + side effects
Service    → Cloud Functions externas
Utils      → funções puras (sem Firebase, sem estado)
Types      → só tipos (sem lógica)
Constants  → dados estáticos (sem imports Firebase)
```

**Arquitetura por features — regra de importação:**
- Nenhuma feature importa de outra diretamente
- Comunicação entre features: via tipos compartilhados em `src/types/` ou hooks globais
- `src/pages/` é uma exceção documentada: páginas standalone de marketing/institucional que não pertencem a uma feature de negócio

### Exceções documentadas (conforme padrão Onerent — todas justificadas)

| Exceção | Justificativa | Ação futura |
|---------|--------------|-------------|
| Vite em vez de Next.js | MVP de marketplace sem requisito imediato de SSR/SEO | Avaliar migração Next.js para v2 (SEO, marketplace público) |
| Formulários sem React Hook Form + Zod | Construídos antes da padronização | Adotar em todos os novos formulários |
| `src/pages/` fora de features | Páginas de marketing/institucional sem domínio de negócio | Manter como exceção válida |
| ShadCN UI não implementado | Projeto iniciou com Tailwind puro | Adotar ShadCN progressivamente em novos componentes |

### Referência do padrão completo

O padrão Onerent completo está disponível como skill em:
```
~/.claude/commands/onerent-padrao.md
```

Invoke via `/onerent-padrao` em qualquer sessão do Claude Code para aplicar o padrão completo.
