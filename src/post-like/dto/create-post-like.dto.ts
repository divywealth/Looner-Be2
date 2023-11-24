import { IsNotEmpty } from "class-validator";

export class CreatePostLikeDto {
    @IsNotEmpty()
    post: number;
}
