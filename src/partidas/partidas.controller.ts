import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Partida } from './entities/partida.entity';
import { PartidasService } from './partidas.service';

@Controller('partidas')
@ApiTags('partidas')
export class PartidasController {
  constructor(private readonly partidaService: PartidasService) {}

  @Get()
  async visualizarTodasAsPartidas(): Promise<Partida[]> {
    return this.partidaService.visualizarTodasAsPartidas();
  }
}
