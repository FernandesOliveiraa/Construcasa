import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private mapType(type: 'client' | 'professional'): UserType {
    return type === 'professional' ? UserType.PROFESSIONAL : UserType.CLIENT;
  }

  private serializeUser(user: { id: string; email: string; name: string; type: UserType; avatar: string | null; phone: string | null; location: string | null; professionalProfileId: string | null }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type === UserType.PROFESSIONAL ? 'professional' : (user.type === UserType.ADMIN ? 'admin' : 'client'),
      avatar: user.avatar ?? undefined,
      phone: user.phone ?? undefined,
      location: user.location ?? undefined,
      professionalProfileId: user.professionalProfileId ?? undefined,
    };
  }

  private generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET ?? 'fallback-secret',
      expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET ?? 'fallback-refresh-secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    });
    return { accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('E-mail já cadastrado');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
        type: this.mapType(dto.type),
      },
    });

    const tokens = this.generateTokens(user.id, user.email);

    await this.prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { ...tokens, user: this.serializeUser(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = this.generateTokens(user.id, user.email);

    await this.prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { ...tokens, user: this.serializeUser(user) };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: string; email: string }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'fallback-refresh-secret',
      });

      const stored = await this.prisma.refreshToken.findUnique({ where: { token: refreshToken } });
      if (!stored || stored.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
      }

      await this.prisma.refreshToken.delete({ where: { token: refreshToken } });

      const tokens = this.generateTokens(payload.sub, payload.email);
      await this.prisma.refreshToken.create({
        data: {
          token: tokens.refreshToken,
          userId: payload.sub,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return tokens;
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return this.serializeUser(user);
  }

  async updateProfile(userId: string, data: Partial<{ name: string; avatar: string; phone: string; location: string }>) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    return this.serializeUser(user);
  }
}
