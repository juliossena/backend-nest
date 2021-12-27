import { Desafio } from 'src/desafios/entities/desafio.entity';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from './evento.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoria!: string;

  @Column()
  descricao!: string;

  @OneToMany(() => Evento, (evento) => evento.categoria)
  eventos!: Evento[];

  @OneToMany(() => Jogador, (jogador) => jogador.categoria)
  jogadores?: Jogador[];

  @OneToMany(() => Desafio, (desafio) => desafio.categoria)
  desafios?: Desafio[];
}
