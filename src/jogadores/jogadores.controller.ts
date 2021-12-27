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
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros-pipe';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Jogador } from './entities/jogador.entity';

@Controller('jogadores')
@ApiTags('jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CriarJogadorDTO })
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDTO,
  ): Promise<Jogador> {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email', ValidacaoParametrosPipe) email?: string,
  ): Promise<Jogador[]> {
    if (email) {
      return this.jogadoresService.consultarJogadorEmail(email);
    }
    return this.jogadoresService.consultarJogadores();
  }

  @Get(':id')
  async consultarJogador(@Param('id') id: number): Promise<Jogador> {
    return this.jogadoresService.consultarJogador(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: CriarJogadorDTO })
  async editarJogador(
    @Body() criarJogadorDto: CriarJogadorDTO,
    @Param('id') id: number,
  ): Promise<Jogador> {
    return this.jogadoresService.editarJogador(id, criarJogadorDto);
  }

  @Delete(':id')
  async deletarJogador(@Param('id') id: number): Promise<void> {
    return this.jogadoresService.deletarJogador(id);
  }
}
