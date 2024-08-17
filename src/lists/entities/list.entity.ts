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
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.lists)
  user: Relation<User>;
  @Column()
  name: string;
}
