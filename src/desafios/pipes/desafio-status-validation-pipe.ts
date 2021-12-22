import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DesafioStatus } from '../enums/desafio-status.enum';

export class DesafioStatusValidationPipe implements PipeTransform {
  readonly statusPermitidos = [
    DesafioStatus.ACEITO,
    DesafioStatus.NEGADO,
    DesafioStatus.CANCELADO,
  ];

  private ehStatusValido(status: string): boolean {
    const statusEncontrado = this.statusPermitidos.find(
      (statusAtual) => statusAtual === status,
    );

    return !!statusEncontrado;
  }

  transform(value: any) {
    const { status } = value;
    if (typeof status !== 'string' || !this.ehStatusValido(status)) {
      throw new BadRequestException(`${status} é um status inválido`);
    }

    return value;
  }
}
