import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { R } from '../../interfaces/r';

export const ApiResponseListResult = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(R),
        properties: {
          data: {
            items: { $ref: getSchemaPath(model) },
            type: 'array',
          },
        },
      },
    }),
  );
};
