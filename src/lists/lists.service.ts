import { Injectable } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { List } from "./entities/list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createListDto: CreateListDto) {
    return "This action adds a new list";
  }

  findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  findOne(id: number): Promise<List | null> {
    return this.listRepository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _createListDto: CreateListDto) {
    return `This action updates a #${id} list`;
  }

  async remove(id: number) {
    await this.listRepository.delete(id);
  }
}
