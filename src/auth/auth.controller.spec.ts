import { describe, expect, it } from "vitest";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
  let controller: AuthController;

  /* beforeEach(async () => {
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
  }); */

  it("should not be defined", () => {
    expect(controller).not.toBeDefined();
  });
});
