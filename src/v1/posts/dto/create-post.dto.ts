import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'title test', description: 'Post title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;
  
  @ApiProperty({ example: 'content test', description: 'Post content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
