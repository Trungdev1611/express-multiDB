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
      whitelist: false,  // Tự động loại bỏ các trường không được định nghĩa trong DTO hoặc không
      forbidNonWhitelisted: false, // Báo lỗi hoặc không nếu có trường không có trong DTO
    }));

    const PORT = process.env.PORT || 3002
    console.log(`PORT`, PORT)
  await app.listen(PORT);
}
bootstrap();
