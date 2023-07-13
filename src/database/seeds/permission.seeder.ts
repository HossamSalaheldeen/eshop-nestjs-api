import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import PermissionsEnum from "../../permissions/permissions.enum";
import { Permission } from "../../permissions/entities/permission.entity";
import { getPermissionName } from "../../utils/helpers";
import { Role } from "../../roles/entities/role.entity";
import { User } from "../../users/entities/user.entity";

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await dataSource.synchronize(true);
    console.log("PermissionSeeder");
    // const tablesNames = dataSource.entityMetadatas.map(({tableMetadataArgs }) => tableMetadataArgs.name);
    const tablesNames = [
      dataSource.getRepository(Permission).metadata.tableName,
      dataSource.getRepository(Role).metadata.tableName,
      dataSource.getRepository(User).metadata.tableName
    ];
    console.log(tablesNames);

    const permissions = [
      PermissionsEnum.VIEW_ANY,
      PermissionsEnum.VIEW,
      PermissionsEnum.CREATE,
      PermissionsEnum.UPDATE,
      PermissionsEnum.DELETE
    ];


    const permissionRepository = dataSource.getRepository(Permission);

    for (let i = 0; i < tablesNames.length; i++) {
      for (let j = 0; j < permissions.length; j++) {
        await permissionRepository.save({ name: getPermissionName(permissions[j], tablesNames[i]) });
      }
    }
  }
}