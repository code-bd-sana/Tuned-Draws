import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AssignTicketsDto {
  @ApiProperty({
    description: 'Target Raffle / Competition ID',
    example: 'raffle-uuid-1234',
  })
  @IsString()
  @IsNotEmpty()
  raffleId: string;

  @ApiProperty({
    description: 'Recipient User ID',
    example: 'user-uuid-5678',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'Specific ticket numbers to manually allocate',
    example: [7, 14, 21],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  ticketNumbers?: number[];

  @ApiPropertyOptional({
    description: 'Random available ticket quantity if specific numbers are omitted',
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Admin notes or reason for assignment (e.g., Giveaway prize, Loyalty reward)',
    example: 'Loyalty reward bonus allocation',
  })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}
