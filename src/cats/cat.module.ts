import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Cat, CatSchema } from './cat.model';
import { CatsService } from './cat.service';
import { CatsController } from './cat.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
