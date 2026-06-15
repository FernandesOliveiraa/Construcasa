import { PrismaClient, Trade, Availability, UserType, QuoteStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Hash de senha padrão para todos os usuários de teste
  const passwordHash = await bcrypt.hash('demo123456', 10);

  // ── Profissionais ──────────────────────────────────────────────────────────
  const pro1 = await prisma.professional.upsert({
    where: { id: 'pro-001' },
    update: {},
    create: {
      id: 'pro-001',
      name: 'Carlos Silva',
      trade: [Trade.PEDREIRO, Trade.PINTOR],
      location: 'São Paulo, SP',
      avatar: 'https://i.pravatar.cc/200?img=11',
      bio: 'Especialista em alvenaria e acabamentos com mais de 15 anos de experiência.',
      yearsExperience: 15,
      verified: true,
      certifications: ['Técnico em Edificações - SENAI', 'NR-35 Trabalho em Altura'],
      portfolio: ['https://picsum.photos/seed/obra1/400/300', 'https://picsum.photos/seed/obra2/400/300'],
      hourlyRate: 'R$ 100',
      hourlyRateValue: 100,
      availability: Availability.AVAILABLE,
    },
  });

  const pro2 = await prisma.professional.upsert({
    where: { id: 'pro-002' },
    update: {},
    create: {
      id: 'pro-002',
      name: 'Mariana Costa',
      trade: [Trade.ARQUITETO],
      location: 'Rio de Janeiro, RJ',
      avatar: 'https://i.pravatar.cc/200?img=5',
      bio: 'Arquiteta focada em projetos de interiores sustentáveis.',
      yearsExperience: 8,
      verified: true,
      certifications: ['CAU Ativo', 'Mestrado em Sustentabilidade'],
      portfolio: ['https://picsum.photos/seed/arq1/400/300'],
      hourlyRate: 'R$ 300',
      hourlyRateValue: 300,
      availability: Availability.CONSULT,
    },
  });

  // Adicionar reviews aos profissionais
  await prisma.review.upsert({
    where: { id: 'rev-001' },
    update: {},
    create: {
      id: 'rev-001',
      author: 'Ana Souza',
      rating: 5,
      text: 'Excelente profissional, trabalho impecável!',
      date: '2024-01-15',
      professionalId: pro1.id,
    },
  });

  await prisma.review.upsert({
    where: { id: 'rev-002' },
    update: {},
    create: {
      id: 'rev-002',
      author: 'Lucas Mendes',
      rating: 5,
      text: 'A consultoria da Mariana mudou meu apartamento.',
      date: '2024-02-20',
      professionalId: pro2.id,
    },
  });

  // ── Usuários ───────────────────────────────────────────────────────────────
  const clientUser = await prisma.user.upsert({
    where: { email: 'cliente@demo.com' },
    update: {},
    create: {
      id: 'user-client-001',
      email: 'cliente@demo.com',
      password: passwordHash,
      name: 'João Cliente',
      type: UserType.CLIENT,
      avatar: 'https://i.pravatar.cc/200?img=33',
      phone: '(11) 99999-0001',
      location: 'São Paulo, SP',
    },
  });

  const proUser = await prisma.user.upsert({
    where: { email: 'profissional@demo.com' },
    update: {},
    create: {
      id: 'user-pro-001',
      email: 'profissional@demo.com',
      password: passwordHash,
      name: 'Carlos Silva',
      type: UserType.PROFESSIONAL,
      avatar: 'https://i.pravatar.cc/200?img=11',
      phone: '(11) 99999-0002',
      professionalProfileId: pro1.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      id: 'user-admin-001',
      email: 'admin@demo.com',
      password: passwordHash,
      name: 'Admin ConstruCasa',
      type: UserType.ADMIN,
    },
  });

  // ── Quote Requests ─────────────────────────────────────────────────────────
  await prisma.quoteRequest.upsert({
    where: { id: 'qr-001' },
    update: {},
    create: {
      id: 'qr-001',
      title: 'Reforma do banheiro',
      description: 'Preciso reformar o banheiro completo, trocar revestimento e louças.',
      location: 'São Paulo, SP',
      preferredDate: '2024-03-15',
      images: [],
      status: QuoteStatus.PENDING,
      clientId: clientUser.id,
      clientName: clientUser.name,
      proId: proUser.id,
      proName: proUser.name,
      proAvatar: proUser.avatar ?? '',
      professionalId: pro1.id,
      viewedByPro: false,
    },
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log('');
  console.log('Usuários de teste:');
  console.log('  Cliente:      cliente@demo.com      / demo123456');
  console.log('  Profissional: profissional@demo.com / demo123456');
  console.log('  Admin:        admin@demo.com        / demo123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
