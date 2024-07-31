import { Controller, Post, Body, Req, UseGuards, Get, Query, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, profileDto } from 'src/auth/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth('Authorization')
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  ) { }


  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Req() request) {
    return this.authService.createUser(createUserDto,);
  }

  @Post('login')
  login(@Body() loginData: loginDto) {
    return this.authService.login(loginData);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getUserById(@Req() request) {
    return this.authService.getUserById(request.user.result.id);
  }
}
