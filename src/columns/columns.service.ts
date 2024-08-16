import { Injectable } from "@nestjs/common";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { Column } from "./entities/column.entity";

@Injectable()
export class ColumnsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createColumnDto: CreateColumnDto) {
    return "This action adds a new column";
  }

  findAll() {
    return `This action returns all columns`;
  }

  async findOne(id: number): Promise<Column> {
    const column = {
      id,
      userId: 0,
      name: "column",
    } satisfies Column;
    return column;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
