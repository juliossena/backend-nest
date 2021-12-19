import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Evento } from '../interfaces/evento.interface';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [String] })
  eventos: Evento[];
}
