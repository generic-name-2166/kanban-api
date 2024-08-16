import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

async function hashPassword(pass: string): Promise<string> {
  const rounds: number = 10;
  return await bcrypt.hash(pass, rounds);
}

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hashedPassword = hashPassword(createUserDto.password);
    // TODO call database here
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
