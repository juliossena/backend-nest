import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { Repository } from 'typeorm';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaRepository.findOne({
      categoria,
    });

    if (categoriaEncontrada) {
      throw new BadRequestException('Categoria encontrada');
    }

    return this.categoriaRepository.save(criarCategoriaDto);
  }

  async buscarCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: ['jogadores'],
    });
  }

  async buscarCategoriaId(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      relations: ['jogadores'],
      where: {
        id,
      },
    });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return categoria;
  }

  async atualizarCategoria(
    id: number,
    atualizarCategoria: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.buscarCategoriaId(id);

    await this.categoriaRepository.update(categoria, atualizarCategoria);

    return {
      ...categoria,
    };
  }

  async atribuirCategoriaJogador(
    idCategoria: number,
    idJogador: number,
  ): Promise<void> {
    const categoria = await this.buscarCategoriaId(idCategoria);
    const jogador = await this.jogadoresService.consultarJogador(idJogador);

    const jogadorCadastrado = categoria.jogadores.find(
      (jogadorAtual) => jogadorAtual.id === jogador.id,
    );

    if (jogadorCadastrado) {
      throw new BadRequestException('Jogador já cadastrado na categoria');
    }

    await this.jogadoresService.inserirCategoriaJogador(jogador.id, categoria);
  }
}
