import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';
import { Jogador } from 'src/jogadores/entities/jogador.entity';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String })
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  solicitante: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty({ type: [JogadorDTO] })
  jogadores: Jogador[];
}
