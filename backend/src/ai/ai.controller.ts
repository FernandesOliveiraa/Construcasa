import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('parse-search')
  parseSearch(@Body() body: { query: string }) {
    return this.aiService.parseSearchQuery(body.query);
  }

  @Post('reputation-summary')
  reputationSummary(@Body() body: { reviews: Array<{ rating: number; text: string; author: string }> }) {
    return this.aiService.generateReputationSummary(body.reviews);
  }
}
