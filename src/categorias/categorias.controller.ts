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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
@ApiTags('categorias')
export class CategoriasController {
  constructor(private readonly caregoriasService: CategoriasService) {}

  @Post()
  @ApiBody({ type: CriarCategoriaDto })
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
  async buscarCategoriaId(@Param('id') id: number): Promise<Categoria> {
    return this.caregoriasService.buscarCategoriaId(id);
  }

  @Put(':id')
  @ApiBody({ type: AtualizarCategoriaDto })
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Param('id') id: number,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    return this.caregoriasService.atualizarCategoria(id, atualizarCategoriaDto);
  }

  @Post(':id/jogadores/:idJogador')
  async atribuirCategoriaJogador(
    @Param('id') id: number,
    @Param('idJogador') idJogador: number,
  ): Promise<void> {
    return this.caregoriasService.atribuirCategoriaJogador(id, idJogador);
  }
}
