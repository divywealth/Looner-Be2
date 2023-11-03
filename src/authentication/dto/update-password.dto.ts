import { IsNotEmpty } from "class-validator"

export class UpdatePassworDto {
    @IsNotEmpty()
    currentpassword: string

    @IsNotEmpty()
    newpassword: string
}