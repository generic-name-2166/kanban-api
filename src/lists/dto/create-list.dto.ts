import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateListDto {
  @ApiProperty({
    minLength: 1,
  })
  name: string;
}

export const createListSchema = z.object({
  name: z.string().min(1),
});
