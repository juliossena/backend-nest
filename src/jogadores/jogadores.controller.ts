import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros-pipe';

@Controller('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDTO,
  ): Promise<Jogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', ValidacaoParametrosPipe) email: string,
  ): Promise<Jogador[]> {
    if (email) {
      return this.jogadoresService.consultarJogadorEmail(email);
    }
    return this.jogadoresService.consultarJogadores();
  }

  @Get(':id')
  async consultarJogador(@Param('id') id: string): Promise<Jogador> {
    return this.jogadoresService.consultarJogador(id);
  }

  @Put(':id')
  async editarJogador(
    @Body() criarJogadorDto: CriarJogadorDTO,
    @Param('id') id: string,
  ): Promise<Jogador> {
    return this.jogadoresService.editarJogador(id, criarJogadorDto);
  }

  @Delete(':id')
  async deletarJogador(@Param('id') id: string): Promise<void> {
    return this.jogadoresService.deletarJogador(id);
  }
}
