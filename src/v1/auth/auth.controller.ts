import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';

interface RequestWithUser extends ExpressRequest {
  user: User;
}

@ApiTags('Auth v1')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 200, description: 'Register completed' })
  @ApiResponse({ status: 400, description: 'Register was failed' })
  @ApiBody({ type: RegisterDto })
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Token created successfully' })
  @ApiResponse({ status: 400, description: 'The token was not created' })
  @ApiBody({ type: LoginDto })
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }
}
