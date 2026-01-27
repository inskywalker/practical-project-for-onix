import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'title test edit', description: 'Post title edit' })
  title: string;
  
  @ApiProperty({
    example: 'content test edit',
    description: 'Post content edit',
  })
  content: string;
}
