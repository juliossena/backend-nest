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
    _id: string,
    criarJogadorDto: CriarJogadorDTO,
  ): Promise<Jogador> {
    await this.consultarJogador(_id);

    return this.jogadorModel.findOneAndUpdate({ _id }, criarJogadorDto).exec();
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  async consultarJogador(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadorEncontrado;
  }

  async consultarJogadorEmail(email: string): Promise<Jogador[]> {
    const jogadorEncontrado = await this.jogadorModel.find({ email }).exec();
    if (!jogadorEncontrado || jogadorEncontrado.length === 0) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    await this.consultarJogador(_id);
    return this.jogadorModel.deleteOne({ _id }).exec();
  }
}
