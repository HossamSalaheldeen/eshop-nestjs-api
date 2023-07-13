import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  const config = new DocumentBuilder()
    .setTitle("Paradigm Admin Panel")
    .setDescription("Paradigm Admin Panel API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(8000);
}

bootstrap();
