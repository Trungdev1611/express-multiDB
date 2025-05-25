import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Đặt ValidationPipe toàn cục
    app.useGlobalPipes(new ValidationPipe({
      transform: true,  // Chuyển đổi dữ liệu vào đúng kiểu DTO
      whitelist: true,  // Tự động loại bỏ các trường không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có trường không có trong DTO
    }));

    let  PORT = process.env.PORT || 3002
    PORT = 3002
    console.log(`PORT`, PORT)
    app.enableCors()

  await app.listen(PORT);
}
bootstrap();
