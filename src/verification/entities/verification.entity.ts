import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Verification {
    @Prop()
    verificationCode: string;
}
