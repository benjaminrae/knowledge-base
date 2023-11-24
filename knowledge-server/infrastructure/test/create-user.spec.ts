import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { InfrastructureModule } from '../infrastructure.module';
import { PersistenceModule } from '../persistence/persistence.module';
import { TestPersistenceModule } from '../persistence/test-persistence.module';

describe('Create User', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
    })
      .overrideModule(PersistenceModule)
      .useModule(TestPersistenceModule)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be able to create a user', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'Password123!',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('Should validate make sure the user uses a strong password', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(400);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message[0]).toContain('password is not strong enough');
  });

  it('Should not allow creating a user with an existing email', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'Password123!',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(201);

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(400);
  });
});
