import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, RoleResolver],
  exports: [RolesService],
})
export class RolesModule {}
