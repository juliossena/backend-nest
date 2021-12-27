import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Desafio } from 'src/desafios/entities/desafio.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jogador')
export class Jogador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  telefoneCelular!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  ranking?: string;

  @Column({ nullable: true })
  posicaoRanking?: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.jogadores)
  categoria?: Categoria;

  @OneToMany(() => Desafio, (desafio) => desafio.solicitante)
  desafios?: Desafio[];

  @ManyToMany(() => Partida, (partida) => partida.jogadores)
  jogadoresPartida?: Jogador[];

  @ManyToMany(() => Partida, (partida) => partida.def)
  defPartida?: Jogador[];

  constructor(id: number) {
    this.id = id;
  }
}
