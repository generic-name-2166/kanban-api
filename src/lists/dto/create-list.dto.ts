import { z } from "zod";

export class CreateListDto {
  name: string;
}

export const createListSchema = z.object({
  name: z.string(),
});
