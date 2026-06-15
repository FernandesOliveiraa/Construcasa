import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findAll(@Request() req: { user: { id: string; type: string; professionalProfileId?: string } }) {
    return this.chatService.findAllSessions(req.user.id, req.user.type, req.user.professionalProfileId);
  }

  @Post()
  startChat(@Body() body: { proUserId: string }, @Request() req: { user: { id: string; name: string } }) {
    return this.chatService.startChat(body.proUserId, req.user);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.chatService.getMessages(id, req.user.id);
  }

  @Post(':id/messages')
  sendMessage(@Param('id') id: string, @Body() body: { text: string }, @Request() req: { user: { id: string } }) {
    return this.chatService.sendMessage(id, body.text, req.user.id);
  }
}
