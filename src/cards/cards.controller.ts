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
import { CardsService } from "./cards.service";
import { CreateCardDto, createCardSchema } from "./dto/create-card.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { OwnerGuard } from "src/auth/owner.guard";
import { ZodValidationPipe } from "src/zod_pipe";
import { Card } from "./entities/card.entity";

@ApiTags("cards")
@ApiBearerAuth()
@Controller("users/:userId/lists/:listId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createCardSchema))
  create(@Body() createCardDto: CreateCardDto): Promise<void> {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOkResponse({ type: [Card] })
  @UseGuards(AuthGuard, OwnerGuard)
  findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(":cardId")
  @ApiOkResponse({ type: Card })
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("cardId", ParseIntPipe) cardId: number): Promise<Card | null> {
    return this.cardsService.findOne(cardId);
  }

  @Put(":cardId")
  @UseGuards(AuthGuard, OwnerGuard)
  @UsePipes(new ZodValidationPipe(createCardSchema))
  update(
    @Param("cardId", ParseIntPipe) cardId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<void> {
    return this.cardsService.update(cardId, createCardDto);
  }

  @Delete(":cardId")
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("cardId", ParseIntPipe) cardId: number): Promise<void> {
    return this.cardsService.remove(cardId);
  }
}
