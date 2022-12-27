/**
 * Do not modify this file
 * `db` object mocks a database with hardcoded relations
 */

import { Developer } from './developers/developer.model';
import { Project } from './projects/project.model';
import { Status } from './projects/types';
import { Role } from './roles/role.model';

const roles: Role[] = [
  { id: 1, name: 'backend' },
  { id: 2, name: 'frontend' },
];

const developers: Developer[] = [
  {
    id: 1,
    name: 'Matias Ruiz',
    email: 'matiruizsh@gmail.com',
    roles: [1],
    projects: [1],
  },
  {
    id: 2,
    name: 'Maurice Moss',
    email: 'moss@itcrowd.com',
    roles: [2],
    projects: [2],
  },
];

const projects: Project[] = [
  {
    id: 1,
    name: 'Main API',
    description: 'App API',
    status: Status.InProgress,
    developers: [1],
    roles: [1],
  },
  {
    id: 2,
    name: 'Landing Page',
    description: 'App landing page',
    status: Status.Backlog,
    developers: [2],
    roles: [2],
  },
];

export const db = {
  projects,
  developers,
  roles,
};
