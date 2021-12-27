import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './entities/jogador.entity';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectRepository(Jogador)
    private jogadorRepository: Repository<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    this.logger.log(`criaJogadorDto: ${criarJogadorDto}`);

    return this.jogadorRepository.save(criarJogadorDto);
  }

  async editarJogador(
    id: number,
    criarJogadorDto: CriarJogadorDTO,
  ): Promise<Jogador> {
    const jogador = await this.consultarJogador(id);

    this.jogadorRepository.update(jogador, criarJogadorDto);

    return { ...jogador, ...criarJogadorDto };
  }

  async inserirCategoriaJogador(
    idJogador: number,
    categoria: Categoria,
  ): Promise<void> {
    const jogador = await this.consultarJogador(idJogador);

    await this.jogadorRepository.update(jogador, {
      ...jogador,
      categoria: categoria,
    });
  }

  async buscarCategoriaPorJogador(idJogador: number): Promise<Categoria> {
    const jogador = await this.jogadorRepository.findOne({
      where: {
        id: idJogador,
      },
      relations: ['categoria'],
    });

    if (!jogador.categoria) {
      throw new BadRequestException('Jogador não possui categoria');
    }
    return jogador.categoria;
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadorRepository.find();
  }

  async consultarJogador(id: number): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorRepository.findOne({ id });
    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadorEncontrado;
  }

  async consultarJogadorEmail(email: string): Promise<Jogador[]> {
    const jogadorEncontrado = await this.jogadorRepository.find({ email });
    if (!jogadorEncontrado || jogadorEncontrado.length === 0) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadorEncontrado;
  }

  async consultarJogadoresId(ids: number[]): Promise<Jogador[]> {
    const jogadoresEncontrados = await this.jogadorRepository.findByIds(ids);
    if (!jogadoresEncontrados || jogadoresEncontrados.length === 0) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadoresEncontrados;
  }

  async deletarJogador(id: number): Promise<any> {
    const jogador = await this.consultarJogador(id);
    return this.jogadorRepository.delete(jogador);
  }
}
