import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.lists)
  user: User;
  @Column()
  name: string;
}
