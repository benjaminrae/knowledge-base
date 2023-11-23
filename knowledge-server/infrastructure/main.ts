import { env } from '@app/configs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InfrastructureModule } from './infrastructure.module';

async function bootstrap() {
  const app = await NestFactory.create(InfrastructureModule);

  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableShutdownHooks();

  app.enableCors();

  await app.listen(env.PORT);
}
bootstrap();
