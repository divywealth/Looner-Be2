import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    phoneNo: string;

    @IsNotEmpty()
    username: string;

    file: Express.Multer.File;

    @IsNotEmpty()
    dob: string;

    @MinLength(6)
    @IsNotEmpty()
    password: string;
}
