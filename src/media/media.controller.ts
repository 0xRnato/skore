import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { IMediaRequest } from './media.model';
import { MediaService } from './media.service';

@Controller('api/v1/media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Post()
  public async create(@Body() media: IMediaRequest): Promise<IMediaRequest> {
    const result = await this.service.create(media);
    return result;
  }

  @Get()
  public async readAll(): Promise<IMediaRequest[]> {
    const result = await this.service.readAll();
    return result;
  }

  @Get(':id')
  public async readById(@Param('id') id: string): Promise<IMediaRequest> {
    const result = await this.service.readById(id);
    return result;
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() media: IMediaRequest,
  ): Promise<IMediaRequest> {
    const result = await this.service.update({ id, ...media });
    return result;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
