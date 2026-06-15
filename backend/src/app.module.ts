import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { QuotesModule } from './quotes/quotes.module';
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfessionalsModule,
    QuotesModule,
    ChatModule,
    AiModule,
  ],
})
export class AppModule {}
