import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { isDefined } from 'class-validator';
import { DevelopersService } from 'src/developers/developers.service';
import { RolesService } from 'src/roles/roles.service';
import { AddDevToProjectDto, CreateProjectDto } from './dto';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { Status } from './types';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private projectsService: ProjectsService,
    private developersService: DevelopersService,
    private rolesService: RolesService,
  ) {}

  @Query(() => [Project])
  projects(
    @Args('roleName', { nullable: true }) roleName: string,
    @Args('status', { type: () => Status, nullable: true }) status: Status,
  ) {
    let projects = this.projectsService.find();

    if (isDefined(status)) {
      projects = projects.filter((project) => project.status === status);
    }

    if (isDefined(roleName)) {
      const role = this.rolesService.findByName(roleName);
      projects = role
        ? projects.filter((project) => project.roles.includes(role.id))
        : [];
    }

    return projects;
  }

  @Mutation(() => Project)
  createProject(@Args('createProjectData') projectData: CreateProjectDto) {
    return this.projectsService.create(projectData);
  }

  @Mutation(() => Project)
  addDevToProject(
    @Args('addDevToProjectData') { projectId, devId }: AddDevToProjectDto,
  ) {
    const project = this.projectsService.findById(projectId);
    if (!project) {
      throw new BadRequestException(
        `Project with ID ${projectId} does not exist`,
      );
    }

    const dev = this.developersService.findById(devId);
    if (!dev) {
      throw new BadRequestException(
        `Developer with ID ${devId} does not exist`,
      );
    }

    for (const roleId of project.roles) {
      if (!dev.roles.includes(roleId)) {
        throw new Error("Developer can't join to project (missing roles)");
      }
    }

    project.developers = [...project.developers, devId];
    dev.projects = [...dev.projects, projectId];

    this.projectsService.updateProject(project);
    this.developersService.updateDeveloper(dev);

    return project;
  }

  @ResolveField()
  developers(project: Project) {
    return this.developersService.findByProjectId(project.id);
  }

  @ResolveField()
  roles(project: Project) {
    return this.rolesService.findByIds(project.roles);
  }
}
