import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getStatus(): string {
    return this.service.getStatus();
  }
}
