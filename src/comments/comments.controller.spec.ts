import { beforeEach, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { JwtModule } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";

describe("CommentsController", () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
