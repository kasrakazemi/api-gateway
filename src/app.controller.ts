/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface AuthService {
  validateUser(data: { email: string; password: string }): Observable<{ isValid: boolean; userId: string }>;
  registerUser(data: { email: string; password: string }): Observable<{ userId: string; message: string }>;
}

@Controller('auth')
export class AppController implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post('validate')
  validateUser(@Body() data: { email: string; password: string }) {
    return this.authService.validateUser(data);
  }

  @Post('register')
  registerUser(@Body() data: { email: string; password: string }) {
    return this.authService.registerUser(data);
  }
}
