import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuotesService } from './quotes.service';
import { UserType } from '@prisma/client';

@ApiTags('quotes')
@Controller('quotes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  findAll(@Request() req: { user: { id: string; type: UserType; professionalProfileId?: string } }) {
    return this.quotesService.findAll(req.user.id, req.user.type, req.user.professionalProfileId);
  }

  @Post()
  create(@Body() body: any, @Request() req: { user: { id: string; name: string } }) {
    return this.quotesService.create(body, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req: { user: { id: string } }) {
    return this.quotesService.update(id, body, req.user.id);
  }

  @Post(':id/review')
  addReview(@Param('id') id: string, @Body() body: { rating: number; text: string; author: string }) {
    return this.quotesService.addReview(id, body);
  }
}
