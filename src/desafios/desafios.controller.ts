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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros-pipe';
import { DesafiosService } from './desafios.service';
import { AtribuirDesafioDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafioStatusValidationPipe } from './pipes/desafio-status-validation-pipe';

@Controller('desafios')
@ApiTags('desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Get()
  async buscarDesafios(
    @Query('idJogador', ValidacaoParametrosPipe) idJogador?: string,
  ): Promise<Desafio[]> {
    if (idJogador) {
      return this.desafiosService.buscarDesafiosIdJogador(idJogador);
    }
    return this.desafiosService.buscarDesafios();
  }

  @Get(':id')
  async buscarDesafioId(@Param('id') id: string): Promise<Desafio> {
    return this.desafiosService.buscarDesafioId(id);
  }

  @Post()
  @ApiBody({ type: CriarDesafioDto })
  @UsePipes(ValidationPipe)
  async inserirDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    return this.desafiosService.inserirDesafio(criarDesafioDto);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarDesafioDto })
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Param('id') id: string,
    @Body(DesafioStatusValidationPipe) atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<Desafio> {
    return this.desafiosService.atualizarDesafio(id, atualizarDesafioDto);
  }

  @Delete(':id')
  async deletarDesafio(@Param('id') id: string): Promise<Desafio> {
    return this.desafiosService.deletarDesafio(id);
  }

  @Post(':id/partida')
  @ApiBody({ type: AtribuirDesafioDto })
  @UsePipes(ValidationPipe)
  async atribuirDesafioPartida(
    @Param('id') id: string,
    @Body() atribuirDesafioDto: AtribuirDesafioDto,
  ): Promise<void> {
    await this.desafiosService.atribuirDesafioPartida(id, atribuirDesafioDto);
  }
}
