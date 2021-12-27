import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidasModule } from 'src/partidas/partidas.module';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { Desafio } from './entities/desafio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Desafio]),
    JogadoresModule,
    CategoriasModule,
    PartidasModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
  exports: [DesafiosService],
})
export class DesafiosModule {}
