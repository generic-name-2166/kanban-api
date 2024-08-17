import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

@Entity()
export class List {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.lists)
  user: Relation<User>;
  @ApiProperty()
  @Column()
  name: string;
}
