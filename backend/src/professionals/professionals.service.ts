import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Availability, Trade } from '@prisma/client';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  private serialize(pro: any) {
    const availabilityMap: Record<Availability, string> = {
      AVAILABLE: 'Disponível',
      BUSY: 'Agenda Cheia',
      CONSULT: 'Consulte',
    };
    return {
      ...pro,
      availability: availabilityMap[pro.availability as Availability] ?? pro.availability,
    };
  }

  async findAll() {
    const professionals = await this.prisma.professional.findMany({
      include: { reviews: true },
      orderBy: { createdAt: 'desc' },
    });
    return professionals.map((p) => this.serialize(p));
  }

  async findOne(id: string) {
    const pro = await this.prisma.professional.findUnique({
      where: { id },
      include: { reviews: true },
    });
    if (!pro) throw new NotFoundException('Profissional não encontrado');
    return this.serialize(pro);
  }

  async createOrUpdate(data: any, userId: string) {
    const availabilityMap: Record<string, Availability> = {
      'Disponível': Availability.AVAILABLE,
      'Agenda Cheia': Availability.BUSY,
      'Consulte': Availability.CONSULT,
    };

    const proData = {
      name: data.name,
      trade: data.trade as Trade[],
      location: data.location,
      avatar: data.avatar,
      bio: data.bio,
      yearsExperience: data.yearsExperience,
      certifications: data.certifications ?? [],
      portfolio: data.portfolio ?? [],
      hourlyRate: data.hourlyRate,
      hourlyRateValue: data.hourlyRateValue,
      availability: availabilityMap[data.availability] ?? Availability.AVAILABLE,
      verified: data.verified ?? false,
    };

    const existing = await this.prisma.professional.findFirst({
      where: { users: { some: { id: userId } } },
    });

    let pro;
    if (existing) {
      pro = await this.prisma.professional.update({
        where: { id: existing.id },
        data: proData,
        include: { reviews: true },
      });
    } else {
      pro = await this.prisma.professional.create({
        data: { ...proData, id: data.id ?? undefined },
        include: { reviews: true },
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        professionalProfileId: pro.id,
        name: pro.name,
        avatar: pro.avatar,
      },
    });

    return this.serialize(pro);
  }
}
