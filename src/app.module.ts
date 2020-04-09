import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_CONNECTION), MediasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
