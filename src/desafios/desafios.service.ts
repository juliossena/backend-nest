import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModal: Model<Desafio>,
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

  async inserirDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const desafio = new this.desafioModal(criarDesafioDto);

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
