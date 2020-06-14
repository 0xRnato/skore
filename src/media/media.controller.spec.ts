import { Test } from '@nestjs/testing';

import '../_config/envTest';

import { AppModule } from '../app.module';
import { IMedia } from './media.model';
import { MediaController } from './media.controller';

describe('Media Controller', () => {
  let controller: MediaController;
  let mockResult: IMedia;
  let mockData: IMedia;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = moduleRef.get<MediaController>(MediaController);
    mockData = {
      name: 'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
      duration: 3006,
      provider: 'youtube',
      mediaType: 'video',
      providerId: 'STKCRSUsyP0',
      expiresAt: 1580428851394,
    };
  });

  describe('Create', () => {
    it('Should return the created media id', async () => {
      const result = await controller.create(mockData);

      expect(result).toHaveProperty('id');
      expect(typeof result.id).toBe('string');

      mockResult = { ...mockData, id: result.id };
    });

    it('Should return error by trying to create a new media with an existing ID', async () => {
      const result = await controller.create(mockResult);
      // TODO: write more conditions
      expect(typeof result).toBe('string');
    });
  });

  describe('Read all', () => {
    it('Should return an array of IMedia', async () => {
      const result = await controller.readAll();

      expect(typeof result).toBe('IMedia[]');
    });
  });

  describe('Read by ID', () => {
    it('', async () => {});
  });

  describe('Update', () => {
    it('', async () => {});
  });

  describe('Delete', () => {
    it('', async () => {});
  });
});
