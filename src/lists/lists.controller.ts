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
import { AuthGuard } from "../auth/auth.guard";
import { OwnerGuard } from "../auth/owner.guard";
import { ZodValidationPipe } from "../zod_pipe";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { List } from "./entities/list.entity";

@ApiTags("lists")
@ApiBearerAuth()
@Controller("users/:userId/lists")
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @ApiParam({ name: "userId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  create(@Body() createListDto: CreateListDto): Promise<void> {
    return this.listsService.create(createListDto);
  }

  @Get()
  @ApiParam({ name: "userId", type: Number })
  @ApiOkResponse({ type: [List] })
  @UseGuards(AuthGuard, OwnerGuard)
  findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Get(":listId")
  @ApiParam({ name: "userId", type: Number })
  @ApiOkResponse({ type: List })
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("listId", ParseIntPipe) listId: number): Promise<List | null> {
    return this.listsService.findOne(listId);
  }

  @Put(":listId")
  @ApiParam({ name: "userId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createListSchema))
  update(
    @Param("listId", ParseIntPipe) listId: number,
    @Body() createListDto: CreateListDto,
  ): Promise<void> {
    return this.listsService.update(listId, createListDto);
  }

  @Delete(":listId")
  @ApiParam({ name: "userId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("listId", ParseIntPipe) listId: number): Promise<void> {
    return this.listsService.remove(listId);
  }
}
