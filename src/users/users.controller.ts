import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, createUserSchema } from "./dto/create-user.dto";
import { ZodValidationPipe } from "../zod_pipe";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":userId")
  findOne(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Put(":userId")
  update(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.update(userId, createUserDto);
  }

  @Delete(":userId")
  remove(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
