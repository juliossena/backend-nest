import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    this.logger.log(`criaJogadorDto: ${criarJogadorDto}`);

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return jogadorCriado.save();
  }

  async editarJogador(
    id: string,
    criarJogadorDto: CriarJogadorDTO,
  ): Promise<Jogador> {
    return this.jogadorModel.findOneAndUpdate({ id }, criarJogadorDto).exec();
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  async consultarJogadorEmail(email: string): Promise<Jogador[]> {
    const jogadorEncontrado = await this.jogadorModel.find({ email }).exec();
    if (!jogadorEncontrado || jogadorEncontrado.length === 0) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadorEncontrado;
  }

  async deletarJogador(id: string): Promise<void> {
    const jogador = await this.jogadorModel.find({ id }).exec();
    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado');
    }
    return this.jogadorModel.remove({ id }).exec();
  }
}
