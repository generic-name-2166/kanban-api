import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
