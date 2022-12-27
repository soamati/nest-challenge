import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleDto } from './dto';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => [Role])
  roles() {
    return this.rolesService.find();
  }

  @Mutation(() => Role)
  createRole(
    @Args('createRoleData', { type: () => CreateRoleDto })
    { name }: CreateRoleDto,
  ) {
    return this.rolesService.create(name);
  }
}
