import { IsNotEmpty } from "class-validator";

export class CreatePostLikeDto {
    @IsNotEmpty()
    postId: string;
}
