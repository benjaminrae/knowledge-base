import { env } from '@app/configs';
import { ErrorsInterceptor } from '@app/infrastructure/api/http-rest/interceptors/errors.interceptor';
import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(InfrastructureModule);

  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  app.enableShutdownHooks();

  app.enableCors();

  await app.listen(env.PORT);
}
bootstrap();
