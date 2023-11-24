import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthKeys } from '../di/auth/auth.keys';
import { InfrastructureModule } from '../infrastructure.module';
import { PersistenceModule } from '../persistence/persistence.module';
import { TestPersistenceModule } from '../persistence/test-persistence.module';

describe('Login User', () => {
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

  it('Should be able to login a user', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'Password123!',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(201);

    const loginRequest = {
      email: newUserRequest.email,
      password: newUserRequest.password,
    };

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .expect(201);

    expect(response.body).toHaveProperty('token');
    expect(response.body.token).not.toBeNull();
    expect(response.body.token).not.toBeUndefined();
    expect(response.body.token).not.toBe('');
    expect(response.headers['set-cookie'][0]).toContain(AuthKeys.AUTH_COOKIE);
  });

  it('Should not be able to login a user with a wrong password', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'Password123!',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(201);

    const loginRequest = {
      email: newUserRequest.email,
      password: 'incorrectPassword',
    };

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Invalid credentials');
  });

  it('Should not be able to login a user with a wrong email', async () => {
    const newUserRequest = {
      email: 'email@email.com',
      password: 'Password123!',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserRequest)
      .expect(201);

    const loginRequest = {
      email: 'incorrect@email.com',
      password: newUserRequest.password,
    };

    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(loginRequest)
      .expect(401);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Invalid credentials');
  });
});
