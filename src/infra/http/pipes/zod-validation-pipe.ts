
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z, ZodError, ZodSchema  } from "zod/v4";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {

        if(error instanceof ZodError) {
            console.error(error)
            throw new BadRequestException({
                error: 'Zod validation error.',
                message: z.prettifyError(error)
            })
        }
        console.error(error)
        throw new BadRequestException('Validation error.');
    }
  }
}
