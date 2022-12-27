import { forwardRef, Module } from '@nestjs/common';
import { DevelopersModule } from 'src/developers/developers.module';
import { RolesModule } from 'src/roles/roles.module';
import { ProjectResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [forwardRef(() => DevelopersModule), RolesModule],
  providers: [ProjectsService, ProjectResolver],
  exports: [ProjectsService],
})
export class ProjectsModule {}
