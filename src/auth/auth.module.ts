import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      signOptions: { expiresIn: "24h" }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
  exports: [AuthService],
})
export class AuthModule {
}
