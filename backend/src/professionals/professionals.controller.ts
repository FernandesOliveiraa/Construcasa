import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfessionalsService } from './professionals.service';

@ApiTags('professionals')
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  createOrUpdate(@Body() body: any, @Request() req: { user: { id: string } }) {
    return this.professionalsService.createOrUpdate(body, req.user.id);
  }
}
