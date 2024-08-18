import { beforeEach, describe, expect, it } from "vitest";
import { AuthController } from "./auth.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { secret } from "./constants";
import { AuthService } from "./auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

describe("AuthController", () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
