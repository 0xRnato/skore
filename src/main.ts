import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import './config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();