import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ColumnsService } from "./columns.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { OwnerGuard } from "src/auth/owner.guard";

@Controller("users/:userId/columns")
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @UseGuards(AuthGuard, OwnerGuard)
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  @UseGuards(AuthGuard, OwnerGuard)
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(":columnId")
  @UseGuards(AuthGuard, OwnerGuard)
  findOne(@Param("columnId", ParseIntPipe) columnId: number) {
    return this.columnsService.findOne(columnId);
  }

  @Patch(":columnId")
  @UseGuards(AuthGuard, OwnerGuard)
  update(
    @Param("columnId", ParseIntPipe) columnId: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(columnId, updateColumnDto);
  }

  @Delete(":columnId")
  @UseGuards(AuthGuard, OwnerGuard)
  remove(@Param("columnId", ParseIntPipe) columnId: number) {
    return this.columnsService.remove(columnId);
  }
}
