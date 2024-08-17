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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { List } from "./entities/list.entity";

@ApiTags("lists")
@ApiBearerAuth()
@Controller("users/:userId/lists")
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  create(@Body() createListDto: CreateListDto): Promise<void> {
    return this.listsService.create(createListDto);
  }

  @Get()
  @ApiOkResponse({ type: [List] })
  @UseGuards(AuthGuard, OwnerGuard)
  findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Get(":listId")
  @ApiOkResponse({ type: List })
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("listId", ParseIntPipe) listId: number): Promise<List | null> {
    return this.listsService.findOne(listId);
  }

  @Put(":listId")
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  update(
    @Param("listId", ParseIntPipe) listId: number,
    @Body() createListDto: CreateListDto,
  ): Promise<void> {
    return this.listsService.update(listId, createListDto);
  }

  @Delete(":listId")
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("listId", ParseIntPipe) listId: number): Promise<void> {
    return this.listsService.remove(listId);
  }
}
