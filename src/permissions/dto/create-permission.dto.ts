import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name:string
}
