import { beforeEach, describe, expect, it, vi } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

const userArray: User[] = [
  {
    id: 0,
    email: "alice@example.org",
    hashedPassword: "a",
    lists: [],
  },
  {
    id: 1,
    email: "bob@example.org",
    hashedPassword: "b",
    lists: [],
  },
];

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: vi.fn().mockResolvedValue(userArray),
            findOneBy: vi.fn().mockResolvedValue(userArray[0]),
            save: vi.fn().mockResolvedValue(userArray[0]),
            remove: vi.fn(),
            delete: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll()", () => {
    it("should return an array of users", async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe("findOne()", () => {
    it("should get a single user", () => {
      const repoSpy = vi.spyOn(repository, "findOneBy");
      expect(service.findOne(0)).resolves.toEqual(userArray[0]);
      expect(repoSpy).toBeCalledWith({ id: 0 });
    });
  });
});
