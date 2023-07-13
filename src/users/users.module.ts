import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UserSubscriber } from "./user.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService]
})
export class UsersModule {}
