import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // Validate and return the parsed data
      return this.schema.parse(value);
    } catch (error: any) {
      // Throw a 400 Bad Request if Zod validation fails
      throw new BadRequestException(error.errors || 'Validation failed');
    }
  }
}