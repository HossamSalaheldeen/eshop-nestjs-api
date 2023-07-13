import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource, ILike } from "typeorm";
import PermissionsEnum from "../../permissions/permissions.enum";
import { Permission } from "../../permissions/entities/permission.entity";
import { Role } from "../../roles/entities/role.entity";
import RolesEnum from "../../roles/roles.enum";

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    console.log("RoleSeeder");


    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    await roleRepository.save({
      name: RolesEnum.ADMIN,
      permissions: await permissionRepository.find({})
    });

    await roleRepository.save({
      name: RolesEnum.USER,
      permissions: await permissionRepository.find({
        where: [
          { name: ILike(`%${PermissionsEnum.VIEW_ANY}%`) },
          { name: ILike(`%${PermissionsEnum.VIEW}%`) },
        ]
      })
    });
  }
}