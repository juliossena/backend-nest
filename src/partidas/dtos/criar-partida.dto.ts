import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoriaDTO } from 'src/categorias/dtos/categoria.dto';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { AtribuirDesafioDto } from 'src/desafios/dtos/atribuir-desafio-partida.dto';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { Resultado } from '../../partidas/interfaces/resultado.interface';

export class CriarPartidaDto {
  @IsNotEmpty()
  @ApiProperty({ type: CategoriaDTO })
  categoria: CategoriaDTO;

  @IsNotEmpty()
  @ApiProperty({ type: [JogadorDTO] })
  jogadores: JogadorDTO[];

  @IsNotEmpty()
  @ApiProperty({ type: JogadorDTO })
  def: JogadorDTO;

  @ApiProperty({ type: String })
  resultado: Resultado[];

  constructor(
    categoria: Categoria,
    jogadores: Jogador[],
    atribuirDesafioDto: AtribuirDesafioDto,
  ) {
    this.categoria = { id: categoria.id };
    this.jogadores = jogadores.map((jogador) => ({ id: jogador.id }));
    this.def = atribuirDesafioDto.def;
    this.resultado = atribuirDesafioDto.resultado;
  }
}
