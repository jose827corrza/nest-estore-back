import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }), //el primero descarta campos de mas, el segundo descarta y alerta
  );

  const config = new DocumentBuilder()
    .setTitle('JOSE_NEST_STORE')
    .setDescription(
      'An API developed using NestJS framework, this api uses both SQL and NOSQL databases,  Also uses env variables validation.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors(); // Para habilitar consumo fuera del dominio de la API, en la doc se precisa para permitir especificamente
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
