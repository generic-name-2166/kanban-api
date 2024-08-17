import { beforeEach, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { ListsController } from "./lists.controller";
import { ListsService } from "./lists.service";
import { JwtModule } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { List } from "./entities/list.entity";

describe("ListsController", () => {
  let controller: ListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [ListsController],
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ListsController>(ListsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
