import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
