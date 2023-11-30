import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async all() {
    return this.roleService.all();
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') permission_ids: number[],
  ) {
    return this.roleService.create({
      name,
      permissions: permission_ids.map((id) => ({ id })),
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.roleService.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') permission_ids: number[],
  ) {
    await this.roleService.update(id, { name });

    const role = await this.roleService.findOne({ where: { id } });

    return this.roleService.create({
      ...role,
      permissions: permission_ids.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
