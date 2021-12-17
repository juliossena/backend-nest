import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Partida } from 'src/partidas/interfaces/partida.interface';
import { DesafioStatus } from '../enums/desafio-status.enum';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Jogador[];
  partida: Partida;
}
