import { forwardRef, Module } from '@nestjs/common';
import { ProjectsModule } from 'src/projects/projects.module';
import { RolesModule } from 'src/roles/roles.module';
import { DeveloperResolver } from './developers.resolver';
import { DevelopersService } from './developers.service';

@Module({
  imports: [RolesModule, forwardRef(() => ProjectsModule)],
  providers: [DevelopersService, DeveloperResolver],
  exports: [DevelopersService],
})
export class DevelopersModule {}
