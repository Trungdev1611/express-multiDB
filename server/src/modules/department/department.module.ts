import { DepartmentRepo } from './department.repository';
import { DepartmentEntity } from './Department.entity';
import { Module } from '@nestjs/common';
import { DepartController } from './department.controller';
import { DepartService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity]),
  ],
  controllers: [DepartController],
  providers: [DepartService, DepartmentRepo],
  exports: [DepartmentRepo]
})
export class DepartModule {}