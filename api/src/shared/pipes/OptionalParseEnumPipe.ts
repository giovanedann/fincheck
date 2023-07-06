import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (value) {
      return super.transform(value, metadata);
    }

    return undefined;
  }
}
