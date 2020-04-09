import * as mongoose from 'mongoose';

export const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  provider: { type: String, required: true },
  mediaType: { type: String, required: true },
  providerId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  watched: { type: Boolean, default: false },
  expired: { type: Boolean, default: false },
});

export interface MediaDTO {
  id: mongoose.Types.ObjectId;
  name: string;
  duration: number;
  provider: string;
  mediaType: string;
  providerId: string;
  expiresAt: Date;
  watched: boolean;
  expired: boolean;
}

export interface Media extends MediaDTO, mongoose.Document {
  id: mongoose.Types.ObjectId;
}
