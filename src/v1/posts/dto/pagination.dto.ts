import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: false, default: 1, description: 'Page number' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @ApiProperty({ required: false, default: 1, description: 'Posts per page' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 5;
}
