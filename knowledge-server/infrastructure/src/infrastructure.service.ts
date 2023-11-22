import { Injectable } from '@nestjs/common';

@Injectable()
export class InfrastructureService {
  getHello(): string {
    return 'Hello World!';
  }
}
