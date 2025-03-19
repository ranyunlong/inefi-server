import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { OpenAIPageInfo } from '../../interfaces/open-ai.page.info';
import { R } from '../../interfaces/r';

export const ApiResponseOpenaiListResult = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(R),
        properties: {
          data: {
            $ref: getSchemaPath(OpenAIPageInfo),
            properties: {
              data: {
                items: {
                  $ref: getSchemaPath(model),
                },
                type: 'array',
              },
            },
          },
        },
      },
    }),
  );
};
