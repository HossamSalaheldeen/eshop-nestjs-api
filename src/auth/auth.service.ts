import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {

  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const isUserExists = !!(await this.usersService.findOne({
      where: {
        email: signUpDto.email
      }
    }));
    if (isUserExists) {
      throw new BadRequestException("User already exists");
    }
    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user: User = await this.usersService.findOne({ where: { email } });
    if (user) {
      if (!(await user.checkPassword(password))) {
        throw new UnauthorizedException(
          `Wrong password for user with email: ${email}`
        );
      }

      delete user.password;

      const payload = { sub: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        ...user
      };
    } else {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`
      );
    }
  }
}
