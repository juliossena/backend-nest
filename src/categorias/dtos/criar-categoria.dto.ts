import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Evento } from '../interfaces/evento.interface';

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [String] })
  eventos: Evento[];
}
