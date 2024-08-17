import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
  UsePipes,
} from "@nestjs/common";
import { ListsService } from "./lists.service";
import { CreateListDto, createListSchema } from "./dto/create-list.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { OwnerGuard } from "src/auth/owner.guard";
import { ZodValidationPipe } from "src/zod_pipe";

@Controller("users/:userId/lists")
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Get()
  @UseGuards(AuthGuard, OwnerGuard)
  findAll() {
    return this.listsService.findAll();
  }

  @Get(":listId")
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("listId", ParseIntPipe) listId: number) {
    return this.listsService.findOne(listId);
  }

  @Put(":listId")
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  update(
    @Param("listId", ParseIntPipe) listId: number,
    @Body() createListDto: CreateListDto,
  ) {
    return this.listsService.update(listId, createListDto);
  }

  @Delete(":listId")
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("listId", ParseIntPipe) listId: number) {
    return this.listsService.remove(listId);
  }
}
