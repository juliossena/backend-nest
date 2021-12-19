import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException('Categoria encontrada');
    }

    return new this.categoriaModel(criarCategoriaDto).save();
  }

  async buscarCategorias(): Promise<Categoria[]> {
    return this.categoriaModel.find().populate('jogadores').exec();
  }

  async buscarCategoriasPorJogador(idJogador: string): Promise<Categoria[]> {
    const categorias = await this.categoriaModel
      .find({ jogadores: idJogador })
      .populate('jogadores')
      .exec();

    if (!categorias || categorias.length === 0) {
      throw new BadRequestException('Jogador não possui categoria');
    }
    return categorias;
  }

  async buscarCategoriaId(_id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel
      .findOne({ _id })
      .populate('jogadores')
      .exec();
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return categoria;
  }

  async atualizarCategoria(
    _id: string,
    atualizarCategoria: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    await this.buscarCategoriaId(_id);

    return this.categoriaModel
      .findOneAndUpdate({ _id }, atualizarCategoria)
      .exec();
  }

  async atribuirCategoriaJogador(
    idCategoria: string,
    idJogador: string,
  ): Promise<void> {
    const categoria = await this.buscarCategoriaId(idCategoria);
    const jogador = await this.jogadoresService.consultarJogador(idJogador);

    const jogadorCadastrado = categoria.jogadores.find(
      (jogadorAtual) => jogadorAtual.id === jogador.id,
    );

    if (jogadorCadastrado) {
      throw new BadRequestException('Jogador já cadastrado na categoria');
    }
    categoria.jogadores.push(jogador);

    await this.categoriaModel.findOneAndUpdate({ _id: idCategoria }, categoria);
  }
}
