import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User> {
    const user = {
      id,
      email: "example@example.org",
      hashedPassword: "a",
    } satisfies User;
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = {
      id: 0,
      email,
      hashedPassword: "a",
    } satisfies User;
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _createUserDto: CreateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
