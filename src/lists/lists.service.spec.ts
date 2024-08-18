import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { ListsService } from "./lists.service";
import { List } from "./entities/list.entity";
import { User } from "../users/entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

const listArray: List[] = [
  {
    id: 0,
    user: new User(),
    name: "list0",
    cards: [],
  },
  {
    id: 1,
    user: new User(),
    name: "list1",
    cards: [],
  },
];

describe("ListsService", () => {
  let service: ListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useValue: {
            find: vi.fn().mockResolvedValue(listArray),
          },
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll()", () => {
    it("should return an array of lists", async () => {
      const lists = await service.findAll();
      expect(lists).toEqual(listArray);
    });
  });
});
