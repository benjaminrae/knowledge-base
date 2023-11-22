import { Controller, Get } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';

@Controller()
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  @Get()
  getHello(): string {
    return this.infrastructureService.getHello();
  }
}
