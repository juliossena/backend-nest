import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from '../interfaces/resultado.interface';

export class AtribuirDesafioDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  def: Jogador;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  resultado: Resultado[];
}
