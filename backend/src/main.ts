// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Ligne ajoutée

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // On dit à notre application d'utiliser le ValidationPipe globalement.
  // C'est cette ligne qui active la validation de nos DTOs.
  app.useGlobalPipes(new ValidationPipe()); // <-- Ligne ajoutée

  await app.listen(3000);
}
bootstrap();