import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadorValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === '') {
      throw new BadRequestException(`${metadata.data} não pode ser vazio`);
    }

    return value;
  }
}
