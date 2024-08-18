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
import { AuthGuard } from "../auth/auth.guard";
import { OwnerGuard } from "../auth/owner.guard";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @Get(":userId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, OwnerGuard)
  @ApiOkResponse({ type: User })
  findOne(@Param("userId", ParseIntPipe) userId: number): Promise<User | null> {
    return this.usersService.findOne(userId);
  }

  @Put(":userId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  update(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<void> {
    return this.usersService.update(userId, createUserDto);
  }

  @Delete(":userId")
  @ApiBearerAuth()
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("userId", ParseIntPipe) userId: number): Promise<void> {
    return this.usersService.remove(userId);
  }
}
