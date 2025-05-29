import { Module } from '@nestjs/common';
import { ContractRepository } from './contract.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [ContractRepository],
  exports: [ContractRepository]
})
export class ContractModule {}