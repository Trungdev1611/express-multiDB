import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { PositionRepoSitory } from './position.repository';

@Module({
  imports: [],
  controllers: [PositionController],
  providers: [PositionService, PositionRepoSitory],
  exports: []
})
export class PositionModule {}