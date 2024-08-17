import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export class CreateUserDto {
  @ApiProperty({
    description: "email",
  })
  email: string;
  @ApiProperty({
    minLength: 6,
  })
  password: string;
}

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password must be at least 6 characters long"),
});
