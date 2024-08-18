import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "../zod_pipe";
import { CreateUserDto, createUserSchema } from "../users/dto/create-user.dto";
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @UsePipes(new ZodValidationPipe(createUserSchema))
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get("profile")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
