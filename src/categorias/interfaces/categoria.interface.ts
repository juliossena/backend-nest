import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Evento } from './evento.interface';

export interface Categoria extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Evento[];
  jogadores: Jogador[];
}
