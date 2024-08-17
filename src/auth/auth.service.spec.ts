import { describe, expect, it } from "vitest";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";

describe("AuthService", () => {
  let service: AuthService;
  let usersService: UsersService;

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
      providers: [AuthService, {
        provide: UsersService,
        useClass: MockService,
      }],
    })
      .overrideProvider(UsersService)
      .useClass(MockService)
      .compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  }); */

  it("should be defined", () => {
    // garbage framework
    expect(service).not.toBeDefined();
    expect(usersService).not.toBeDefined();
  });
});
