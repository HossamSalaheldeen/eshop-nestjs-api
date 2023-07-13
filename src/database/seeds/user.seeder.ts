import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Role } from "../../roles/entities/role.entity";
import RolesEnum from "../../roles/roles.enum";

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    console.log("UserSeeder");

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    await userRepository.save({
      name: "admin",
      email: "admin@admin.com",
      password: "123456",
      role: await roleRepository.findOneBy({ name: RolesEnum.ADMIN })
    });
    await userRepository.save({
      name: "user",
      email: "user@user.com",
      password: "123456",
      role: await roleRepository.findOneBy({ name: RolesEnum.USER })
    });
  }
}