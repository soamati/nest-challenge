import { Field, ObjectType } from '@nestjs/graphql';
import { Developer } from 'src/developers/developer.model';
import { Role } from 'src/roles/role.model';
import { ID } from 'src/types';
import { Status } from './types';

@ObjectType()
export class Project {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Status)
  status: Status;

  @Field(() => [Developer])
  developers: ID[];

  @Field(() => [Role])
  roles: ID[];
}
