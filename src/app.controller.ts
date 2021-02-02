import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('push')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  sendMessage(@Req() request: Request): string {
    return this.appService.sendMessageToKakao(request.body);
  }
}
