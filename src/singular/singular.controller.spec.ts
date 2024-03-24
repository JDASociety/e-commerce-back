import { Test, TestingModule } from '@nestjs/testing';
import { SingularController } from './singular.controller';
import { SingularService } from './singular.service';

describe('SingularController', () => {
  let controller: SingularController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingularController],
      providers: [SingularService],
    }).compile();

    controller = module.get<SingularController>(SingularController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
