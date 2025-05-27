import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min, Max, IsString } from 'class-validator';

export class PaginationDTO {
  @ApiPropertyOptional({ description: 'Page number (min 1)', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page (max 100)', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiPropertyOptional({description: "Search with name", example: "test"})
  @IsOptional()
  @IsString()
  name: string
}
