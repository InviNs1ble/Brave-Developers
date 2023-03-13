import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Чат')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
