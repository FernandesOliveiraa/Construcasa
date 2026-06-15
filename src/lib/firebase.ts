/**
 * Firebase removido.
 * Este projeto foi migrado para NestJS + PostgreSQL + Prisma.
 * Cliente HTTP: @/lib/api
 *
 * Para desenvolvimento local:
 *   1. docker-compose up -d postgres
 *   2. cd backend && npm run prisma:migrate && npm run prisma:seed
 *   3. cd backend && npm run start:dev
 *   4. npm run dev (frontend — sem VITE_USE_EMULATOR)
 */

// Re-export do cliente HTTP para evitar quebra de imports legados durante migração
export { api, tokenStorage, getApiErrorMessage } from './api';
