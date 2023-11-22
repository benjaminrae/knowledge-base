import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureController } from './infrastructure.controller';
import { InfrastructureService } from './infrastructure.service';

describe('InfrastructureController', () => {
  let infrastructureController: InfrastructureController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InfrastructureController],
      providers: [InfrastructureService],
    }).compile();

    infrastructureController = app.get<InfrastructureController>(
      InfrastructureController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(infrastructureController.getHello()).toBe('Hello World!');
    });
  });
});
