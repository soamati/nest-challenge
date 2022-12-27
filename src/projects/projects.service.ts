import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { CreateProjectDto } from './dto';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  private projects: Project[];

  constructor() {
    this.projects = db.projects;
  }

  create(projectData: CreateProjectDto) {
    const { name, description, roles, status } = projectData;

    const project = new Project();
    project.id = this.projects.length + 1;

    project.name = name;
    project.description = description;
    project.roles = roles;
    project.status = status;
    project.developers = [];

    this.projects.push(project);

    return project;
  }

  find() {
    return this.projects;
  }

  findById(id: number) {
    return this.projects.find((project) => project.id === id);
  }

  findByIds(ids: number[]) {
    return this.projects.filter((project) => ids.includes(project.id));
  }

  updateProject(project: Project) {
    this.projects = [
      ...this.projects.filter(({ id }) => id !== project.id),
      project,
    ];
  }
}
