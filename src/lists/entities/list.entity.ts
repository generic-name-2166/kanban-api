import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../../cards/entities/card.entity";
import { User } from "../../users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
  @ApiProperty()
  @OneToMany(() => Card, (card) => card.list)
  cards: Relation<Card[]>;
}
