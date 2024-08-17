import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Repository } from "typeorm";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<void> {
    await this.cardRepository.save([
      {
        contents: createCardDto.contents,
      },
    ]);
  }

  findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  findOne(id: number): Promise<Card | null> {
    return this.cardRepository.findOneBy({ id });
  }

  async update(id: number, createCardDto: CreateCardDto): Promise<void> {
    await this.cardRepository.save([
      {
        id,
        contents: createCardDto.contents,
      },
    ]);
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
