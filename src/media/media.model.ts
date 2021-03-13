import { Schema, Document } from 'mongoose';

export const MediaSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  provider: { type: String, required: true },
  mediaType: { type: String, required: true },
  providerId: { type: String, required: true },
  expiresAt: { type: Number, required: true },
  watched: { type: Boolean, required: true, default: false },
  expired: { type: Boolean, required: true },
});

export interface IMedia {
  id?: string;
  name: string;
  duration: number;
  provider: string;
  mediaType: string;
  providerId: string;
  expiresAt: number;
  watched?: boolean;
  expired?: boolean;
}

export interface IMediaRequest {
  id?: string;
  name?: string;
  duration?: number;
  provider?: string;
  media_type?: string;
  provider_id?: string;
  expires_at?: number;
  watched?: boolean;
  expired?: boolean;
}

export interface Media extends IMedia, Document {
  id: string;
}
