import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppDb} from "./db/AppDb";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: ['http://localhost:5173', 'http://127.0.0.1:5173']});
  await AppDb.appDb.initialize();
  await app.listen(5555);
}
bootstrap();
