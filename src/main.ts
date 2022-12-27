import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { Status } from './projects/types';

registerEnumType(Status, { name: 'Status' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
