import { Body, Controller, Get, Post } from '@nestjs/common';

import { Cat, CreateCatDto } from './cat.model';
import { CatsService } from './cat.service';

@Controller('api/v1/cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<CreateCatDto[]> {
    return this.catsService.findAll();
  }
}
