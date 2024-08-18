import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";
import { Card } from "../cards/entities/card.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

const commentArray: Comment[] = [
  {
    id: 0,
    card: new Card(),
    contents: "card0",
  },
  {
    id: 1,
    card: new Card(),
    contents: "card1",
  },
];

describe("CommentsService", () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            find: vi.fn().mockResolvedValue(commentArray),
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll()", () => {
    it("should return an array of comments", async () => {
      const lists = await service.findAll();
      expect(lists).toEqual(commentArray);
    });
  });
});
