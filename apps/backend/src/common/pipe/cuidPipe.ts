// common/pipe/parse-cuid.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!/^c[a-z0-9]{24}$/.test(value)) {
      throw new BadRequestException({
        message: 'Invalid collection id',
        errorCode: 'INVALID_ID',
      });
    }
    return value;
  }
}