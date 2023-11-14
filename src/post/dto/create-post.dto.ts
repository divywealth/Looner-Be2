import { IsNotEmpty } from "class-validator";
import { CreateImageDto } from "src/image/dto/create-image.dto";

export class CreatePostDto {
    @IsNotEmpty()
    text: string;

    file: Array<Express.Multer.File>;
}
