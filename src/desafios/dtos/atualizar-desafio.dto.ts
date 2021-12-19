import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class AtualizarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String })
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  status: string;
}
