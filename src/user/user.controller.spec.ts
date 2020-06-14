import { Test } from '@nestjs/testing';

import '../_config/envTest';

import { AppModule } from '../app.module';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should return created cat', async () => {
      const result = await catsController.create({ name: 'Renato', age: 24, breed: 'asdfsdfsdf' });
      console.log(result);
      expect(result).toBe(result);
    });
  });
});
