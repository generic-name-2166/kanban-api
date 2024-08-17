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

  async create(createListDto: CreateListDto): Promise<void> {
    await this.listRepository.save([
      {
        name: createListDto.name,
      },
    ]);
  }

  findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  findOne(id: number): Promise<List | null> {
    return this.listRepository.findOneBy({ id });
  }

  async update(id: number, createListDto: CreateListDto): Promise<void> {
    await this.listRepository.save([
      {
        id,
        name: createListDto.name,
      },
    ]);
  }

  async remove(id: number) {
    await this.listRepository.delete(id);
  }
}
