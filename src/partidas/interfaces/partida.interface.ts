import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from './resultado.interface';

export interface Partida extends Document {
  categoria: string;
  jogadores: Jogador[];
  def: Jogador;
  resultado: Resultado[];
}
