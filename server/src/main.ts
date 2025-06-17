import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// main.ts
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Đặt ValidationPipe toàn cục
    app.useGlobalPipes(new ValidationPipe({
      transform: true,  // Chuyển đổi dữ liệu vào đúng kiểu DTO
      whitelist: true,  // Tự động loại bỏ các trường không được định nghĩa trong DTO
      // forbidNonWhitelisted: true, // Báo lỗi nếu có trường không có trong DTO
    }));

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API documentation')
  .setVersion('1.0')
    .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', // chỉ để hiển thị, không ảnh hưởng logic
      name: 'Authorization',
      in: 'header',
    },
    'access-token', // 👈 tên định danh
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document); // Swagger 

    let  PORT = process.env.PORT || 3002
    PORT = 3002
    console.log(`PORT`, PORT)
    app.enableCors()

  await app.listen(PORT);
}
bootstrap();
