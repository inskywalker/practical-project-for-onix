import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { Request as ExpressRequest } from 'express';

export interface RequestWithUser extends ExpressRequest {
  user: {
    userId: string;
    email: string;
  };
}

@ApiTags('Posts v1')
@Controller('v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create new post' })
  @ApiResponse({ status: 201, description: 'Post was create' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: RequestWithUser,
  ) {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all post' })
  @ApiResponse({ status: 200, description: 'List all post' })
  @ApiResponse({ status: 404, description: 'List with all posts not found' })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a post' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updated post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not update' })
  @Put(':id')
  update( @Param('id') id: string, @Request() req: RequestWithUser, @Body() updatePostDto: UpdatePostDto ) {
    return this.postsService.update(id, updatePostDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, description: 'Post was delete' })
  @ApiResponse({ status: 404, description: 'Post not delete' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.postsService.remove(id, req.user.userId);
  }
}
