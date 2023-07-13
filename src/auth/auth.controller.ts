import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { User } from "../users/entities/user.entity";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get("current-user")
  getCurrentUser(@Request() req) {
    return req.user;
  }

}
