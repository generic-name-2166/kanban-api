import { beforeEach, describe, expect, it } from "vitest";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtModule } from "@nestjs/jwt";
import { secret } from "./constants";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret,
          signOptions: { expiresIn: "3600s" },
        }),
      ],
      providers: [AuthService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
