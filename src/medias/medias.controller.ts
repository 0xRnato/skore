import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { MediaDTO } from './media.model';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor(private readonly service: MediasService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('duration') duration: number,
    @Body('provider') provider: string,
    @Body('media_type') mediaType: string,
    @Body('provider_id') providerId: string,
    @Body('expires_at') expiresAt: Date,
  ): Promise<MediaDTO> {
    const result = await this.service.create(name, duration, provider, mediaType, providerId, expiresAt);
    return result;
  }

  @Get()
  async readAll(): Promise<MediaDTO[]> {
    const result = await this.service.readAll();
    return result;
  }

  @Get(':id')
  readById(@Param('id') id: string): Promise<MediaDTO> {
    const result = this.service.readById(id);
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('duration') duration: number,
    @Body('provider') provider: string,
    @Body('media_type') mediaType: string,
    @Body('provider_id') providerId: string,
    @Body('expires_at') expiresAt: Date,
  ): Promise<MediaDTO> {
    const result = await this.service.update(id, name, duration, provider, mediaType, providerId, expiresAt);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
