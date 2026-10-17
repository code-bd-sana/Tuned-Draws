import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CompetitionsQueryDto {
  @ApiPropertyOptional({
    description: 'Search query matching competition title or slug',
    example: 'TaylorMade',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'Filter by Host Profile ID',
  })
  @IsOptional()
  @IsString()
  hostId?: string;
}

export class HistoryQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search query for user email, recipient name, or transaction ID',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class UsersSearchQueryDto {
  @ApiPropertyOptional({
    description: 'Search term matching user email, first name, last name, or ID',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
