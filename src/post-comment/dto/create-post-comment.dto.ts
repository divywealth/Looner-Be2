import { IsNotEmpty } from "class-validator";

export class CreatePostCommentDto {
    @IsNotEmpty()
    post: number;

    @IsNotEmpty()
    comment: string;
}
