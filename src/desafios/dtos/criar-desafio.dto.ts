import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String })
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  solicitante: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ type: [JogadorDTO] })
  jogadores: JogadorDTO[];
}
