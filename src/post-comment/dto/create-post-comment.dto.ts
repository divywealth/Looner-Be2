import { IsNotEmpty } from "class-validator";

export class CreatePostCommentDto {
    @IsNotEmpty()
    postId: string;

    @IsNotEmpty()
    comment: string;
}
