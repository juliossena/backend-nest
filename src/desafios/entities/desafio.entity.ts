import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DesafioStatus } from '../enums/desafio-status.enum';

@Entity('desafio')
export class Desafio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dataHoraDesafio!: Date;

  @Column('varchar', { default: DesafioStatus.PENDENTE, nullable: false })
  status!: DesafioStatus;

  @Column()
  dataHoraSolicitacao!: Date;

  @Column({ nullable: true })
  dataHoraResposta?: Date;

  @ManyToOne(() => Jogador, (jogador) => jogador.desafios)
  solicitante?: Jogador;

  @ManyToOne(() => Categoria, (categoria) => categoria.desafios)
  categoria?: Categoria;

  @ManyToMany(() => Jogador)
  @JoinTable()
  jogadores?: Jogador[];

  @OneToOne(() => Partida, (categoria) => categoria.categoria)
  partida?: Partida;
}
