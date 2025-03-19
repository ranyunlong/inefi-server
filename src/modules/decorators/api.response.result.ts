import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { R } from '../../interfaces/r';

function eq(t1: any, t2: any) {
  return t1 === t2;
}

export const ApiResponseResult = <TModel extends Type<any>>(model: TModel) => {
  if (eq(model, String)) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          $ref: getSchemaPath(R),
          properties: { data: { type: 'string' } },
        },
      }),
    );
  }

  if (eq(model, Number)) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          $ref: getSchemaPath(R),
          properties: { data: { type: 'number' } },
        },
      }),
    );
  }

  if (eq(model, Boolean)) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          $ref: getSchemaPath(R),
          properties: { data: { type: 'boolean' } },
        },
      }),
    );
  }

  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(R),
        properties: { data: { $ref: getSchemaPath(model) } },
      },
    }),
  );
};
