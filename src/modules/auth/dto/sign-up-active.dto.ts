import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SignUpActiveDto {
  @Type()
  @IsNotEmpty()
  public type: 'phone' | 'email';

  @Type()
  @IsNotEmpty()
  public account: string;
}
