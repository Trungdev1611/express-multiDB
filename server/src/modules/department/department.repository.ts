import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DepartmentEntity } from './Department.entity';

// NestJS repository from v0.3+
@Injectable()
export class DepartmentRepo {
  private readonly repository: Repository<DepartmentEntity>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(DepartmentEntity);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return this.repository.find();
  }
}