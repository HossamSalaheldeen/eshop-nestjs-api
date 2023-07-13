import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DB_CONNECTION'),
      host: this.configService.getOrThrow('DB_HOST'),
      port: Number(this.configService.getOrThrow('DB_PORT')),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_DATABASE'),
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions;
  }
}