import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { ID } from 'src/types';
import { Developer } from './developer.model';

@InputType()
export class CreateDeveloperDto implements Partial<Developer> {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsArray()
  @IsInt({ each: true, message: 'each value in roles must be a valid ID' })
  @Field(() => [Int])
  roles: ID[];
}
