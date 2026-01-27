import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@test.com', description: 'Your email' })
  email: string;
  @ApiProperty({ example: '123123', description: 'Your password' })
  password: string;
}
