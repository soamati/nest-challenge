import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  private roles: Role[];

  constructor() {
    this.roles = db.roles;
  }

  create(name: string) {
    const role = new Role();
    role.id = this.roles.length + 1;
    role.name = name.trim();
    this.roles.push(role);

    return role;
  }

  find() {
    return this.roles;
  }

  findByIds(ids: number[]) {
    return this.roles.filter((role) => ids.includes(role.id));
  }

  findByName(name: string) {
    return this.roles.find((role) => role.name === name);
  }
}
