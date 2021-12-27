import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity('evento')
export class Evento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  operacao!: string;

  @Column()
  valor!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.eventos)
  categoria?: Categoria;
}
