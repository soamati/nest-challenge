import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from 'src/projects/project.model';
import { Role } from 'src/roles/role.model';
import { ID } from 'src/types';

@ObjectType()
export class Developer {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Project])
  projects: ID[];

  @Field(() => [Role])
  roles: ID[];
}
