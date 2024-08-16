import { z } from "zod";

export class CreateUserDto {
  email: string;
  password: string;
}

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
