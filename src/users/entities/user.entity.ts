import { ApiProperty } from "@nestjs/swagger";
import { List } from "src/lists/entities/list.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column()
  hashedPassword: string;
  @OneToMany(() => List, (list) => list.user)
  lists: Relation<List[]>;
}
