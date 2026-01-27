import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        authorId: userId,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [data] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip,
        take: limit,
        include: { author: { select: { id: true } } },
      }),
      this.prisma.post.count(),
    ]);
    return {
      data,
      meta: {
        currentPage: page,
        limitPage: limit,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) {
      throw new ForbiddenException("You cannot modify another user's post");
    }
    return this.prisma.post.update({
      where: { id: id },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) {
      throw new ForbiddenException('You cannot delete another blog');
    }
    return this.prisma.post.delete({ where: { id } });
  }
}
