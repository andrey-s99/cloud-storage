import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { validateHeaderValue } from "http";

export class UserDto {
    @IsNotEmpty()
    @Transform(({ value })=> value.toLowerCase())
    username: string;

    @IsNotEmpty()
    password: string;
}