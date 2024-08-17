import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<void> {
    await this.commentRepository.save([
      {
        contents: createCommentDto.contents,
      },
    ]);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOneBy({ id });
  }

  async update(id: number, createCommentDto: CreateCommentDto): Promise<void> {
    await this.commentRepository.save([
      {
        id,
        contents: createCommentDto.contents,
      },
    ]);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
