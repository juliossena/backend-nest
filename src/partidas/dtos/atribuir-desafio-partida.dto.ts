import { IsNotEmpty } from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from '../interfaces/resultado.interface';

export class AtribuirDesafioDto {
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  resultado: Resultado[];
}
