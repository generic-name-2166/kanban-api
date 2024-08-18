import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
  Put,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import {
  CreateCommentDto,
  createCommentSchema,
} from "./dto/create-comment.dto";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { OwnerGuard } from "../auth/owner.guard";
import { ZodValidationPipe } from "../zod_pipe";
import { Comment } from "./entities/comment.entity";

@ApiTags("comments")
@ApiBearerAuth()
@Controller("users/:userId/lists/:listId/cards/:cardId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "columnId", type: Number })
  @ApiParam({ name: "cardId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createCommentSchema))
  create(@Body() createCommentDto: CreateCommentDto): Promise<void> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "columnId", type: Number })
  @ApiParam({ name: "cardId", type: Number })
  @ApiOkResponse({ type: [Comment] })
  @UseGuards(AuthGuard, OwnerGuard)
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(":commentId")
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "columnId", type: Number })
  @ApiParam({ name: "cardId", type: Number })
  @ApiOkResponse({ type: Comment })
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(
    @Param("commentId", ParseIntPipe) commentId: number,
  ): Promise<Comment | null> {
    return this.commentsService.findOne(commentId);
  }

  @Put(":commentId")
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "columnId", type: Number })
  @ApiParam({ name: "cardId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createCommentSchema))
  update(
    @Param("commentId", ParseIntPipe) commentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentsService.update(commentId, createCommentDto);
  }

  @Delete(":commentId")
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "columnId", type: Number })
  @ApiParam({ name: "cardId", type: Number })
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("commentId", ParseIntPipe) commentId: number): Promise<void> {
    return this.commentsService.remove(commentId);
  }
}
