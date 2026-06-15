import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteStatus, UserType } from '@prisma/client';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  private mapStatus(status: string): QuoteStatus {
    const map: Record<string, QuoteStatus> = {
      pending: QuoteStatus.PENDING,
      accepted: QuoteStatus.ACCEPTED,
      rejected: QuoteStatus.REJECTED,
      completed: QuoteStatus.COMPLETED,
    };
    return map[status] ?? QuoteStatus.PENDING;
  }

  private serializeStatus(status: QuoteStatus): string {
    const map: Record<QuoteStatus, string> = {
      PENDING: 'pending',
      ACCEPTED: 'accepted',
      REJECTED: 'rejected',
      COMPLETED: 'completed',
    };
    return map[status];
  }

  private serialize(q: any) {
    return { ...q, status: this.serializeStatus(q.status), createdAt: q.createdAt.toISOString(), updatedAt: q.updatedAt.toISOString() };
  }

  async findAll(userId: string, userType: UserType, professionalProfileId?: string | null) {
    const where =
      userType === UserType.CLIENT
        ? { clientId: userId }
        : { proId: professionalProfileId ?? userId };

    const quotes = await this.prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return quotes.map((q) => this.serialize(q));
  }

  async create(data: any, currentUser: { id: string; name: string }) {
    const pro = await this.prisma.user.findUnique({ where: { id: data.proId } });
    if (!pro) throw new NotFoundException('Profissional não encontrado');

    const quote = await this.prisma.quoteRequest.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        preferredDate: data.preferredDate,
        images: data.images ?? [],
        status: QuoteStatus.PENDING,
        clientId: currentUser.id,
        clientName: currentUser.name,
        proId: pro.id,
        proName: pro.name,
        proAvatar: pro.avatar ?? '',
        professionalId: pro.professionalProfileId,
        viewedByPro: false,
      },
    });
    return this.serialize(quote);
  }

  async update(id: string, data: any, userId: string) {
    const quote = await this.prisma.quoteRequest.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException('Orçamento não encontrado');

    if (quote.clientId !== userId && quote.proId !== userId) {
      throw new ForbiddenException('Sem permissão para atualizar este orçamento');
    }

    const updateData: any = {};
    if (data.status) updateData.status = this.mapStatus(data.status);
    if (data.priceEstimate !== undefined) updateData.priceEstimate = data.priceEstimate;
    if (data.viewedByPro !== undefined) updateData.viewedByPro = data.viewedByPro;
    if (data.hasReviewed !== undefined) updateData.hasReviewed = data.hasReviewed;

    const updated = await this.prisma.quoteRequest.update({ where: { id }, data: updateData });
    return this.serialize(updated);
  }

  async addReview(quoteId: string, reviewData: { rating: number; text: string; author: string }) {
    const quote = await this.prisma.quoteRequest.findUnique({ where: { id: quoteId } });
    if (!quote) throw new NotFoundException('Orçamento não encontrado');

    if (quote.professionalId) {
      await this.prisma.review.create({
        data: {
          author: reviewData.author,
          rating: reviewData.rating,
          text: reviewData.text,
          date: new Date().toISOString().split('T')[0],
          professionalId: quote.professionalId,
        },
      });
    }

    const updated = await this.prisma.quoteRequest.update({
      where: { id: quoteId },
      data: { hasReviewed: true, viewedByPro: false },
    });
    return this.serialize(updated);
  }
}
