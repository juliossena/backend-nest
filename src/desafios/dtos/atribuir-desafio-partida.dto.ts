import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from '../../partidas/interfaces/resultado.interface';

export class AtribuirDesafioDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  def: JogadorDTO;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  resultado: Resultado[];
}
