import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from '../app.service';

@Controller('firebase/send-message')
export class FirebaseController {
    constructor(private readonly appService: AppService) { }

    @Post()
    sendMessage(@Req() request: Request): any {
        return this.appService.sendMessageToFirebase(request.body);
  }
}

