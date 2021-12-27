import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Partida } from './partida.entity';

@Entity('resultado')
export class Resultado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  set!: string;

  @ManyToOne(() => Partida, (partida) => partida.resultados)
  partida!: Partida;
}
