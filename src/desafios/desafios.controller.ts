import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('desafios')
@ApiTags('desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Get()
  async buscarDesafios(): Promise<Desafio[]> {
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
  @ApiBody({ type: CriarDesafioDto })
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Param('id') id: string,
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    return this.desafiosService.atualizarDesafio(id, criarDesafioDto);
  }

  @Delete(':id')
  async deletarDesafio(@Param('id') id: string): Promise<void> {
    this.desafiosService.deletarDesafio(id);
  }
}
