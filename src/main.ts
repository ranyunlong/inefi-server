import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeormExceptionFilter } from './utils/typeorm.exception.filter';
import { PageInfo } from './interfaces/page-info';
import { OpenAIPageInfo } from './interfaces/open-ai.page.info';
import { R } from './interfaces/r';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );
  app.useGlobalFilters(new TypeormExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addSecurity('Authorization', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [R, PageInfo, OpenAIPageInfo],
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('swagger-doc.html', app, document);

  await app.listen(8337);
}
void bootstrap();
