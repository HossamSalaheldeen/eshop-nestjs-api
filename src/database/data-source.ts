import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';


config();
const configService = new ConfigService();
const dbType = configService.get('DB_CONNECTION') as "postgres";
export const dataSourceOptions: DataSourceOptions & SeederOptions= {
  type: dbType,
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD') as string,
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + "/../**/*.subscriber.{js,ts}"],
  synchronize: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}']
};

export const appDataSource = new DataSource(dataSourceOptions);


// export const dataSourceOptions: DataSourceOptions & SeederOptions = {
//   type: process.env.DB_CONNECTION as 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   name: process.env.DB_DATABASE,
//   synchronize: true,
//   logging: false,
//   migrations: ['src/database/migrations/**/*.ts', 'build/src/database/migration/**/*.js'],
//   seeds: ['src/database/seeds/**/*{.ts,.js}'],
//   factories: ['src/database/factories/**/*{.ts,.js}']
// };
//
// export const dataSource = new DataSource(dataSourceOptions);