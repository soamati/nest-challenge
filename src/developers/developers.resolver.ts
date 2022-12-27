import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { isDefined } from 'class-validator';
import { ProjectsService } from 'src/projects/projects.service';
import { RolesService } from 'src/roles/roles.service';
import { Developer } from './developer.model';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto';

@Resolver(() => Developer)
export class DeveloperResolver {
  constructor(
    private developersService: DevelopersService,
    private rolesService: RolesService,
    private projectsService: ProjectsService,
  ) {}

  @Query(() => [Developer])
  developers(
    @Args('roleName', { nullable: true }) roleName: string,
    @Args('projectId', { nullable: true }) projectId: number,
  ) {
    let developers = this.developersService.find();

    if (isDefined(roleName)) {
      const role = this.rolesService.findByName(roleName);
      developers = role
        ? developers.filter((developer) => developer.roles.includes(role.id))
        : [];
    }

    if (isDefined(projectId)) {
      developers = developers.filter((developer) =>
        developer.projects.includes(projectId),
      );
    }

    return developers;
  }

  @Mutation(() => Developer)
  createDeveloper(@Args('createDeveloperData') data: CreateDeveloperDto) {
    return this.developersService.create(data);
  }

  @ResolveField()
  roles(developer: Developer) {
    return this.rolesService.findByIds(developer.roles);
  }

  @ResolveField()
  projects(developer: Developer) {
    return this.projectsService.findByIds(developer.projects);
  }
}
