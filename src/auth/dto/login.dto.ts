import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginUser {
    @IsEmail()
    @IsString()
    email: string;

    @IsStrongPassword()
    @IsString()
    password: string;
}