import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly caregoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return this.caregoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async buscarCategorias(): Promise<Categoria[]> {
    return this.caregoriasService.buscarCategorias();
  }

  @Get(':id')
  async buscarCategoriaId(@Param('id') id: string): Promise<Categoria> {
    return this.caregoriasService.buscarCategoriaId(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Param('id') id: string,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    return this.caregoriasService.atualizarCategoria(id, atualizarCategoriaDto);
  }

  @Post(':id/jogadores/:idJogador')
  async atribuirCategoriaJogador(
    @Param('id') id: string,
    @Param('idJogador') idJogador: string,
  ): Promise<void> {
    return this.caregoriasService.atribuirCategoriaJogador(id, idJogador);
  }
}
