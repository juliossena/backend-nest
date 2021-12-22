import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarPartidaDto } from './dtos/criar-partida.dto';
import { Partida } from './interfaces/partida.interface';

@Injectable()
export class PartidasService {
  constructor(@InjectModel('Partida') readonly partidaModel: Model<Partida>) {}

  async visualizarTodasAsPartidas(): Promise<Partida[]> {
    return this.partidaModel.find().exec();
  }

  async consultarPartidaId(_id): Promise<Partida> {
    const partida = this.partidaModel.findOne({ _id });

    if (!partida) {
      throw new NotFoundException('Partida não encontrada');
    }

    return partida;
  }

  async criarPartida(criarPartidaDto: CriarPartidaDto): Promise<Partida> {
    const partida = new this.partidaModel(criarPartidaDto);

    return partida.save();
  }

  async excluirPartida(_id: string): Promise<void> {
    await this.consultarPartidaId(_id);
    await this.partidaModel.deleteOne({ _id }).exec();
  }
}
