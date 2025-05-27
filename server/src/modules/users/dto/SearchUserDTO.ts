// search-user.dto.ts
import { IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from 'src/modules/Base/PaginationDTO';
import { Type } from 'class-transformer';

export class SearchUserDto  extends PaginationDTO{
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  positionId: number;
}
