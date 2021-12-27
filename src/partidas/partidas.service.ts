import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarPartidaDto } from './dtos/criar-partida.dto';
import { Partida } from './entities/partida.entity';

@Injectable()
export class PartidasService {
  constructor(
    @InjectRepository(Partida) private partidaRepository: Repository<Partida>,
  ) {}

  async visualizarTodasAsPartidas(): Promise<Partida[]> {
    return this.partidaRepository.find();
  }

  async consultarPartidaId(id: number): Promise<Partida> {
    const partida = await this.partidaRepository.findOne({ id });

    if (!partida) {
      throw new NotFoundException('Partida não encontrada');
    }

    return partida;
  }

  async criarPartida(criarPartidaDto: CriarPartidaDto): Promise<Partida> {
    return this.partidaRepository.save(criarPartidaDto);
  }

  async excluirPartida(id: number): Promise<void> {
    await this.consultarPartidaId(id);
    await this.partidaRepository.delete({ id });
  }
}
