import { ContractEntity } from './contract.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

// NestJS repository from v0.3+
@Injectable()
export class ContractRepository {
  private readonly repository: Repository<ContractEntity>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ContractEntity);
  }

  async findAll(): Promise<ContractEntity[]> {
    return this.repository.find();
  }
}