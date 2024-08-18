import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../../cards/entities/card.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => Card, (card) => card.comments)
  card: Relation<Card>;
  @ApiProperty()
  @Column()
  contents: string;
}
