import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/modules/Base/PaginationDTO';

export class FilterDepartmentDTO extends PaginationDTO {

  @ApiPropertyOptional({ description: 'Date', example: '2024-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiPropertyOptional({ description: 'Operation type', example: 'create' })
  @IsOptional()
  @IsString()
  operation: string;
}
