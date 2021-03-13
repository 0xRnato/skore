import { Test } from '@nestjs/testing';
import mongoose = require('mongoose');

import '../_config/envTest';

import { AppModule } from '../app.module';
import { IMediaRequest } from './media.model';
import { MediaController } from './media.controller';

async function cleanDB() {
  mongoose.set('useCreateIndex', true);
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const collection = mongoose.connection.db.collection('media');
  if (collection) {
    await collection.drop();
  }
  await mongoose.connection.close();
}

describe('Media Controller', () => {
  let controller: MediaController;
  let mockResponse: IMediaRequest;
  let mockData: IMediaRequest;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = testingModule.get<MediaController>(MediaController);
    mockData = {
      name: 'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
      duration: 3006,
      provider: 'youtube',
      media_type: 'video',
      provider_id: 'STKCRSUsyP0',
      expires_at: 1580428851394,
    };
  });

  afterAll(async () => {
    await cleanDB();
  });

  describe('Create', () => {
    it('Should return the expired created media', async () => {
      const response: IMediaRequest = await controller.create(mockData);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('duration');
      expect(response).toHaveProperty('provider');
      expect(response).toHaveProperty('media_type');
      expect(response).toHaveProperty('provider_id');
      expect(response).toHaveProperty('expires_at');
      expect(response).toHaveProperty('watched');
      expect(response).toHaveProperty('expired');
      expect(response.watched).toBe(false);
      expect(response.expired).toBe(true);

      mockResponse = { ...mockData, id: response.id };
    });

    it('Should return the non-expired created media', async () => {
      // Set the expiration timestamp to tomorrow
      const today = new Date();
      mockData.expires_at = today.setDate(today.getDate() + 1);

      const response: IMediaRequest = await controller.create(mockData);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('duration');
      expect(response).toHaveProperty('provider');
      expect(response).toHaveProperty('media_type');
      expect(response).toHaveProperty('provider_id');
      expect(response).toHaveProperty('expires_at');
      expect(response).toHaveProperty('watched');
      expect(response).toHaveProperty('expired');
      expect(response.watched).toBe(false);
      expect(response.expired).toBe(false);
    });

    it('Should return error by trying to create a new media with an existing ID', async () => {
      try {
        await controller.create(mockResponse);
      } catch (error) {
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('statusCode');
        expect(error.response).toHaveProperty('message');
        expect(error.response).toHaveProperty('error');
        expect(error.response.statusCode).toBe(400);
        expect(error.response.error).toBe('Bad Request');
      }
    });

    it('Should return an error when trying to create a media with invalid id', async () => {});
  });

  describe('Read all', () => {
    it('Should return an array of medias', async () => {
      const response = await controller.readAll();

      expect(Array.isArray(response)).toBe(true);

      if (response.length > 0) {
        expect(response[0]).toHaveProperty('id');
        expect(response[0]).toHaveProperty('name');
        expect(response[0]).toHaveProperty('duration');
        expect(response[0]).toHaveProperty('provider');
        expect(response[0]).toHaveProperty('media_type');
        expect(response[0]).toHaveProperty('provider_id');
        expect(response[0]).toHaveProperty('expires_at');
        expect(response[0]).toHaveProperty('watched');
        expect(response[0]).toHaveProperty('expired');
      }
    });
  });

  describe('Read by ID', () => {
    it('Should return a not watched media object', async () => {
      const response = await controller.readById(mockResponse.id);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('duration');
      expect(response).toHaveProperty('provider');
      expect(response).toHaveProperty('media_type');
      expect(response).toHaveProperty('provider_id');
      expect(response).toHaveProperty('expires_at');
      expect(response).toHaveProperty('watched');
      expect(response).toHaveProperty('expired');
      expect(response.watched).toBe(false);
      expect(response.expired).toBe(true);
    });

    it('Should return the same media object but watched', async () => {
      const response = await controller.readById(mockResponse.id);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('duration');
      expect(response).toHaveProperty('provider');
      expect(response).toHaveProperty('media_type');
      expect(response).toHaveProperty('provider_id');
      expect(response).toHaveProperty('expires_at');
      expect(response).toHaveProperty('watched');
      expect(response).toHaveProperty('expired');
      expect(response.watched).toBe(true);
      expect(response.expired).toBe(true);
    });

    it('Should return an error when trying to read a media with invalid id', async () => {});
  });

  describe('Update', () => {
    it('Should return the updated media with the watched flag set false', async () => {
      const response = await controller.update(mockResponse.id, {
        name: 'new name',
        provider: 'new provider',
      });

      expect(response.id).toBe(mockResponse.id);
      expect(response.name).toBe('new name');
      expect(response.duration).toBe(mockResponse.duration);
      expect(response.provider).toBe('new provider');
      expect(response.media_type).toBe(mockResponse.media_type);
      expect(response.provider_id).toBe(mockResponse.provider_id);
      expect(response.expires_at).toBe(mockResponse.expires_at);
      expect(response.watched).toBe(false);
      expect(response.expired).toBe(true);
    });

    it('Should return an error when trying to update a media with invalid id', async () => {});
  });

  describe('Delete', () => {
    it('Should delete a media and return an error when trying to find it', async () => {
      try {
        await controller.delete(mockResponse.id);
        await controller.readById(mockResponse.id);
      } catch (error) {
        expect(error).toHaveProperty('response');
        expect(error.response).toHaveProperty('statusCode');
        expect(error.response).toHaveProperty('message');
        expect(error.response).toHaveProperty('error');
        expect(error.response.statusCode).toBe(404);
        expect(error.response.error).toBe('Not Found');
      }
    });

    it('Should return an error when trying to delete a media with invalid id', async () => {});
  });
});
