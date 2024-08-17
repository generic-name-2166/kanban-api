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
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, createUserSchema } from "./dto/create-user.dto";
import { ZodValidationPipe } from "../zod_pipe";
import { AuthGuard } from "src/auth/auth.guard";
import { OwnerGuard } from "src/auth/owner.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(":userId")
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Put(":userId")
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  update(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.update(userId, createUserDto);
  }

  @Delete(":userId")
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("userId", ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
