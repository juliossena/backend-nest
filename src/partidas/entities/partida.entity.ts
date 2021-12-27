import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Desafio } from 'src/desafios/entities/desafio.entity';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resultado } from './resultado.entity';

@Entity('partida')
export class Partida {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Desafio, (desafio) => desafio.partida)
  desafio?: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.jogadores)
  categoria?: Categoria;

  @ManyToMany(() => Jogador, (jogador) => jogador.jogadoresPartida)
  jogadores?: Jogador[];

  @ManyToOne(() => Jogador, (jogador) => jogador.defPartida)
  def!: Jogador;

  @OneToMany(() => Resultado, (resultado) => resultado.partida)
  resultados!: Resultado[];
}
