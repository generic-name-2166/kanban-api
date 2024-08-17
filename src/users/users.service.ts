import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

async function hashPassword(pass: string): Promise<string> {
  const rounds: number = 10;
  return await bcrypt.hash(pass, rounds);
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await hashPassword(createUserDto.password);
    await this.usersRepository.save([
      {
        email: createUserDto.email,
        hashedPassword,
      },
    ]);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await hashPassword(createUserDto.password);
    await this.usersRepository.save([
      {
        id,
        email: createUserDto.email,
        hashedPassword,
      },
    ]);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
