import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

    app.useGlobalPipes(  
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true, //Esto es para permitir la conversion de string a number en mi DTO
    transformOptions: {
      enableImplicitConversion: true
    } 
  }) 
);

  await app.listen( process.env.PORT );//process.env.PORT ?? 3000); //Debemos de asegurar de poner esta variable **process.env.PORT**, es en donde el servio en las nubes nos asigna nuestro puerto 
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
