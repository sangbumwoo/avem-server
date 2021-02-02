import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseController } from './firebase/firebase.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, FirebaseController],
  providers: [AppService],
})
export class AppModule {}
