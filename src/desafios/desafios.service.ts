import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadorDTO } from 'src/jogadores/dtos/jogador.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
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
  ) {}

  async buscarDesafios(): Promise<Desafio[]> {
    return this.desafioModal.find().exec();
  }

  async buscarDesafioId(_id: string): Promise<Desafio> {
    const desafio = this.desafioModal.findOne({ _id }).exec();

    if (!desafio) {
      throw new NotFoundException('Desafio inexistente');
    }

    return desafio;
  }

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

  private verificarSolicitanteJogador(
    jogadores: JogadorDTO[],
    solicitante: string,
  ) {
    const desafianteNaLista = jogadores.find(
      (jogador) => jogador._id === solicitante,
    );

    if (!desafianteNaLista) {
      throw new BadRequestException('Desafiante não está na lista jogadores');
    }
  }

  async inserirDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafioDto;

    this.verificarSolicitanteJogador(jogadores, solicitante);
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

  async deletarDesafio(_id: string): Promise<any> {
    await this.buscarDesafioId(_id);

    return this.desafioModal.deleteOne({ _id }).exec();
  }

  async atualizarDesafio(
    _id: string,
    criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    await this.buscarDesafioId(_id);

    return this.desafioModal.findOneAndUpdate({ _id }, criarDesafioDto).exec();
  }
}
