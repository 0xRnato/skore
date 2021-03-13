import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Media, IMedia, IMediaRequest } from './media.model';

@Injectable()
export class MediaService {
  constructor(@InjectModel('Media') private readonly model: Model<Media>) {}

  public async create(mediaRequest: IMediaRequest): Promise<IMediaRequest> {
    const mediaData: IMedia = this.parseToMedia(mediaRequest);
    let media: Media;

    if (mediaData.id) {
      media = await this.model.findById(mediaData.id).exec();
      if (media) {
        throw new BadRequestException(`There is already a media with id: ${mediaData.id}`);
      }
    }

    mediaData.expired = new Date(mediaData.expiresAt) < new Date();
    media = new this.model(mediaData);

    await media.save();
    return this.parseToMediaRequest(media);
  }

  public async readAll(): Promise<IMediaRequest[]> {
    const medias = await this.model.find().exec();
    return medias.map((_media) => this.parseToMediaRequest(_media));
  }

  public async readById(id: string): Promise<IMediaRequest> {
    const media = await this.findMedia(id);
    media.expired = new Date(media.expiresAt) < new Date();
    const parsedMedia = this.parseToMediaRequest(media);
    if (!media.watched) {
      media.watched = true;
      await media.save();
    }
    return parsedMedia;
  }

  public async update(mediaRequest: IMediaRequest): Promise<IMediaRequest> {
    const mediaData = this.parseToMedia(mediaRequest);
    const media = await this.findMedia(mediaData.id);

    if (mediaData.name) media.name = mediaData.name;
    if (mediaData.duration) media.duration = mediaData.duration;
    if (mediaData.provider) media.provider = mediaData.provider;
    if (mediaData.mediaType) media.mediaType = mediaData.mediaType;
    if (mediaData.providerId) media.providerId = mediaData.providerId;
    if (mediaData.expiresAt) media.expiresAt = mediaData.expiresAt;
    media.watched = false;

    await media.save();
    return this.parseToMediaRequest(media);
  }

  public async delete(id: string): Promise<void> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException(`Could not find media with id: ${id}`);
    }
  }

  private async findMedia(id: string): Promise<Media> {
    const media = await this.model.findById(id).exec();
    if (!media) {
      throw new NotFoundException(`Could not find media with id: ${id}`);
    }
    return media;
  }

  private parseToMediaRequest(media: Media): IMediaRequest {
    return {
      id: media.id,
      name: media.name,
      duration: media.duration,
      provider: media.provider,
      media_type: media.mediaType,
      provider_id: media.providerId,
      expires_at: media.expiresAt,
      watched: media.watched,
      expired: media.expired,
    };
  }

  private parseToMedia(media: IMediaRequest): IMedia {
    return {
      id: media.id,
      name: media.name,
      duration: media.duration,
      provider: media.provider,
      mediaType: media.media_type,
      providerId: media.provider_id,
      expiresAt: media.expires_at,
      watched: media.watched,
      expired: media.expired,
    };
  }
}
