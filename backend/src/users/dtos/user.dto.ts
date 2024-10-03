import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @Transform(({ value })=> value.toLowerCase())
    username: string;

    @IsNotEmpty()
    password: string;
}