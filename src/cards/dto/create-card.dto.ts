import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateCardDto {
  @ApiProperty({
    minLength: 1,
  })
  contents: string;
}

export const createCardSchema = z.object({
  contents: z.string().min(1),
});
