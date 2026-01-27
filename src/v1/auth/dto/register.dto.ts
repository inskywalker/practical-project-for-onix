import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'newtest@test.com',
    description: 'Your email for register',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Incorrect email format' })
  email: string;
  @ApiProperty({ example: '123123', description: 'Your password for register' })
  @IsString()
  @MinLength(6, { message: 'The password must be at least 6 characters long' })
  password: string;
}
