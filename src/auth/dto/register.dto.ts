import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterUser {
    @IsString()
    username: string;


    @IsEmail()
    @IsString()
    email: string;

    @IsStrongPassword()
    @IsString()
    password: string;
}