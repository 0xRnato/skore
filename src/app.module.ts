import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MediaModule } from './media/media.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_CONNECTION), MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
