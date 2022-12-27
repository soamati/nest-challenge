import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { Developer } from './developer.model';
import { CreateDeveloperDto } from './dto';

@Injectable()
export class DevelopersService {
  private developers: Developer[];

  constructor() {
    this.developers = db.developers;
  }

  find() {
    return this.developers;
  }

  findById(id: number) {
    return this.developers.find((dev) => dev.id === id);
  }

  findByProjectId(projectId: number) {
    return this.developers.filter((dev) => dev.projects.includes(projectId));
  }

  create(developerData: CreateDeveloperDto) {
    const { name, email, roles } = developerData;

    const developer = new Developer();
    developer.id = this.developers.length + 1;

    developer.name = name;
    developer.email = email;
    developer.roles = roles;
    developer.projects = [];

    this.developers.push(developer);

    return developer;
  }

  updateDeveloper(dev: Developer) {
    this.developers = [
      ...this.developers.filter(({ id }) => id !== dev.id),
      dev,
    ];
  }
}
