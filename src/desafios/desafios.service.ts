import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriasService } from 'src/categorias/categorias.service';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarPartidaDto } from 'src/partidas/dtos/criar-partida.dto';
import { PartidasService } from 'src/partidas/partidas.service';
import { Repository } from 'typeorm';
import { AtribuirDesafioDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './entities/desafio.entity';
import { DesafioStatus } from './enums/desafio-status.enum';

const QUANTIDADE_DE_JOGADORES_DESAFIO = 2;

@Injectable()
export class DesafiosService {
  constructor(
    @InjectRepository(Desafio) private desafioRepository: Repository<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
    private readonly partidasService: PartidasService,
  ) {}

  private async verificarExisteJogadores(
    jogadores: Jogador[],
  ): Promise<Jogador[]> {
    const jogadoresResultado = await this.jogadoresService.consultarJogadoresId(
      jogadores.map((jogador) => jogador.id),
    );

    if (
      !jogadoresResultado ||
      jogadoresResultado.length !== QUANTIDADE_DE_JOGADORES_DESAFIO
    ) {
      throw new BadRequestException(
        'Não foi localizado todos os jogadores do desafio',
      );
    }

    return jogadoresResultado;
  }

  private verificarJogadorNaLista(jogadores: number[], solicitante: number) {
    const jogadorNaLista = jogadores.find((jogador) => jogador === solicitante);

    if (!jogadorNaLista) {
      throw new BadRequestException('Jogador não está na lista');
    }
  }

  async buscarDesafios(): Promise<Desafio[]> {
    return this.desafioRepository.find();
  }

  async buscarDesafiosIdJogador(idJogador: number): Promise<Desafio[]> {
    const jogador = new Jogador(idJogador);
    return this.desafioRepository.find({ jogadores: [jogador] });
  }

  async buscarDesafioId(id: number): Promise<Desafio> {
    const desafio = await this.desafioRepository.findOne({
      relations: ['solicitante', 'jogadores', 'partida'],
      where: { id },
    });

    if (!desafio) {
      throw new NotFoundException('Desafio inexistente');
    }

    return desafio;
  }

  async inserirDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafioDto;

    this.verificarJogadorNaLista(
      jogadores.map((jogador) => jogador.id),
      solicitante.id,
    );

    await this.verificarExisteJogadores(jogadores);
    const categoria = await this.jogadoresService.buscarCategoriaPorJogador(
      solicitante.id,
    );

    return this.desafioRepository.save({
      ...criarDesafioDto,
      categoria,
      status: DesafioStatus.PENDENTE,
      dataHoraSolicitacao: new Date(),
    });
  }

  async deletarDesafio(id: number): Promise<Desafio> {
    const desafio = await this.buscarDesafioId(id);

    const newDesafio = {
      ...desafio,
      status: DesafioStatus.CANCELADO,
    };

    await this.desafioRepository.update({ id }, newDesafio);

    return newDesafio;
  }

  async atualizarDesafio(
    id: number,
    atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<Desafio> {
    const desafio = await this.buscarDesafioId(id);

    const newDesafio = { ...desafio, atualizarDesafioDto };

    await this.desafioRepository.update({ id }, newDesafio);

    return newDesafio;
  }

  async atribuirDesafioPartida(
    id: number,
    atribuirDesafioDto: AtribuirDesafioDto,
  ): Promise<void> {
    const desafio = await this.buscarDesafioId(id);
    this.verificarJogadorNaLista(
      desafio.jogadores.map((jogador) => jogador.id),
      atribuirDesafioDto.def.id,
    );

    const criarPartidaDto = new CriarPartidaDto(
      desafio.categoria,
      desafio.jogadores,
      atribuirDesafioDto,
    );

    const partida = await this.partidasService.criarPartida(criarPartidaDto);

    await this.desafioRepository
      .update(
        { id },
        {
          ...desafio,
          status: DesafioStatus.REALIZADO,
          partida,
        },
      )
      .catch(async () => {
        await this.partidasService.excluirPartida(partida.id);
        throw new InternalServerErrorException();
      });
  }
}
