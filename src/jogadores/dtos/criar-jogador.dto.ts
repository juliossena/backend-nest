import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly telefoneCelular: string;

  @IsEmail()
  @ApiProperty({ type: String })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly nome: string;
}
