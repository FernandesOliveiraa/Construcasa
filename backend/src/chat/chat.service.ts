import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  private serializeSession(s: any) {
    return {
      ...s,
      lastMessageTime: s.lastMessageTime instanceof Date ? s.lastMessageTime.toISOString() : s.lastMessageTime,
      createdAt: s.createdAt instanceof Date ? s.createdAt.toISOString() : s.createdAt,
    };
  }

  private serializeMessage(m: any) {
    return {
      id: m.id,
      senderId: m.senderId,
      text: m.text,
      timestamp: m.createdAt instanceof Date ? m.createdAt.toISOString() : m.createdAt,
    };
  }

  async findAllSessions(userId: string, userType: string, professionalProfileId?: string | null) {
    const where = userType === 'CLIENT'
      ? { clientId: userId }
      : { proId: professionalProfileId ?? userId };

    const sessions = await this.prisma.chatSession.findMany({
      where,
      orderBy: { lastMessageTime: 'desc' },
    });
    return sessions.map((s) => this.serializeSession(s));
  }

  async startChat(proUserId: string, currentUser: { id: string; name: string }) {
    const proUser = await this.prisma.user.findUnique({ where: { id: proUserId } });
    if (!proUser) throw new NotFoundException('Usuário profissional não encontrado');

    const existing = await this.prisma.chatSession.findUnique({
      where: { clientId_proId: { clientId: currentUser.id, proId: proUserId } },
    });
    if (existing) return this.serializeSession(existing);

    const session = await this.prisma.chatSession.create({
      data: {
        clientId: currentUser.id,
        clientName: currentUser.name,
        proId: proUserId,
        proName: proUser.name,
        proAvatar: proUser.avatar ?? '',
        lastMessage: 'Conversa iniciada',
      },
    });
    return this.serializeSession(session);
  }

  async getMessages(chatId: string, userId: string) {
    const session = await this.prisma.chatSession.findUnique({ where: { id: chatId } });
    if (!session) throw new NotFoundException('Chat não encontrado');
    if (session.clientId !== userId && session.proId !== userId) {
      throw new ForbiddenException('Sem acesso a este chat');
    }

    const messages = await this.prisma.message.findMany({
      where: { chatSessionId: chatId },
      orderBy: { createdAt: 'asc' },
    });
    return messages.map((m) => this.serializeMessage(m));
  }

  async sendMessage(chatId: string, text: string, senderId: string) {
    const session = await this.prisma.chatSession.findUnique({ where: { id: chatId } });
    if (!session) throw new NotFoundException('Chat não encontrado');

    const message = await this.prisma.message.create({
      data: { text, senderId, chatSessionId: chatId },
    });

    await this.prisma.chatSession.update({
      where: { id: chatId },
      data: { lastMessage: text, lastMessageTime: new Date() },
    });

    return this.serializeMessage(message);
  }
}
