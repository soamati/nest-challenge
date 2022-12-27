import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Role } from './role.model';

@InputType()
export class CreateRoleDto implements Partial<Role> {
  @IsNotEmpty()
  @Field()
  name: string;
}
