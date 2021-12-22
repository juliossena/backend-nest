import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarPartidaDto } from 'src/partidas/dtos/criar-partida.dto';
import { PartidasService } from 'src/partidas/partidas.service';
import { AtribuirDesafioDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './enums/desafio-status.enum';
import { Desafio } from './interfaces/desafio.interface';

const QUANTIDADE_DE_JOGADORES_DESAFIO = 2;

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModal: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
    private readonly partidasService: PartidasService,
  ) {}

  private async verificarExisteJogadores(
    jogadores: JogadorDTO[],
  ): Promise<void> {
    const jogadoresResultado = await this.jogadoresService.consultarJogadoresId(
      jogadores.map((jogador) => jogador._id),
    );

    if (
      !jogadoresResultado ||
      jogadoresResultado.length !== QUANTIDADE_DE_JOGADORES_DESAFIO
    ) {
      throw new BadRequestException(
        'Não foi localizado todos os jogadores do desafio',
      );
    }
  }

  private verificarJogadorNaLista(jogadores: string[], solicitante: string) {
    const jogadorNaLista = jogadores.find((jogador) => jogador === solicitante);

    if (!jogadorNaLista) {
      throw new BadRequestException('Jogador não está na lista');
    }
  }

  async buscarDesafios(): Promise<Desafio[]> {
    return this.desafioModal.find().exec();
  }

  async buscarDesafiosIdJogador(idJogador: string): Promise<Desafio[]> {
    return this.desafioModal.find({ jogadores: idJogador }).exec();
  }

  async buscarDesafioId(_id: string): Promise<Desafio> {
    const desafio = await this.desafioModal
      .findOne({ _id })
      .populate('solicitante')
      .populate('jogadores')
      .populate('partida')
      .exec();

    if (!desafio) {
      throw new NotFoundException('Desafio inexistente');
    }

    return desafio;
  }

  async inserirDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafioDto;

    this.verificarJogadorNaLista(
      jogadores.map((jogador) => jogador._id),
      solicitante,
    );
    await this.verificarExisteJogadores(jogadores);
    const categorias = await this.categoriasService.buscarCategoriasPorJogador(
      solicitante,
    );

    if (categorias.length === 0) {
      throw new BadRequestException('Usuário não possui categorias');
    }

    const desafio = new this.desafioModal({
      ...criarDesafioDto,
      status: DesafioStatus.PENDENTE,
      dataHoraSolicitacao: new Date(),
      categoria: categorias[0]._id,
    });
    return desafio.save();
  }

  async deletarDesafio(_id: string): Promise<Desafio> {
    const desafio = await this.buscarDesafioId(_id);

    return this.desafioModal
      .findOneAndUpdate(
        { _id },
        {
          ...desafio.toObject(),
          status: DesafioStatus.CANCELADO,
        },
      )
      .exec();
  }

  async atualizarDesafio(
    _id: string,
    atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<Desafio> {
    const desafio = await this.buscarDesafioId(_id);

    return this.desafioModal
      .findOneAndUpdate({ _id }, { ...desafio.toObject(), atualizarDesafioDto })
      .exec();
  }

  async atribuirDesafioPartida(
    _id: string,
    atribuirDesafioDto: AtribuirDesafioDto,
  ): Promise<void> {
    const desafio = await this.buscarDesafioId(_id);
    this.verificarJogadorNaLista(
      desafio.jogadores.map((jogador) => jogador.id),
      atribuirDesafioDto.def._id,
    );

    const criarPartidaDto = new CriarPartidaDto(
      desafio.categoria,
      desafio.jogadores,
      atribuirDesafioDto,
    );

    const partida = await this.partidasService.criarPartida(criarPartidaDto);

    await this.desafioModal
      .findOneAndUpdate(
        { _id },
        {
          ...desafio.toObject(),
          status: DesafioStatus.REALIZADO,
          partida,
        },
      )
      .exec()
      .catch(async () => {
        await this.partidasService.excluirPartida(partida._id);
        throw new InternalServerErrorException();
      });
  }
}
