import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateListDto {
  @ApiProperty()
  name: string;
}

export const createListSchema = z.object({
  name: z.string(),
});
