import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { MediaSchema } from './media.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema }])],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule {}
