import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Media, MediaDTO } from './media.model';

@Injectable()
export class MediasService {
  constructor(@InjectModel('Media') private readonly model: Model<Media>) {}

  async create(
    name: string,
    duration: number,
    provider: string,
    mediaType: string,
    providerId: string,
    expiresAt: Date,
  ): Promise<MediaDTO> {
    const media = new this.model({
      name,
      duration,
      provider,
      mediaType,
      providerId,
      expiresAt,
    });

    await media.save();
    const result = this.parseMedia(media);
    return result;
  }

  async readAll(): Promise<MediaDTO[]> {
    const medias = await this.model.find().exec();
    return medias.map(_media => this.parseMedia(_media));
  }

  async readById(id: string): Promise<MediaDTO> {
    const media = await this.findMedia(id);
    return this.parseMedia(media);
  }

  async update(
    id: string,
    name: string,
    duration: number,
    provider: string,
    mediaType: string,
    providerId: string,
    expiresAt: Date,
  ): Promise<MediaDTO> {
    const media = await this.findMedia(id);

    if (name) media.name = name;
    if (duration) media.duration = duration;
    if (provider) media.provider = provider;
    if (mediaType) media.mediaType = mediaType;
    if (providerId) media.providerId = providerId;
    if (expiresAt) media.expiresAt = expiresAt;

    await media.save();
    return this.parseMedia(media);
  }

  async delete(id: string): Promise<void> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException(`Could not find media with id: ${id}`);
    }
  }

  private async findMedia(id: string): Promise<Media> {
    try {
      const media = await this.model.findById(id).exec();
      if (!media) {
        throw new Error();
      }
      return media;
    } catch (error) {
      throw new NotFoundException(`Could not find media with id: ${id}`);
    }
  }

  private parseMedia(media: Media): MediaDTO {
    return {
      id: media.id,
      name: media.name,
      duration: media.duration,
      provider: media.provider,
      mediaType: media.mediaType,
      providerId: media.providerId,
      expiresAt: media.expiresAt,
      watched: media.watched,
      expired: media.expired,
    };
  }
}
