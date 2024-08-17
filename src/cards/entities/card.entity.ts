import { ApiProperty } from "@nestjs/swagger";
import { List } from "src/lists/entities/list.entity";
import { Comment } from "src/comments/entities/comment.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

@Entity()
export class Card {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => List, (list) => list.cards)
  list: Relation<List>;
  @ApiProperty()
  @Column()
  contents: string;
  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Relation<Comment[]>;
}
