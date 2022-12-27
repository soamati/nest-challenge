import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role {
  @Field()
  id: number;

  @Field()
  name: string;
}
