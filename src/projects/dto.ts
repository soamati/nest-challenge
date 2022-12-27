import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ID } from 'src/types';
import { Project } from './project.model';
import { Status } from './types';

@InputType()
export class CreateProjectDto implements Partial<Project> {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsEnum(Status)
  @Field(() => Status, { defaultValue: Status.Backlog })
  status: Status;

  @IsOptional()
  @IsInt({ each: true, message: 'each value in roles must be a valid ID' })
  @Field(() => [Number], { defaultValue: [] })
  roles: ID[];
}

@InputType()
export class AddDevToProjectDto {
  @IsInt({ message: 'must be a valid ID' })
  @Field()
  projectId: number;

  @IsInt({ message: 'must be a valid ID' })
  @Field()
  devId: number;
}
