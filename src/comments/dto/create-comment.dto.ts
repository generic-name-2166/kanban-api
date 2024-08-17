import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateCommentDto {
  @ApiProperty({
    minLength: 1,
  })
  contents: string;
}

export const createCommentSchema = z.object({
  contents: z.string().min(1),
});
