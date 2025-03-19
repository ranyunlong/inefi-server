import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { R } from '../../interfaces/r';
import { PageInfo } from '../../interfaces/page-info';

export const ApiResponsePageResult = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(R),
        properties: {
          data: {
            $ref: getSchemaPath(PageInfo),
            properties: {
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      },
    }),
  );
};
