import { beforeEach, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { JwtModule } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";

describe("CardsController", () => {
  let controller: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CardsController],
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
