import { IsNotEmpty } from "class-validator";

export class CreateVerificationDto {
    userId: string
    
    @IsNotEmpty()
    verificationcode: string
}
