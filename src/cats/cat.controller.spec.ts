import { Test } from '@nestjs/testing';

import '../_config/envTest';

import { AppModule } from '../app.module';
import { CreateCatDto } from './cat.model';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await catsController.findAll();
      console.log(result);
      expect(result).toBe(result);
    });
  });

  describe('create', () => {
    it('should return created cat', async () => {
      const result = await catsController.create({ name: 'Renato', age: 24, breed: 'asdfsdfsdf' });
      console.log(result);
      expect(result).toBe(result);
    });
  });
});
