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
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  hashedPassword: string;
  @OneToMany(() => List, (list) => list.user)
  lists: Relation<List[]>;
}
