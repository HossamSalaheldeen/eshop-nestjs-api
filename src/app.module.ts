import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { dataSourceOptions } from "./database/data-source";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource, DataSourceOptions } from "typeorm";
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    // TypeOrmModule.forRoot({
    //   ...dataSourceOptions,
    //   autoLoadEntities: true
    // }),
    PermissionsModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() {
    console.log("*******************************************************");
    console.log(dataSourceOptions);
  }
}
