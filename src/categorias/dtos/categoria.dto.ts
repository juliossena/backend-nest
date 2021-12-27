import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoriaDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly id: number;
}
