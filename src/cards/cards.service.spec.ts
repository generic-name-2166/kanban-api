import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CardsService } from "./cards.service";
import { Card } from "./entities/card.entity";
import { List } from "src/lists/entities/list.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

const cardArray: Card[] = [
  {
    id: 0,
    list: new List(),
    contents: "card0",
  },
  {
    id: 1,
    list: new List(),
    contents: "card1",
  },
];

describe("CardsService", () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: {
            find: vi.fn().mockResolvedValue(cardArray),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll()", () => {
    it("should return an array of lists", async () => {
      const lists = await service.findAll();
      expect(lists).toEqual(cardArray);
    });
  });
});
