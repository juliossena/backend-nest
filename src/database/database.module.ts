import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Evento } from 'src/categorias/entities/evento.entity';
import { Desafio } from 'src/desafios/entities/desafio.entity';
import { Jogador } from 'src/jogadores/entities/jogador.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Resultado } from 'src/partidas/entities/resultado.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-235-159-30.compute-1.amazonaws.com',
      username: 'jhekpxlmobqadd',
      password:
        'a843dd65d94dde5b60c388179f86337d59fca8f62a5c76d48b327c8bcc695a00',
      database: 'd5jdvu02b277ql',
      extra: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      synchronize: true,
      entities: [Categoria, Evento, Jogador, Desafio, Partida, Resultado],
    }),
  ],
})
export class DatabaseModule {}
